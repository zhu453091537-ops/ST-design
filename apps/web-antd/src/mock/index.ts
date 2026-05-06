import { DEFAULT_TENANT_ID } from '@vben/constants';

import type { Menu } from '#/api/core/menu';

const MOCK_ACCESS_TOKEN = 'mock-access-token';

function isMockMode() {
  return import.meta.env.VITE_USE_MOCK === 'true';
}

const mockLoginResult = {
  access_token: MOCK_ACCESS_TOKEN,
  client_id: import.meta.env.VITE_GLOB_APP_CLIENT_ID || 'mock-client-id',
  expire_in: 7_200,
};

const mockTenantResp = {
  tenantEnabled: false,
  voList: [
    {
      companyName: 'Mock 默认租户',
      tenantId: DEFAULT_TENANT_ID,
    },
  ],
};

const mockCaptchaResp = {
  captchaEnabled: false,
  img: '',
  uuid: 'mock-captcha-uuid',
};

const mockUserInfoResp = {
  permissions: ['*:*:*'],
  roles: ['admin'],
  user: {
    avatar: '',
    createTime: '2026-05-05 00:00:00',
    deptId: 100,
    deptName: '平台组件中心',
    email: 'mock.admin@gzzr.local',
    loginDate: '2026-05-05 00:00:00',
    loginIp: '127.0.0.1',
    nickName: 'Mock 管理员',
    phonenumber: '13800000000',
    remark: '前端静态开发 Mock 用户',
    roles: [
      {
        dataScope: '1',
        flag: true,
        roleId: 1,
        roleKey: 'admin',
        roleName: '管理员',
        roleSort: 1,
        status: '0',
        superAdmin: false,
      },
    ],
    sex: '0',
    status: '0',
    tenantId: DEFAULT_TENANT_ID,
    userId: 1,
    userName: 'admin',
    userType: 'sys_user',
  },
};

const disabledTopMenus = [
  '蓄电池',
  '基本信息',
  '劳保用品管理',
  '统计查询',
  '租户管理',
  '系统监控',
  '系统工具',
  '更多菜单',
].map((title, index) => ({
  children: [],
  component: 'Layout',
  disabled: true,
  hidden: false,
  meta: {
    disabled: true,
    icon: 'lucide:circle',
    noCache: false,
    order: 20 + index,
    title,
  },
  name: `PreviewMenu${index + 1}`,
  path: `/preview-menu-${index + 1}`,
}));

const mockBackendMenuList = [
  {
    children: [
      {
        children: [],
        component: 'platform/typical-page/index',
        hidden: false,
        meta: {
          icon: 'lucide:layout-dashboard',
          noCache: false,
          title: '典型页面验证场',
        },
        name: 'PlatformTypicalPage',
        path: '/platform/typical-page',
      },
    ],
    component: 'Layout',
    hidden: false,
    meta: {
      icon: 'lucide:layout-dashboard',
      noCache: false,
      order: 0,
      title: '工作台',
    },
    name: 'Platform',
    path: '/workbench',
  },
  {
    children: [
      {
        children: [],
        component: 'system/user/index',
        hidden: false,
        meta: {
          icon: 'lucide:user',
          noCache: false,
          title: '用户管理',
        },
        name: 'SystemUser',
        path: '/system/user',
      },
      {
        children: [],
        component: 'system/post/index',
        hidden: false,
        meta: {
          icon: 'lucide:id-card',
          noCache: false,
          title: '岗位管理',
        },
        name: 'SystemPost',
        path: '/system/post',
      },
      {
        children: [],
        component: 'system/dept/index',
        hidden: false,
        meta: {
          icon: 'lucide:network',
          noCache: false,
          title: '部门管理',
        },
        name: 'SystemDept',
        path: '/system/dept',
      },
    ],
    component: 'Layout',
    hidden: false,
    meta: {
      icon: 'lucide:settings',
      noCache: false,
      order: 1,
      title: '系统管理',
    },
    name: 'SystemManagement',
    path: '/system',
  },
  ...disabledTopMenus,
] satisfies Menu[];

function getMockBackendMenuList() {
  return JSON.parse(JSON.stringify(mockBackendMenuList)) as Menu[];
}

export {
  getMockBackendMenuList,
  isMockMode,
  mockBackendMenuList,
  mockCaptchaResp,
  mockLoginResult,
  mockTenantResp,
  mockUserInfoResp,
};
