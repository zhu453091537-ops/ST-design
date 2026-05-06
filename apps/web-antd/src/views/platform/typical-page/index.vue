<script setup lang="ts">
import type { Dayjs } from 'dayjs';

import type { DeptTree, User } from '#/api/system/user/model';

import { computed, onMounted, reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { EnableStatus, SUPERADMIN_USER_ID } from '@vben/constants';
import { VbenIcon } from '@vben/icons';
import { preferences } from '@vben/preferences';

import { Avatar, Dropdown, Popconfirm, Space } from 'antdv-next';

import ApiSwitch from '#/components/global/api-switch.vue';
import {
  PlatformButton,
  PlatformDrawer,
  PlatformEditForm,
  PlatformFormItem,
  PlatformInput,
  PlatformModal,
  PlatformRangePicker,
  PlatformSearchForm,
  PlatformSelect,
  PlatformTable,
  PlatformTableToolbar,
  PlatformTreePanel,
} from '#/components/platform';

import {
  changeTypicalUserStatus,
  getTypicalDeptTree,
  getTypicalUserList,
  removeTypicalUsers,
  resetTypicalUserPassword,
  saveTypicalUser,
  typicalUserTableColumns,
} from './user-demo-source';

type TreeKey = number | string;

interface UserQueryModel {
  createTime: [] | [Dayjs, Dayjs];
  nickName: string;
  phonenumber: string;
  status: string;
  userName: string;
}

interface UserFormModel extends Partial<User> {
  password?: string;
}

interface TableChangePager {
  current?: number;
  pageSize?: number;
}

const statusOptions = [
  { label: '全部', value: '' },
  { label: '启用', value: EnableStatus.Enable },
  { label: '停用', value: EnableStatus.Disable },
];

const sexOptions = [
  { label: '男', value: '0' },
  { label: '女', value: '1' },
  { label: '未知', value: '2' },
];

const roleOptions = [
  { label: '管理员', value: '1' },
  { label: '系统用户', value: '2' },
];

const postOptions = [
  { label: '通用岗位', value: 1 },
  { label: '值班岗位', value: 2 },
];

const query = reactive<UserQueryModel>({
  createTime: [],
  nickName: '',
  phonenumber: '',
  status: '',
  userName: '',
});
const formModel = reactive<UserFormModel>({});
const passwordModel = reactive({
  password: '',
});

const tableRows = ref<User[]>([]);
const deptTree = ref<DeptTree[]>([]);
const selectedDeptKeys = ref<TreeKey[]>([]);
const selectedRowKeys = ref<TreeKey[]>([]);
const treeKeyword = ref('');
const tableLoading = ref(false);
const treeLoading = ref(false);
const drawerOpen = ref(false);
const detailOpen = ref(false);
const importOpen = ref(false);
const resetPwdOpen = ref(false);
const currentRecord = ref<null | User>(null);
const paginationState = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});

const tableColumns = computed(() => typicalUserTableColumns);
const pagination = computed(() => ({
  current: paginationState.current,
  pageSize: paginationState.pageSize,
  showSizeChanger: true,
  showTotal: (total: number) => `共 ${total} 条`,
  total: paginationState.total,
}));
const rowSelection = computed(() => ({
  getCheckboxProps: (record: User) => ({
    disabled: Number(record.userId) === SUPERADMIN_USER_ID,
  }),
  onChange: (keys: TreeKey[]) => {
    selectedRowKeys.value = keys;
  },
  preserveSelectedRowKeys: true,
  selectedRowKeys: selectedRowKeys.value,
}));
const filteredDeptTree = computed(() =>
  filterDeptTree(deptTree.value, treeKeyword.value.trim()),
);
const deptOptions = computed(() =>
  flattenDeptTree(deptTree.value).map((item) => ({
    label: item.label,
    value: item.id,
  })),
);
const canBatchDelete = computed(() => selectedRowKeys.value.length > 0);

