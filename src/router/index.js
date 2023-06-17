import { createRouter, createWebHistory } from 'vue-router'
const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        // {
        //     path: '/',
        //     component: () => import('../components/HelloWorld.vue')
        // }, {
        //     path: '/page1',
        //     component: () => import('../views/page1.vue')
        // }, {
        //     path: '/page2',
        //     component: () => import('../views/page2.vue')
        // }, 
        {
            path: '/stock-calculator',
            component: () => import('../views/stock-calculator.vue'),
        }
    ]
})

router.beforeEach((to, from, next) => {

    //若為錯誤的URL，一律導向至stock-calculator頁面
    if (to.matched.length === 0) {
      next('/stock-calculator');

      return;
    }

    next();
});


export default router