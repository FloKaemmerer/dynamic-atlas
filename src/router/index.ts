import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [

        {
            path: '/',
            name: 'home',
            component: () => import('@/components/DynamicAtlas.vue')
        },
        {
            path: '/atlasNodeEditorTableView/',
            name: 'atlasNodeEditorTableView',
            component: () => import('@/components/atlas_node_editor/AtlasNodesEditorTableView.vue')
        }
    ]
})

export default router