function filterDeptTree(tree: DeptTree[], keyword: string): DeptTree[] {
  if (!keyword) {
    return tree;
  }

  return tree
    .map((node) => {
      const children = node.children
        ? filterDeptTree(node.children, keyword)
        : [];
      const matched = node.label.includes(keyword);
      if (!matched && children.length === 0) {
        return null;
      }
      return {
        ...node,
        children,
      };
    })
    .filter(Boolean) as DeptTree[];
}

function flattenDeptTree(tree: DeptTree[]): DeptTree[] {
  return tree.flatMap((node) => [
    node,
    ...(node.children ? flattenDeptTree(node.children) : []),
  ]);
}

function buildQueryParams() {
  const [beginTime, endTime] = query.createTime;
  const params: Parameters<typeof getTypicalUserList>[0] = {
    nickName: query.nickName || undefined,
    pageNum: paginationState.current,
    pageSize: paginationState.pageSize,
    phonenumber: query.phonenumber || undefined,
    status: query.status || undefined,
    userName: query.userName || undefined,
  };

  if (selectedDeptKeys.value.length === 1) {
    params.deptId = selectedDeptKeys.value[0];
  }
  if (beginTime && endTime) {
    params['params[beginTime]'] = `${beginTime.format('YYYY-MM-DD')} 00:00:00`;
    params['params[endTime]'] = `${endTime.format('YYYY-MM-DD')} 23:59:59`;
  }

  return params;
}

async function loadDeptTree() {
  treeLoading.value = true;
  try {
    deptTree.value = await getTypicalDeptTree();
  } finally {
    treeLoading.value = false;
  }
}

async function loadUsers() {
  tableLoading.value = true;
  try {
    const result = await getTypicalUserList(buildQueryParams());
    tableRows.value = result.rows;
    paginationState.total = result.total;
  } finally {
    tableLoading.value = false;
  }
}

async function handleSearch() {
  paginationState.current = 1;
  await loadUsers();
}

async function handleReset() {
  query.userName = '';
  query.nickName = '';
  query.phonenumber = '';
  query.status = '';
  query.createTime = [];
  selectedDeptKeys.value = [];
  await handleSearch();
}

async function handleDeptSelect(keys: TreeKey[]) {
  selectedDeptKeys.value = keys;
  await handleSearch();
}

async function handleTreeReload() {
  treeKeyword.value = '';
  selectedDeptKeys.value = [];
  await loadDeptTree();
  await handleSearch();
}

async function handleTableChange(pager: TableChangePager) {
  paginationState.current = pager.current ?? 1;
  paginationState.pageSize = pager.pageSize ?? 10;
  await loadUsers();
}

function resetForm(row?: User) {
  Object.assign(formModel, {
    deptId: row?.deptId ?? selectedDeptKeys.value[0] ?? deptOptions.value[0]?.value,
    email: row?.email ?? '',
    nickName: row?.nickName ?? '',
    phonenumber: row?.phonenumber ?? '',
    postIds: row?.postIds ?? [],
    remark: row?.remark ?? '',
    roleIds: row?.roleIds ?? [],
    sex: row?.sex ?? '0',
    status: row?.status ?? EnableStatus.Enable,
    userId: row?.userId,
    userName: row?.userName ?? '',
  });
}

function handleAdd() {
  currentRecord.value = null;
  resetForm();
  drawerOpen.value = true;
}

function handleEdit(row: User) {
  currentRecord.value = row;
  resetForm(row);
  drawerOpen.value = true;
}

async function handleSave() {
  const dept = deptOptions.value.find((item) => item.value === formModel.deptId);
  await saveTypicalUser({
    ...formModel,
    deptName: dept?.label ?? '',
  });
  drawerOpen.value = false;
  await loadUsers();
}

async function handleDelete(row: User) {
  await removeTypicalUsers([row.userId]);
  await loadUsers();
}

