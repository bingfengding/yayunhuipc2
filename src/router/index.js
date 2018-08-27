import Vue from 'vue'
import Router from 'vue-router'
const home = r =>
  require.ensure([], () => r(require("@/components/home.vue")), "home");
Vue.use(Router)
export const RouterMap = [
    {path: "",
    redirect: "home"},
    {
      path: '/home',
      name: 'home',
      component: home
    },
  ];
  const router = new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: RouterMap
  });
  
export default router;