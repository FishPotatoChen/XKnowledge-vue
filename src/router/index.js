import {createRouter, createWebHashHistory} from 'vue-router'
import IndexView from "@/views/IndexView.vue";
import NewGraphView from "@/views/NewGraphView.vue";

const routes = [
    {path: '/', name: 'home', component: IndexView},
    {path: '/newGraph', name: 'newGraph', component: NewGraphView},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
