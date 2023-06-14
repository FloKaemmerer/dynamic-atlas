import {createRouter, createWebHistory} from 'vue-router'
import NotFound from "@/views/NotFound.vue";
import AtlasNodesEditorTableView from "@/views/AtlasNodesEditorTableView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [

        {
            path: '/',
            name: 'home',
            component: () => import('@/components/DynamicAtlas.vue')
        },
        {
            path: '/atlasNodes',
            name: 'AtlasNodes',
            alias: '/atlasNodes',
            component: AtlasNodesEditorTableView,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound
        },
    ]
})

export default router
