import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'

Vue.use(VueScrollTo, {
  offset: -80 // 固定ヘッダーがある場合に、オフセットで調整する
})