<template>
  <a-modal v-model="Card.is_card_modal" :title="Card.is_edit_card ? 'Edit Card' : 'Add Card'" >
    <a-input placeholder="Title" v-model="Card.object.title" />
    <p></p>
    <a-textarea placeholder="Description" v-model="Card.object.description" />

    <template slot="footer">
      <a-button @click="showAddCardModal({ is_card_modal: false })">
        Cancel
      </a-button>
      
      <a-button v-if="!Card.is_edit_card" key="submit" type="primary" @click="addCard()">
        Create
      </a-button>

      <a-button v-if="Card.is_edit_card" key="submit" type="primary" @click="updateCard()">
        Update
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import { Component, Vue } from "vue-property-decorator"
import { State, Action } from "vuex-class"

@Component({})
export default class CardModal extends Vue {
  @State(state => state.Card) Card
  @Action("Card/addCard") addCard
  @Action("Card/updateCard") updateCard
  @Action("Card/showAddCardModal") showAddCardModal
}
</script>
