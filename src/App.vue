<template>
  <div class="card-container">
    <a-layout>
      <router-view></router-view>
    </a-layout>
  </div>
</template>

<script>
import Vue from "vue"
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueDraggable from 'vue-draggable'

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(VueDraggable);

export default Vue.extend({
  name: "App",
})
</script>
