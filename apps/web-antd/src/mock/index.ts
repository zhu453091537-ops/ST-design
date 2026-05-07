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
        component: 'project/overview/index',
        hidden: false,
        meta: {
          icon: 'lucide:layout-dashboard',
          noCache: false,
          title: '项目总览',
        },
        name: 'WorkbenchIndex',
        path: '/workbench/index',
      },
    ],
    component: 'Layout',
    hidden: false,
    meta: {
      icon: 'lucide:layout-dashboard',
      noCache: false,
      order: 0,
      title: '项目全景管理',
    },
    name: 'WorkbenchMenu',
    path: '/workbench',
  },
  {
    children: [
      {
        children: [],
        component: 'platform/typical-page/index',
        hidden: false,
        meta: {
          icon: 'lucide:user',
          noCache: false,
          title: '用户管理',
        },
        name: 'SystemUserMenu',
        path: '/platform/typical-page',
      },
    ],
    component: 'Layout',
    hidden: false,
    meta: {
      icon: 'lucide:settings',
      noCache: false,
      order: 1,
      title: '人员全生命周期',
    },
    name: 'SystemManagementMenu',
    path: '/system',
  },
  {
    children: [
      {
        children: [],
        component: 'platform/blank/index',
        hidden: false,
        meta: {
          icon: 'lucide:battery',
          noCache: false,
          title: '空白占位',
        },
        name: 'BatteryIndex',
        path: '/battery/index',
      },
    ],
    component: 'Layout',
    hidden: false,
    meta: {
      icon: 'lucide:battery',
      noCache: false,
      order: 20,
      title: '智能考勤管理',
    },
    name: 'BatteryMenu',
    path: '/battery',
  },
  {
    children: [
      {
        children: [],
        component: 'platform/blank/index',
        hidden: false,
        meta: {
          icon: 'lucide:info',
          noCache: false,
          title: '空白占位',
        },
        name: 'BasicInfoIndex',
        path: '/basic-info/index',
      },
    ],
    component: 'Layout',
    hidden: false,
    meta: {
      icon: 'lucide:info',
      noCache: false,
      order: 21,
      title: '培训与认证管理',
    },
    name: 'BasicInfoMenu',
    path: '/basic-info',
  },
  {
    children: [
      {
        children: [],
        component: 'platform/blank/index',
        hidden: false,
        meta: {
          icon: 'lucide:shield',
          noCache: false,
          title: '空白占位',
        },
        name: 'LaborSuppliesIndex',
        path: '/labor-supplies/index',
      },
    ],
    component: 'Layout',
    hidden: false,
    meta: {
      icon: 'lucide:shield',
      noCache: false,
      order: 22,
      title: '安全与质量闭环',
    },
    name: 'LaborSuppliesMenu',
    path: '/labor-supplies',
  },
  {
    children: [
      {
        children: [],
        component: 'platform/blank/index',
        hidden: false,
        meta: {
          icon: 'lucide:bar-chart-3',
          noCache: false,
          title: '空白占位',
        },
        name: 'StatisticsIndex',
        path: '/statistics/index',
      },
    ],
    component: 'Layout',
    hidden: false,
    meta: {
      icon: 'lucide:bar-chart-3',
      noCache: false,
      order: 23,
      title: '供应商/承包商管理',
    },
    name: 'StatisticsMenu',
    path: '/statistics',
  },
  {
    children: [
      {
        children: [],
        component: 'platform/blank/index',
        hidden: false,
        meta: {
          icon: 'lucide:building-2',
          noCache: false,
          title: '空白占位',
        },
        name: 'TenantIndex',
        path: '/tenant/index',
      },
    ],
    component: 'Layout',
    hidden: false,
    meta: {
      icon: 'lucide:building-2',
      noCache: false,
      order: 24,
      title: '委外人员自助门户',
    },
    name: 'TenantMenu',
    path: '/tenant',
  },
  {
    children: [
      {
        children: [],
        component: 'platform/blank/index',
        hidden: false,
        meta: {
          icon: 'lucide:shield-check',
          noCache: false,
          title: '空白占位',
        },
        name: 'MonitorIndex',
        path: '/monitor/index',
      },
    ],
    component: 'Layout',
    hidden: false,
    meta: {
      icon: 'lucide:shield-check',
      noCache: false,
      order: 25,
      title: '系统集成与数据联动',
    },
    name: 'MonitorMenu',
    path: '/monitor',
  },
  {
    children: [
      {
        children: [],
        component: 'platform/blank/index',
        hidden: false,
        meta: {
          icon: 'lucide:tool',
          noCache: false,
          title: '空白占位',
        },
        name: 'ToolIndex',
        path: '/tool/index',
      },
    ],
    component: 'Layout',
    hidden: false,
    meta: {
      icon: 'lucide:tool',
      noCache: false,
      order: 26,
      title: '成本管理与综合评价',
    },
    name: 'ToolMenu',
    path: '/tool',
  },
  {
    children: [
      {
        children: [],
        component: 'platform/blank/index',
        hidden: false,
        meta: {
          icon: 'lucide:ellipsis',
          noCache: false,
          title: '空白占位',
        },
        name: 'MoreIndex',
        path: '/more/index',
      },
    ],
    component: 'Layout',
    hidden: false,
    meta: {
      icon: 'lucide:ellipsis',
      noCache: false,
      order: 27,
      title: '系统管理与可视化',
    },
    name: 'MoreMenu',
    path: '/more',
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
