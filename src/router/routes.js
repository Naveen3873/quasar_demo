
const routes = [
  {
    path: '/',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: () => import('pages/Index.vue') },
      { path: '/profile', component: () => import('src/pages/Profile.vue') },
      { path: '/dashboard', component: () => import('src/pages/Dashboard.vue') },
      { path: '/examples', component: () => import('pages/Examples.vue') },
      { path: '/post', component: () => import('pages/Posts.vue') }
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
