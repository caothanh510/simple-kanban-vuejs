<template>
  <a-row id="add-card" type="flex" justify="center" align="top">
    <br/>
    <a-button type="primary" @click="showAddCardModal({ object: {status: status}, is_card_modal: true, is_edit_card: false })" icon="plus-circle">
      Add another card
    </a-button>
  </a-row>
</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator"
import { State, Action } from "vuex-class"

@Component({})
export default class AddCard extends Vue {
  @State(state => state.Card) Card
  @Prop() status
  @Action("Card/showAddCardModal") showAddCardModal
}
</script>
