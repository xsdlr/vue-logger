import Vue from 'vue'
import plugin from 'vue-plugin'
Vue.use(plugin, {
  level: 'info'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  name: 'app',
  data () {
    return {
      msg: 'Please see the information in console panel.'
    }
  },
  template: `
    <div id="app">
      {{msg}}
    </div>
  `,
  created () {
    this.$console.debug('test console debug')
    this.$console.info('test console info')
    this.$console.warn('test console warn')
    this.$console.error('test console error')
  }
})
