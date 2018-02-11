import plugin from '@'
import Vue from 'vue'
import sinon from 'sinon'
Vue.use(plugin, {
  level: 'debug'
})

describe('$console', () => {
  let vm
  beforeEach(() => {
    sinon.spy(console, 'debug')
    sinon.spy(console, 'info')
    sinon.spy(console, 'warn')
    sinon.spy(console, 'error')
    vm = new Vue({
      name: 'app',
      created () {
        this.$console.debug('test console debug')
        this.$console.info('test console info')
        this.$console.warn('test console warn')
        this.$console.error('test console error')
      }
    })
  })

  it('debug, info, ', (cb) => {
    vm.$nextTick(() => {
      assert(console.debug.calledOnce)
      assert(console.info.calledOnce)
      assert(console.warn.calledOnce)
      assert(console.error.calledOnce)
      cb()
    })
  })
})