function handleBatchDelete() {
  window.modal.confirm({
    content: `确认删除选中的 ${selectedRowKeys.value.length} 条记录吗？`,
    okType: 'danger',
    onOk: async () => {
      await removeTypicalUsers(selectedRowKeys.value);
      selectedRowKeys.value = [];
      await loadUsers();
    },
    title: '提示',
  });
}

function handleImport() {
  importOpen.value = true;
}

function handleExport() {
  window.modal.info({
    content: '导出入口已保留，后端恢复后可切回 userExport 接口。',
    title: '导出',
  });
}

function handleDetail(row: User) {
  currentRecord.value = row;
  detailOpen.value = true;
}

function handleResetPwd(row: User) {
  currentRecord.value = row;
  passwordModel.password = '';
  resetPwdOpen.value = true;
}

async function handleConfirmResetPwd() {
  if (!currentRecord.value) {
    return;
  }
  await resetTypicalUserPassword();
  resetPwdOpen.value = false;
}

async function handleChangeStatus(checked: boolean, row: User) {
  await changeTypicalUserStatus(
    row.userId,
    checked ? EnableStatus.Enable : EnableStatus.Disable,
  );
  await loadUsers();
}

const moreMenuItems = computed(() => [
  { key: 'info', label: '用户信息' },
  { key: 'resetPwd', label: '重置密码' },
]);

function handleMoreClick(key: string, row: User) {
  switch (key) {
    case 'info': {
      handleDetail(row);
      break;
    }
    case 'resetPwd': {
      handleResetPwd(row);
      break;
    }
  }
}

onMounted(async () => {
  await loadDeptTree();
  await loadUsers();
});
</script>

