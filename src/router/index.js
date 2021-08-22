import Vue from "vue"
import Router from "vue-router"
import DashboardView from "@/views/DashboardView"

Vue.use(Router)

export default new Router({
  routes: [{ path: "/", name: "List Todo", component: DashboardView }],
})
