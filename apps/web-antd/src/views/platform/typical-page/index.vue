<script setup lang="ts">
import type { Dayjs } from 'dayjs';

import { computed, reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { VbenIcon } from '@vben/icons';

import dayjs from 'dayjs';

import {
  PlatformButton,
  PlatformDatePicker,
  PlatformDrawer,
  PlatformEditForm,
  PlatformFormItem,
  PlatformInput,
  PlatformModal,
  PlatformSearchForm,
  PlatformSelect,
  PlatformStatusTag,
  PlatformTable,
  PlatformTableToolbar,
  PlatformTreePanel,
} from '#/components/platform';

import {
  type PlatformTypicalDept,
  type PlatformTypicalUser,
  typicalDeptTree,
  typicalRoleOptions,
  typicalStatusOptions,
  typicalUsers,
} from './mock';

const statusMap = {
  disabled: {
    label: '停用',
    status: 'warning',
  },
  enabled: {
    label: '启用',
    status: 'success',
  },
  locked: {
    label: '锁定',
    status: 'error',
  },
} as const;

const columns = [
  { dataIndex: 'id', key: 'id', title: 'ID', width: 88 },
  { dataIndex: 'name', key: 'name', title: '姓名' },
  { dataIndex: 'account', key: 'account', title: '账号' },
  { dataIndex: 'deptName', key: 'deptName', title: '所属组织' },
  { dataIndex: 'role', key: 'role', title: '角色' },
  { dataIndex: 'status', key: 'status', title: '状态', width: 110 },
  { dataIndex: 'createTime', key: 'createTime', title: '创建时间', width: 180 },
  { key: 'action', title: '操作', width: 180 },
];

const rows = ref<PlatformTypicalUser[]>([...typicalUsers]);
const selectedDeptKeys = ref<string[]>(['product']);
const treeKeyword = ref('');
const filterCollapsed = ref(false);
const drawerOpen = ref(false);
const detailOpen = ref(false);
const editingId = ref<null | number>(null);
const detailRecord = ref<null | PlatformTypicalUser>(null);

const query = reactive<{
  createDate: Dayjs | null;
  keyword: string;
  role: string;
  status: string;
}>({
  createDate: null,
  keyword: '',
  role: '',
  status: '',
});

const submittedQuery = reactive<{
  createDate: Dayjs | null;
  keyword: string;
  role: string;
  status: string;
}>({
  createDate: null,
  keyword: '',
  role: '',
  status: '',
});

const formModel = reactive<Partial<PlatformTypicalUser>>({
  account: '',
  deptId: 'product',
  deptName: '产品中心',
  email: '',
  name: '',
  role: '运营人员',
  status: 'enabled',
});

function filterTree(
  tree: PlatformTypicalDept[],
  keyword: string,
): PlatformTypicalDept[] {
  if (!keyword) {
    return tree;
  }

  return tree
    .map((node) => {
      const children = node.children ? filterTree(node.children, keyword) : [];
      const matched = node.title.includes(keyword);
      if (!matched && children.length === 0) {
        return null;
      }
      return {
        ...node,
        children,
      };
    })
    .filter(Boolean) as PlatformTypicalDept[];
}

const filteredTree = computed(() =>
  filterTree(typicalDeptTree, treeKeyword.value.trim()),
);

const filteredRows = computed(() => {
  const keyword = submittedQuery.keyword.trim().toLowerCase();
  const deptId = selectedDeptKeys.value[0];

  return rows.value.filter((row) => {
    const matchKeyword =
      !keyword ||
      row.name.toLowerCase().includes(keyword) ||
      row.account.toLowerCase().includes(keyword) ||
      row.email.toLowerCase().includes(keyword);
    const matchStatus =
      !submittedQuery.status || row.status === submittedQuery.status;
    const matchRole = !submittedQuery.role || row.role === submittedQuery.role;
    const matchDept = !deptId || row.deptId === deptId;
    const matchDate =
      !submittedQuery.createDate ||
      dayjs(row.createTime).isSame(submittedQuery.createDate, 'day');

    return matchKeyword && matchStatus && matchRole && matchDept && matchDate;
  });
});

const pagination = computed(() => ({
  pageSize: 5,
  showSizeChanger: false,
  total: filteredRows.value.length,
}));

function getStatusMeta(status: PlatformTypicalUser['status']) {
  return statusMap[status];
}

function handleSearch() {
  submittedQuery.keyword = query.keyword;
  submittedQuery.role = query.role;
  submittedQuery.status = query.status;
  submittedQuery.createDate = query.createDate;
}

function handleReset() {
  query.keyword = '';
  query.role = '';
  query.status = '';
  query.createDate = null;
  submittedQuery.keyword = '';
  submittedQuery.role = '';
  submittedQuery.status = '';
  submittedQuery.createDate = null;
  selectedDeptKeys.value = ['product'];
}

function resetForm(row?: PlatformTypicalUser) {
  Object.assign(formModel, {
    account: row?.account ?? '',
    deptId: row?.deptId ?? 'product',
    deptName: row?.deptName ?? '产品中心',
    email: row?.email ?? '',
    name: row?.name ?? '',
    role: row?.role ?? '运营人员',
    status: row?.status ?? 'enabled',
  });
}

function handleAdd() {
  editingId.value = null;
  resetForm();
  drawerOpen.value = true;
}

function handleEdit(row: PlatformTypicalUser) {
  editingId.value = row.id;
  resetForm(row);
  drawerOpen.value = true;
}

function handleSave() {
  const dept = [
    ...typicalDeptTree,
    ...typicalDeptTree.flatMap((i) => i.children ?? []),
  ].find((item) => item.key === formModel.deptId);
  formModel.deptName = dept?.title ?? '产品中心';

  rows.value = editingId.value
    ? rows.value.map((row) =>
        row.id === editingId.value
          ? ({ ...row, ...formModel } as PlatformTypicalUser)
          : row,
      )
    : [
        {
          account: formModel.account || 'newuser',
          createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          deptId: formModel.deptId || 'product',
          deptName: formModel.deptName || '产品中心',
          email: formModel.email || 'newuser@example.com',
          id: Math.max(...rows.value.map((row) => row.id)) + 1,
          name: formModel.name || '新用户',
          role: formModel.role || '运营人员',
          status: (formModel.status ||
            'enabled') as PlatformTypicalUser['status'],
        },
        ...rows.value,
      ];

  drawerOpen.value = false;
}

function handleDelete(row: PlatformTypicalUser) {
  window.modal.confirm({
    content: `确认删除用户“${row.name}”吗？`,
    okType: 'danger',
    onOk: () => {
      rows.value = rows.value.filter((item) => item.id !== row.id);
    },
    title: '删除确认',
  });
}

function handleDetail(row: PlatformTypicalUser) {
  detailRecord.value = row;
  detailOpen.value = true;
}

function toggleFilterCollapsed() {
  filterCollapsed.value = !filterCollapsed.value;
}

function handleTreeReload() {
  treeKeyword.value = '';
  selectedDeptKeys.value = ['product'];
}
</script>

<template>
  <Page :auto-content-height="true">
    <div class="flex h-full min-h-0 gap-4">
      <aside class="platform-surface flex w-[260px] shrink-0 flex-col p-4">
        <PlatformTreePanel
          v-model:search-value="treeKeyword"
          v-model:selected-keys="selectedDeptKeys"
          :tree-data="filteredTree"
          :virtual="false"
          class="min-h-0 flex-1"
          default-expand-all
          search-placeholder="搜索组织"
          show-line
          @reload="handleTreeReload"
        />
      </aside>

      <section class="min-w-0 flex-1 space-y-4">
        <div class="platform-surface p-4">
          <PlatformSearchForm
            :model="query"
            class="grid grid-cols-1 gap-x-4 md:grid-cols-2 xl:grid-cols-4"
            layout="vertical"
          >
            <PlatformFormItem label="关键词">
              <PlatformInput
                v-model:value="query.keyword"
                allow-clear
                placeholder="姓名 / 账号 / 邮箱"
              />
            </PlatformFormItem>
            <PlatformFormItem label="角色">
              <PlatformSelect
                v-model:value="query.role"
                :options="typicalRoleOptions"
              />
            </PlatformFormItem>
            <PlatformFormItem v-show="!filterCollapsed" label="状态">
              <PlatformSelect
                v-model:value="query.status"
                :options="typicalStatusOptions"
              />
            </PlatformFormItem>
            <PlatformFormItem v-show="!filterCollapsed" label="创建日期">
              <PlatformDatePicker
                v-model:value="query.createDate"
                class="w-full"
                placeholder="选择日期"
              />
            </PlatformFormItem>
          </PlatformSearchForm>
          <div class="mt-2 flex justify-end gap-2">
            <PlatformButton scene="toolbar" @click="handleReset">
              <template #icon>
                <VbenIcon icon="lucide:rotate-ccw" />
              </template>
              重置
            </PlatformButton>
            <PlatformButton
              scene="toolbar"
              type="primary"
              @click="handleSearch"
            >
              <template #icon>
                <VbenIcon icon="lucide:search" />
              </template>
              查询
            </PlatformButton>
            <PlatformButton scene="collapse" @click="toggleFilterCollapsed">
              <template #icon>
                <VbenIcon
                  :icon="
                    filterCollapsed ? 'lucide:chevrons-down' : 'lucide:chevrons-up'
                  "
                />
              </template>
              {{ filterCollapsed ? '展开' : '收起' }}
            </PlatformButton>
          </div>
        </div>

        <div class="platform-surface p-4">
          <PlatformTableToolbar class="mb-4">
            <template #actions>
              <PlatformButton scene="toolbar">
                <template #icon>
                  <VbenIcon icon="lucide:download" />
                </template>
                导出
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
            :columns="columns"
            :data-source="filteredRows"
            :pagination="pagination"
            row-key="id"
            size="middle"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'status'">
                <PlatformStatusTag
                  :label="getStatusMeta(record.status).label"
                  :status="getStatusMeta(record.status).status"
                />
              </template>
              <template v-if="column.key === 'action'">
                <div class="flex gap-3">
                  <PlatformButton
                    scene="action"
                    size="small"
                    type="link"
                    @click="handleDetail(record)"
                  >
                    查看
                  </PlatformButton>
                  <PlatformButton
                    scene="action"
                    size="small"
                    type="link"
                    @click="handleEdit(record)"
                  >
                    编辑
                  </PlatformButton>
                  <PlatformButton
                    danger
                    scene="action"
                    size="small"
                    type="link"
                    @click="handleDelete(record)"
                  >
                    删除
                  </PlatformButton>
                </div>
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
      <PlatformEditForm :model="formModel" layout="vertical">
        <PlatformFormItem label="姓名">
          <PlatformInput v-model:value="formModel.name" placeholder="请输入姓名" />
        </PlatformFormItem>
        <PlatformFormItem label="账号">
          <PlatformInput
            v-model:value="formModel.account"
            placeholder="请输入账号"
          />
        </PlatformFormItem>
        <PlatformFormItem label="邮箱">
          <PlatformInput
            v-model:value="formModel.email"
            placeholder="请输入邮箱"
          />
        </PlatformFormItem>
        <PlatformFormItem label="角色">
          <PlatformSelect
            v-model:value="formModel.role"
            :options="typicalRoleOptions.filter((item) => item.value)"
          />
        </PlatformFormItem>
        <PlatformFormItem label="组织">
          <PlatformSelect
            v-model:value="formModel.deptId"
            :options="[
              { label: '产品中心', value: 'product' },
              { label: '运营中心', value: 'operation' },
              { label: '华东区域', value: 'east' },
              { label: '华南区域', value: 'south' },
            ]"
          />
        </PlatformFormItem>
        <PlatformFormItem label="状态">
          <PlatformSelect
            v-model:value="formModel.status"
            :options="typicalStatusOptions.filter((item) => item.value)"
          />
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
      title="用户详情"
      width="520px"
    >
      <div
        v-if="detailRecord"
        class="grid grid-cols-[88px_1fr] gap-y-3 text-sm"
      >
        <span class="text-muted-foreground">姓名</span>
        <span>{{ detailRecord.name }}</span>
        <span class="text-muted-foreground">账号</span>
        <span>{{ detailRecord.account }}</span>
        <span class="text-muted-foreground">邮箱</span>
        <span>{{ detailRecord.email }}</span>
        <span class="text-muted-foreground">组织</span>
        <span>{{ detailRecord.deptName }}</span>
        <span class="text-muted-foreground">角色</span>
        <span>{{ detailRecord.role }}</span>
        <span class="text-muted-foreground">状态</span>
        <PlatformStatusTag
          :label="statusMap[detailRecord.status].label"
          :status="statusMap[detailRecord.status].status"
        />
      </div>
    </PlatformModal>
  </Page>
</template>
