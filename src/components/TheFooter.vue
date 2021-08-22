<template>
  <footer id="footer">
    <a-row id="add-card" type="flex" justify="center" align="top">
      <a href="http://thanhhuynh.info/"><strong>Thanh Huynh</strong> ©{{ new Date().getFullYear() }}</a>
    </a-row>
  </footer>
</template>

<script>
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class TheFooter extends Vue {
}
</script>

<style lang="scss">
#footer{
  height: 50px;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
    