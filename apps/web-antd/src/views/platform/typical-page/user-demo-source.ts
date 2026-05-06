import type { TableProps } from 'antdv-next';

import type { PageQuery, PageResult } from '#/api/common';
import type { DeptTree, Role, User } from '#/api/system/user/model';

import { EnableStatus, SUPERADMIN_USER_ID } from '@vben/constants';

import { columns as systemUserColumns } from '#/views/system/user/data';

interface SystemUserColumn {
  field?: string;
  minWidth?: number | string;
  title?: string;
}

/**
 * 典型页面验证专用受控数据源。
 *
 * 字段、columns 和树结构只取自 /system/user 的类型、schema 与页面配置。
 * 后端 8080 恢复后，本文件内方法可切回 userList/getDeptTree 等真实接口，
 * /platform/typical-page 页面主体不应依赖这里的 Mock 实现细节。
 */
export interface TypicalUserQuery extends PageQuery {
  deptId?: number | string;
  nickName?: string;
  'params[beginTime]'?: string;
  'params[endTime]'?: string;
  phonenumber?: string;
  status?: string;
  userName?: string;
}

const adminRole: Role = {
  createTime: '2026-05-05 00:00:00',
  dataScope: '1',
  flag: true,
  remark: '典型页面验证角色',
  roleId: '1',
  roleKey: 'admin',
  roleName: '管理员',
  roleSort: 1,
  status: EnableStatus.Enable,
  superAdmin: false,
};

const operatorRole: Role = {
  ...adminRole,
  roleId: '2',
  roleKey: 'system_user',
  roleName: '系统用户',
  roleSort: 2,
};

const deptTreeSeed: DeptTree[] = [
  {
    id: 100,
    key: '100',
    label: '深圳地铁运营集团有限公司',
    parentId: 0,
    weight: 1,
    children: [
      {
        id: 101,
        key: '101',
        label: '运营公共',
        parentId: 100,
        weight: 1,
        children: [
          {
            id: 102,
            key: '102',
            label: '通号中心',
            parentId: 101,
            weight: 1,
          },
          {
            id: 103,
            key: '103',
            label: '客运二分公司',
            parentId: 101,
            weight: 2,
          },
        ],
      },
      {
        id: 104,
        key: '104',
        label: '深铁集团',
        parentId: 100,
        weight: 2,
      },
    ],
  },
  {
    id: 200,
    key: '200',
    label: '平台组件中心',
    parentId: 0,
    weight: 2,
    children: [
      {
        id: 201,
        key: '201',
        label: '研发部门',
        parentId: 200,
        weight: 1,
      },
      {
        id: 202,
        key: '202',
        label: '市场部门',
        parentId: 200,
        weight: 2,
      },
    ],
  },
];

const userSeed: User[] = [
  createUser({
    createTime: '2026-05-05 00:00:00',
    deptId: 200,
    deptName: '平台组件中心',
    email: 'mock.admin@gzzr.local',
    nickName: 'Mock 管理员',
    phonenumber: '13800000000',
    roleIds: ['1'],
    roles: [adminRole],
    status: EnableStatus.Enable,
    userId: String(SUPERADMIN_USER_ID),
    userName: 'admin',
  }),
  createUser({
    createTime: '2026-05-06 09:20:18',
    deptId: 102,
    deptName: '通号中心',
    email: 'signal.user@gzzr.local',
    nickName: '通号用户',
    phonenumber: '13826965240',
    roleIds: ['2'],
    roles: [operatorRole],
    status: EnableStatus.Enable,
    userId: '1002',
    userName: 'signal_user',
  }),
  createUser({
    createTime: '2026-05-06 10:18:36',
    deptId: 103,
    deptName: '客运二分公司',
    email: 'passenger.user@gzzr.local',
    nickName: '客运用户',
    phonenumber: '17834552434',
    roleIds: ['2'],
    roles: [operatorRole],
    status: EnableStatus.Disable,
    userId: '1003',
    userName: 'passenger_user',
  }),
  createUser({
    createTime: '2026-05-06 11:35:42',
    deptId: 202,
    deptName: '市场部门',
    email: 'market.user@gzzr.local',
    nickName: '市场用户',
    phonenumber: '13822458989',
    roleIds: ['2'],
    roles: [operatorRole],
    status: EnableStatus.Enable,
    userId: '1004',
    userName: 'market_user',
  }),
];

let users: User[] = cloneUsers(userSeed);

export const typicalUserTableColumns: TableProps['columns'] =
  (systemUserColumns as SystemUserColumn[])
    .filter((column) => {
      const field = column.field;
      return !!field && [
        'action',
        'avatar',
        'createTime',
        'deptName',
        'nickName',
        'phonenumber',
        'status',
        'userName',
      ].includes(field);
    })
    .map((column) => {
      const field = column.field as string;
      return {
        dataIndex: field === 'action' ? undefined : field,
        fixed: field === 'action' ? 'right' : undefined,
        key: field,
        title: column.title,
        width: field === 'action' ? 190 : column.minWidth,
      };
    });

