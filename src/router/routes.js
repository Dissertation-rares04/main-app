import { authGuard } from "@auth0/auth0-vue"

const routes = [
  {
    path: '/', component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/HomePage.vue')
      },
      {
        path: '/post/:id',
        name: 'post',
        props: true,
        beforeEnter: authGuard,
        component: () => import('pages/PostPage.vue')
      },
      {
        path: '/my-posts',
        name: 'my-posts',
        beforeEnter: authGuard,
        component: () => import('pages/MyPostsPage.vue')
      },
      {
        path: '/categories-posts',
        name: 'categories-posts',
        beforeEnter: authGuard,
        component: () => import('pages/CategoriesPostsPage.vue')
      },
      {
        path: '/recommendations',
        name: 'recommendations',
        beforeEnter: authGuard,
        component: () => import('pages/RecommendationsPage.vue')
      },
      {
        path: '/create-post',
        name: 'create-post',
        beforeEnter: authGuard,
        component: () => import('pages/CreatePostPage.vue')
      },
      {
        path: '/edit-post/:id',
        name: 'edit-post',
        props: true,
        beforeEnter: authGuard,
        component: () => import('pages/EditPostPage.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        beforeEnter: authGuard,
        component: () => import('pages/ProfilePage.vue')
      },
      {
        path: '/callback',
        name: 'callback',
        component: () => import('header_app/CallbackPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
