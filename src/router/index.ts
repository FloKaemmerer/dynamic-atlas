import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: () => import('@/components/DynamicAtlas.vue')
    },
    {
      path:'/atlasNodes',
      name:'atlasNodeEditor',
      component: () => import('@/components/atlas_node_editor/AtlasNodeEditor.vue')
    }
  ]
})

export default router
