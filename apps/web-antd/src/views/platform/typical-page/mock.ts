export interface PlatformTypicalDept {
  children?: PlatformTypicalDept[];
  key: string;
  title: string;
}

export interface PlatformTypicalUser {
  account: string;
  createTime: string;
  deptId: string;
  deptName: string;
  email: string;
  id: number;
  name: string;
  role: string;
  status: 'disabled' | 'enabled' | 'locked';
}

export const typicalDeptTree: PlatformTypicalDept[] = [
  {
    key: 'group',
    title: '集团总部',
    children: [
      { key: 'product', title: '产品中心' },
      { key: 'operation', title: '运营中心' },
    ],
  },
  {
    key: 'region',
    title: '区域组织',
    children: [
      { key: 'east', title: '华东区域' },
      { key: 'south', title: '华南区域' },
    ],
  },
];

export const typicalRoleOptions = [
  { label: '全部角色', value: '' },
  { label: '管理员', value: '管理员' },
  { label: '运营人员', value: '运营人员' },
  { label: '审核人员', value: '审核人员' },
];

export const typicalStatusOptions = [
  { label: '全部状态', value: '' },
  { label: '启用', value: 'enabled' },
  { label: '停用', value: 'disabled' },
  { label: '锁定', value: 'locked' },
];

export const typicalUsers: PlatformTypicalUser[] = [
  {
    account: 'linna',
    createTime: '2026-05-01 09:12:30',
    deptId: 'product',
    deptName: '产品中心',
    email: 'linna@example.com',
    id: 1001,
    name: '林娜',
    role: '管理员',
    status: 'enabled',
  },
  {
    account: 'chenyu',
    createTime: '2026-05-02 13:24:10',
    deptId: 'operation',
    deptName: '运营中心',
    email: 'chenyu@example.com',
    id: 1002,
    name: '陈宇',
    role: '运营人员',
    status: 'enabled',
  },
  {
    account: 'wangmin',
    createTime: '2026-05-03 17:30:42',
    deptId: 'east',
    deptName: '华东区域',
    email: 'wangmin@example.com',
    id: 1003,
    name: '王敏',
    role: '审核人员',
    status: 'locked',
  },
  {
    account: 'zhaolei',
    createTime: '2026-05-04 10:08:19',
    deptId: 'south',
    deptName: '华南区域',
    email: 'zhaolei@example.com',
    id: 1004,
    name: '赵磊',
    role: '运营人员',
    status: 'disabled',
  },
  {
    account: 'sunyi',
    createTime: '2026-05-05 08:45:11',
    deptId: 'product',
    deptName: '产品中心',
    email: 'sunyi@example.com',
    id: 1005,
    name: '孙怡',
    role: '审核人员',
    status: 'enabled',
  },
];
