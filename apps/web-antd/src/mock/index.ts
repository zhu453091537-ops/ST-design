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

const mockBackendMenuList = [
  {
    children: [
      {
        children: [],
        component: 'dashboard/analytics/index',
        hidden: false,
        meta: {
          icon: 'lucide:chart-line',
          noCache: false,
          title: '分析页',
        },
        name: 'Analytics',
        path: '/analytics',
      },
      {
        children: [],
        component: 'dashboard/workspace/index',
        hidden: false,
        meta: {
          icon: 'lucide:briefcase-business',
          noCache: false,
          title: '工作台',
        },
        name: 'Workspace',
        path: '/workspace',
      },
      {
        children: [],
        component: '演示使用自行删除/changelog/index',
        hidden: false,
        meta: {
          icon: 'lucide:book-open-text',
          noCache: false,
          title: '更新记录',
        },
        name: 'V5UpdateLog',
        path: '/changelog',
      },
    ],
    component: 'Layout',
    hidden: false,
    meta: {
      icon: 'lucide:layout-dashboard',
      noCache: false,
      title: '概览',
    },
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    children: [],
    component: '_core/about/index',
    hidden: false,
    meta: {
      icon: 'lucide:copyright',
      noCache: false,
      title: '关于',
    },
    name: 'About',
    path: '/vben-admin/about',
  },
  {
    children: [
      {
        children: [],
        component: 'platform/typical-page/index',
        hidden: false,
        meta: {
          icon: 'lucide:table',
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
      icon: 'lucide:table',
      noCache: false,
      title: '平台组件',
    },
    name: 'Platform',
    path: '/platform',
  },
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