<template>
  <Page :auto-content-height="true">
    <div class="flex h-full min-h-0 gap-[8px]">
      <aside class="platform-surface flex w-[260px] shrink-0 flex-col p-4">
        <PlatformTreePanel
          v-model:search-value="treeKeyword"
          v-model:selected-keys="selectedDeptKeys"
          :field-names="{ title: 'label', key: 'id' }"
          :loading="treeLoading"
          :show-refresh="false"
          :tree-data="filteredDeptTree"
          :virtual="false"
          class="min-h-0 flex-1"
          default-expand-all
          empty-description="无部门数据"
          search-placeholder="搜索部门"
          @reload="handleTreeReload"
          @select="handleDeptSelect"
        >
          <template #titleRender="{ label }">
            <span v-if="treeKeyword && label.includes(treeKeyword)">
              {{ label.substring(0, label.indexOf(treeKeyword)) }}
              <span class="text-primary">{{ treeKeyword }}</span>
              {{ label.substring(label.indexOf(treeKeyword) + treeKeyword.length) }}
            </span>
            <span v-else>{{ label }}</span>
          </template>
        </PlatformTreePanel>
      </aside>

      <section class="min-w-0 flex-1 space-y-3">
        <div class="platform-surface p-4">
          <PlatformSearchForm
            :model="query"
            class="grid grid-cols-1 gap-x-4 md:grid-cols-2 xl:grid-cols-5"
            layout="vertical"
          >
            <PlatformFormItem label="用户账号">
              <PlatformInput
                v-model:value="query.userName"
                allow-clear
                placeholder="请输入用户账号"
              />
            </PlatformFormItem>
            <PlatformFormItem label="用户昵称">
              <PlatformInput
                v-model:value="query.nickName"
                allow-clear
                placeholder="请输入用户昵称"
              />
            </PlatformFormItem>
            <PlatformFormItem label="手机号码">
              <PlatformInput
                v-model:value="query.phonenumber"
                allow-clear
                placeholder="请输入手机号码"
              />
            </PlatformFormItem>
            <PlatformFormItem label="用户状态">
              <PlatformSelect
                v-model:value="query.status"
                :options="statusOptions"
              />
            </PlatformFormItem>
            <PlatformFormItem label="创建时间">
              <PlatformRangePicker v-model:value="query.createTime" />
            </PlatformFormItem>
            <template #actions>
              <PlatformButton @click="handleReset">
                <template #icon>
                  <VbenIcon icon="lucide:rotate-ccw" />
                </template>
                重置
              </PlatformButton>
              <PlatformButton type="primary" @click="handleSearch">
                <template #icon>
                  <VbenIcon icon="lucide:search" />
                </template>
                查询
              </PlatformButton>
            </template>
          </PlatformSearchForm>
        </div>

        <div class="platform-surface p-4">
          <PlatformTableToolbar
            class="mb-3"
            @refresh="loadUsers"
            @search="handleSearch"
          >
            <template #actions>
              <PlatformButton scene="toolbar" @click="handleExport">
                <template #icon>
                  <VbenIcon icon="lucide:download" />
                </template>
                导出
              </PlatformButton>
              <PlatformButton scene="toolbar" @click="handleImport">
                <template #icon>
                  <VbenIcon icon="lucide:upload" />
                </template>
                导入
              </PlatformButton>
              <PlatformButton
                :disabled="!canBatchDelete"
                danger
                scene="toolbar"
                type="primary"
                @click="handleBatchDelete"
              >
                <template #icon>
                  <VbenIcon icon="lucide:trash-2" />
                </template>
                删除
              </PlatformButton>
              <PlatformButton scene="toolbar" type="primary" @click="handleAdd">
                <template #icon>
                  <VbenIcon icon="lucide:plus" />
                </template>
                新增
              </PlatformButton>
            </template>
          </PlatformTableToolbar>

          <PlatformTable
            :columns="tableColumns"
            :data-source="tableRows"
            :loading="tableLoading"
            :pagination="pagination"
            :row-selection="rowSelection"
            row-key="userId"
            show-index
            size="middle"
            @change="handleTableChange"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'avatar'">
                <Avatar :src="record.avatar || preferences.app.defaultAvatar" />
              </template>
              <template v-else-if="column.key === 'status'">
                <ApiSwitch
                  :value="record.status === EnableStatus.Enable"
                  :api="(checked) => handleChangeStatus(Boolean(checked), record)"
                  :disabled="Number(record.userId) === SUPERADMIN_USER_ID"
                />
              </template>
              <template v-else-if="column.key === 'action'">
                <Space>
                  <PlatformButton
                    :disabled="Number(record.userId) === SUPERADMIN_USER_ID"
                    scene="action"
                    size="small"
                    type="link"
                    @click="handleEdit(record)"
                  >
                    编辑
                  </PlatformButton>
                  <Popconfirm
                    placement="left"
                    title="确认删除？"
                    @confirm="handleDelete(record)"
                  >
                    <PlatformButton
                      :disabled="Number(record.userId) === SUPERADMIN_USER_ID"
                      danger
                      scene="action"
                      size="small"
                      type="link"
                    >
                      删除
                    </PlatformButton>
                  </Popconfirm>
                  <Dropdown
                    placement="bottomRight"
                    :menu="{
                      items: moreMenuItems,
                      onClick: (info) => handleMoreClick(String(info.key), record),
                    }"
                  >
                    <PlatformButton scene="action" size="small" type="link">
                      更多
                    </PlatformButton>
                  </Dropdown>
                </Space>
              </template>
            </template>
          </PlatformTable>
        </div>
      </section>
    </div>

    <PlatformDrawer
      v-model:open="drawerOpen"
      destroy-on-close
      size="large"
      title="用户表单"
    >
      <PlatformEditForm
        :model="formModel"
        class="grid grid-cols-1 gap-x-4 md:grid-cols-2"
        layout="vertical"
      >
        <PlatformFormItem label="用户账号">
          <PlatformInput
            v-model:value="formModel.userName"
            placeholder="请输入用户账号"
          />
        </PlatformFormItem>
        <PlatformFormItem label="用户密码">
          <PlatformInput
            v-model:value="formModel.password"
            placeholder="请输入用户密码"
          />
        </PlatformFormItem>
        <PlatformFormItem label="用户昵称">
          <PlatformInput
            v-model:value="formModel.nickName"
            placeholder="请输入用户昵称"
          />
        </PlatformFormItem>
        <PlatformFormItem label="所属部门">
          <PlatformSelect
            v-model:value="formModel.deptId"
            :options="deptOptions"
          />
        </PlatformFormItem>
        <PlatformFormItem label="手机号码">
          <PlatformInput
            v-model:value="formModel.phonenumber"
            placeholder="请输入手机号码"
          />
        </PlatformFormItem>
        <PlatformFormItem label="邮箱">
          <PlatformInput v-model:value="formModel.email" placeholder="请输入邮箱" />
        </PlatformFormItem>
        <PlatformFormItem label="性别">
          <PlatformSelect v-model:value="formModel.sex" :options="sexOptions" />
        </PlatformFormItem>
        <PlatformFormItem label="状态">
          <PlatformSelect
            v-model:value="formModel.status"
            :options="statusOptions.filter((item) => item.value)"
          />
        </PlatformFormItem>
        <PlatformFormItem label="岗位">
          <PlatformSelect
            v-model:value="formModel.postIds"
            :options="postOptions"
            mode="multiple"
          />
        </PlatformFormItem>
        <PlatformFormItem label="角色">
          <PlatformSelect
            v-model:value="formModel.roleIds"
            :options="roleOptions"
            mode="multiple"
          />
        </PlatformFormItem>
        <PlatformFormItem class="md:col-span-2" label="备注">
          <PlatformInput v-model:value="formModel.remark" placeholder="请输入备注" />
        </PlatformFormItem>
      </PlatformEditForm>
      <div class="mt-4 flex justify-end gap-2">
        <PlatformButton @click="drawerOpen = false">取消</PlatformButton>
        <PlatformButton type="primary" @click="handleSave">保存</PlatformButton>
      </div>
    </PlatformDrawer>

    <PlatformModal
      v-model:open="detailOpen"
      :footer="null"
      title="用户信息"
      width="560px"
    >
      <div
        v-if="currentRecord"
        class="grid grid-cols-[96px_1fr] gap-y-3 text-sm"
      >
        <span class="text-muted-foreground">用户账号</span>
        <span>{{ currentRecord.userName }}</span>
        <span class="text-muted-foreground">用户昵称</span>
        <span>{{ currentRecord.nickName }}</span>
        <span class="text-muted-foreground">部门</span>
        <span>{{ currentRecord.deptName || '-' }}</span>
        <span class="text-muted-foreground">手机号码</span>
        <span>{{ currentRecord.phonenumber || '-' }}</span>
        <span class="text-muted-foreground">邮箱</span>
        <span>{{ currentRecord.email || '-' }}</span>
        <span class="text-muted-foreground">创建时间</span>
        <span>{{ currentRecord.createTime || '-' }}</span>
      </div>
    </PlatformModal>

    <PlatformModal
      v-model:open="importOpen"
      title="用户导入"
      width="520px"
      @ok="importOpen = false"
    >
      <div class="text-sm">
        导入入口已保留。当前后端不可用，第一版不调用
        `/system/user/importData`。
      </div>
    </PlatformModal>

    <PlatformModal
      v-model:open="resetPwdOpen"
      title="重置密码"
      width="520px"
      @ok="handleConfirmResetPwd"
    >
      <PlatformEditForm :model="passwordModel" layout="vertical">
        <PlatformFormItem label="用户名">
          <PlatformInput :value="currentRecord?.userName" disabled />
        </PlatformFormItem>
        <PlatformFormItem label="昵称">
          <PlatformInput :value="currentRecord?.nickName" disabled />
        </PlatformFormItem>
        <PlatformFormItem label="新密码">
          <PlatformInput
            v-model:value="passwordModel.password"
            placeholder="请输入新密码"
          />
        </PlatformFormItem>
      </PlatformEditForm>
    </PlatformModal>
  </Page>
</template>