function createUser(seed: Partial<User>): User {
  return {
    avatar: '',
    createTime: '',
    dept: {
      ancestors: '',
      deptId: Number(seed.deptId ?? 0),
      deptName: seed.deptName ?? '',
      email: '',
      leader: '',
      orderNum: 0,
      parentId: 0,
      phone: '',
      status: EnableStatus.Enable,
    },
    deptId: Number(seed.deptId ?? 0),
    deptName: seed.deptName ?? '',
    email: seed.email ?? '',
    loginDate: '',
    loginIp: '',
    nickName: seed.nickName ?? '',
    phonenumber: seed.phonenumber ?? '',
    postIds: seed.postIds ?? [],
    remark: seed.remark ?? '',
    roleId: seed.roleId ?? '',
    roleIds: seed.roleIds ?? [],
    roles: seed.roles ?? [],
    sex: seed.sex ?? '0',
    status: seed.status ?? EnableStatus.Enable,
    tenantId: seed.tenantId ?? '000000',
    userId: String(seed.userId ?? ''),
    userName: seed.userName ?? '',
    userType: seed.userType ?? 'sys_user',
    ...seed,
  };
}

function cloneUsers(source: User[]): User[] {
  return source.map((item) => ({
    ...item,
    dept: { ...item.dept },
    postIds: [...(item.postIds ?? [])],
    roleIds: [...(item.roleIds ?? [])],
    roles: item.roles.map((role) => ({ ...role })),
  }));
}

function cloneDeptTree(source: DeptTree[]): DeptTree[] {
  return source.map((item) => ({
    ...item,
    children: item.children ? cloneDeptTree(item.children) : undefined,
  }));
}

function includesText(source: null | string | undefined, keyword?: string) {
  if (!keyword) {
    return true;
  }
  return (source ?? '').toLowerCase().includes(keyword.toLowerCase());
}

function inCreateTimeRange(user: User, query: TypicalUserQuery) {
  const beginTime = query['params[beginTime]'];
  const endTime = query['params[endTime]'];
  if (!beginTime && !endTime) {
    return true;
  }

  const current = new Date(user.createTime.replace(' ', 'T')).getTime();
  const begin = beginTime
    ? new Date(beginTime.replace(' ', 'T')).getTime()
    : Number.NEGATIVE_INFINITY;
  const end = endTime
    ? new Date(endTime.replace(' ', 'T')).getTime()
    : Number.POSITIVE_INFINITY;

  return current >= begin && current <= end;
}

export async function getTypicalDeptTree() {
  return cloneDeptTree(deptTreeSeed);
}

export async function getTypicalUserList(
  query: TypicalUserQuery = {},
): Promise<PageResult<User>> {
  const pageNum = Number(query.pageNum ?? 1);
  const pageSize = Number(query.pageSize ?? 10);

  const filtered = users.filter((user) => {
    const matchDept =
      !query.deptId || String(user.deptId) === String(query.deptId);
    const matchUserName = includesText(user.userName, query.userName);
    const matchNickName = includesText(user.nickName, query.nickName);
    const matchPhone = includesText(user.phonenumber, query.phonenumber);
    const matchStatus = !query.status || user.status === query.status;

    return (
      matchDept &&
      matchUserName &&
      matchNickName &&
      matchPhone &&
      matchStatus &&
      inCreateTimeRange(user, query)
    );
  });

  const start = (pageNum - 1) * pageSize;
  const end = start + pageSize;

  return {
    rows: cloneUsers(filtered.slice(start, end)),
    total: filtered.length,
  };
}

export async function saveTypicalUser(data: Partial<User>) {
  if (data.userId) {
    users = users.map((user) =>
      String(user.userId) === String(data.userId)
        ? createUser({ ...user, ...data })
        : user,
    );
    return;
  }

  const maxUserId = Math.max(...users.map((user) => Number(user.userId)), 1000);
  users = [
    createUser({
      ...data,
      createTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      userId: String(maxUserId + 1),
    }),
    ...users,
  ];
}

export async function removeTypicalUsers(userIds: Array<number | string>) {
  const idSet = new Set(userIds.map(String));
  users = users.filter((user) => !idSet.has(String(user.userId)));
}

export async function changeTypicalUserStatus(
  userId: number | string,
  status: string,
) {
  users = users.map((user) =>
    String(user.userId) === String(userId) ? { ...user, status } : user,
  );
}

export async function resetTypicalUserPassword() {}
