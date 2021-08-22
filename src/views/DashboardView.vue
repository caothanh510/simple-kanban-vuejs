<template>
  <div>
    <TheHeader />
    <div id="dashboard">
      <a-row :gutter="24" type="flex" justify="center" align="top">
        <a-spin tip="Loading..." v-if="Card.is_loading">
          <div class="spin-content">
          </div>
        </a-spin>
        <div v-drag-and-drop:options="this.card_options" class="drag-wrapper">
          <!-- optional renderless component -->
            <vue-draggable-group
              v-for="(column, column_status) in Card.list_column"
              v-model="column.tickets"
              :groups="[Card.list_column]"
              :key="'column-' + column_status + Card.is_card_modal"
              :data-id="column_status"
              class="list-column `$"
            >
              <a-col id="column-drag" :span="8">
                <a-card :title="column.name" :bordered="false">
                  <div v-for="ticket in column.tickets"
                    :key="'ticket-' + ticket.id"
                    :data-id="'ticket-' + ticket.id"
                    class="ticket-item"
                  >
                    <CardItem :status="column_status" :id="ticket.id" :title="ticket.title" :description="ticket.description"/>
                    <br />
                  </div>
                </a-card>
                <AddCard :status="column_status" />
              </a-col>
            </vue-draggable-group>
            <CardModal />
        </div>
      </a-row>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator"
import { State, Action } from "vuex-class"
import TheHeader from "@/components/TheHeader"
import TheFooter from "@/components/TheFooter"
import CardItem from "@/components/CardItem"
import AddCard from "@/components/AddCard"
import CardModal from "@/components/CardModal"

@Component({
  components: {
    TheHeader,
    TheFooter,
    CardItem,
    AddCard,
    CardModal
  },
})
export default class DashboardView extends Vue {
  @State(state => state.Card) Card
  @Action("Card/getAllTicket") getAllTicket
  @Action("Card/updateStatus") updateStatus
  data() {
    return {
      card_options: {}
    }
  }
  created(){
    this.card_options = {
      dropzoneSelector: "#column-drag",
      draggableSelector: ".card-item",
      onDragend(event) {
        let drag_data = {
          id: event.items[0].id,
          status: event.droptarget.dataset.id,
          old_status: event.items[0].dataset.status
        }
        this.updateStatus(drag_data)
      }
    }
  }
  mounted(){
    this.getAllTicket()
  }
}
</script>


<style lang="scss">
#add-card button {
  width: 100%;
}
#dashboard{
  background-color: #ececec; padding: 20px;
  .list-column{
    .ant-card{
      width: 100% !important;
    }
  }
}
.ant-layout{
  height: 100vh;
  background-color: #ececec;
}
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
.ant-spin-nested-loading{
  width: 100%;
  height: 100%;
  position: absolute;
  background: #e6f7ff;
  z-index: 99999;
  opacity: 0.5;
  bottom: 0;
}
</style>
