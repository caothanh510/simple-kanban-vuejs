import Vue from "vue"
import log from "../log_error"
import { ServiceFactory } from "./../../services/service.factory"
const TicketServices = ServiceFactory.get("ticket")

export default {
  namespaced: true,
  state: {
    is_loading: false,
    is_card_modal: false,
    is_edit_card: false,
    list_column: {
      todo: {
        name: 'TODO',
        tickets: []
      },
      doing: {
        name: 'DOING',
        tickets: []
      },
      done: {
        name: 'DONE',
        tickets: []
      }
    },
    object: {
      id: '',
      title: '',
      description: '',
      status: ''
    }
  },
  mutations: {
    SET_GENERNAL(state, data) {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          let value = data[key]
          state[key] = value
        }
      }
    }
  },
  actions: {
    async updateStatus({ state, commit, dispatch }, payload){
      let task = state.object
      let [err, resp] = await log(TicketServices.update(payload.id, {  status: payload.status }))
      commit("SET_GENERNAL", { is_loading: true })
      if (err) {
        dispatch("openNotification", { title: 'Error: ', message: err }, { root: true })
      }else{
        dispatch("messageNotification", { status: true, message: 'The ticket was updated status successfully!' }, { root: true })
        dispatch('getAllTicket', payload)
      }
    },
    async getAllTicket({ state, commit, dispatch }, payload) {
      try{
        commit("SET_GENERNAL", { is_loading: true })
        let resp = await TicketServices.getAll()
        let list_column = state.list_column
        
        if(payload && payload.old_status){
          let old_column_tickets = list_column[payload.old_status].tickets
          let item_index = old_column_tickets.findIndex(i => i.id === payload.id)
          old_column_tickets.splice(item_index, 1)
        }

        if(resp){
          resp.onSnapshot((docs) => {
            docs.forEach((task, i) => {
              let status = task.data().status
              let tickets = list_column[status].tickets
              let item_index = tickets.findIndex(i => i.id === task.id)
              let item_data = {
                id: task.id,
                title: task.data().title,
                description: task.data().description,
                status: task.data().status,
              }

              if(item_index === -1){
                list_column[status].tickets.push(item_data)
              }else{
                list_column[status].tickets[item_index] = item_data
              }
              commit("SET_GENERNAL", { list_column: list_column })
              commit("SET_GENERNAL", { is_loading: false })
            })
          })
        }
      }catch(e){
        dispatch("openNotification", { title: 'Error: ', message: e.message }, { root: true })
        commit("SET_GENERNAL", { is_loading: false })
      }
    },
    async addCard({ state, commit, dispatch }) {
      let data = {
        title: state.object.title,
        description: state.object.description,
        status: state.object.status
      }

      if (!data.title || !data.description) {
        dispatch("openNotification", { title: 'Error: ', message: "All Fields Is Require" }, { root: true })
      }

      let [err, resp] = await log(TicketServices.create(data))

      if(resp){
        dispatch("messageNotification", { status: true, message: 'The status was created successfully!' }, { root: true })
      }

      if (err) {
        dispatch("openNotification", { title: 'Error: ', message: err }, { root: true })
      }
      commit("SET_GENERNAL", { is_card_modal: false, object: { title: '', description: '', status: '' } })
    },
    editCard({ state, commit }, payload) {
      commit("SET_GENERNAL", payload)
    },
    async updateCard({ state, commit, dispatch }) {
      let task = state.object
      let [err, resp] = await log(TicketServices.update(task.id, { title: task.title,
                                                                    description: task.description,
                                                                    status: task.status,
                                                                  }))
      if (err) {
        dispatch("openNotification", { title: 'Error: ', message: err }, { root: true })
      }else{
        dispatch("messageNotification", { status: true, message: 'The ticket was updated successfully!' }, { root: true })
      }
      commit("SET_GENERNAL", { is_card_modal: false })
    },
    async deleteCard({ state, commit, dispatch }, payload) {
      let [err, resp] = await log(TicketServices.delete(payload.id))

      if (err) {
        dispatch("openNotification", { title: 'Error: ', message: err }, { root: true })
      }else{
        dispatch("messageNotification", { status: true, message: 'The ticket was deleted successfully!' }, { root: true })
        dispatch('getAllTicket', { id: payload.id, old_status: payload.status })
      }
    },
    showAddCardModal({ state, commit }, payload) {
      commit("SET_GENERNAL", payload)
    }
  },
}
