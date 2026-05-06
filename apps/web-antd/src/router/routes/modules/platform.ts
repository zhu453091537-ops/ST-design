import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '工作台',
    },
    name: 'Platform',
    path: '/workbench',
    redirect: '/platform/typical-page',
    children: [
      {
        component: () => import('#/views/platform/typical-page/index.vue'),
        meta: {
          activePath: '/platform/typical-page',
          icon: 'lucide:layout-dashboard',
          title: '典型页面验证场',
        },
        name: 'PlatformTypicalPage',
        path: '/platform/typical-page',
      },
    ],
  },
];

export default routes;
