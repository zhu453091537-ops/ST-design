import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      hideInMenu: true,
      title: '系统用户',
    },
    name: 'SystemUser',
    path: '/system/user',
    component: () => import('#/views/system/user/index.vue'),
  },
  {
    meta: {
      hideInMenu: true,
      title: '岗位管理',
    },
    name: 'SystemPost',
    path: '/system/post',
    component: () => import('#/views/system/post/index.vue'),
  },
  {
    meta: {
      hideInMenu: true,
      title: '部门管理',
    },
    name: 'SystemDept',
    path: '/system/dept',
    component: () => import('#/views/system/dept/index.vue'),
  },
];

export default routes;
