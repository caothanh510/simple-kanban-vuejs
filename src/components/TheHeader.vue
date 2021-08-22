<template>
  <header>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="Thanh Huynh"
      sub-title="Simple Kanban Board With VueJs 2, Firebase"
      @back="() => null"
    />
  </header>
</template>

<script>
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class TheHeader extends Vue {}
</script>
