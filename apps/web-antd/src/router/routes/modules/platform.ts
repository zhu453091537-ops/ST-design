import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:table',
      order: -1,
      title: '平台组件',
    },
    name: 'Platform',
    path: '/platform',
    redirect: '/platform/typical-page',
    children: [
      {
        component: () => import('#/views/platform/typical-page/index.vue'),
        meta: {
          icon: 'lucide:table',
          title: '典型页面验证场',
        },
        name: 'PlatformTypicalPage',
        path: '/platform/typical-page',
      },
    ],
  },
];

export default routes;
