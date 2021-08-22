<template>
  <a-card :id="id" :data-status="status" class="card-item" hoverable style="width: 300px">
    <img
      slot="cover"
      alt="example"
      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    />
    <template slot="actions" class="ant-card-actions">
      <a-icon key="edit" type="edit" @click="editCard({ is_edit_card: true, object: { id: id, title: title, description: description, status: status }, is_card_modal: true })" />
      <a-icon key="delete" type="delete" @click="deleteCard({id: id, status: status})" />
    </template>
    <a-card-meta :title="title">
    </a-card-meta>
  </a-card>
</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator"
import { State, Action } from "vuex-class"

@Component({})
export default class CardItem extends Vue {
  @Prop() id
  @Prop() title
  @Prop() description
  @Prop() status
  @State(state => state.list_column) list_column
  @State(state => state.Card) Card
  @Action("Card/editCard") editCard
  @Action("Card/deleteCard") deleteCard
}
</script>
