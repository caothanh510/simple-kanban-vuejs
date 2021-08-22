import Vue from "vue"
import Vuex from "vuex"
import Card from "./modules/card"

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Card
  },
  actions: {
    messageNotification({ state, commit }, payload)   {
      if (payload.status) {
        Vue.prototype.$message.success(payload.message)
      } else {
        Vue.prototype.$message.error(payload.message)
      }
    },
    openNotification({ state }, data) {
      Vue.prototype.$notification["error"]({
        duration: 0,
        message: data.title,
        description: data.message,
      })
    },
  },
})
