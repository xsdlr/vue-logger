import logger from 'log4js-helper'

function loggerCreator () {
  const {name, __file: filePath} = this.$options || {}
  const tag = filePath ? `file：${filePath}` : name ? `component：${name}` : null
  const hookFunc = ['debug', 'info', 'warn', 'error']
  return hookFunc.reduce(function (object, key) {
    return Object.assign(object, {
      [key]: tag ? logger[key].bind(logger, `[${tag}]`) : logger[key].bind(logger)
    })
  }, logger)
}

export const install = (Vue, options = {}) => {
  // avoid duplicate init
  if (install.installed) return
  install.installed = true
  const {level} = options
  level && logger.setLevel(level)
  let $console
  Object.defineProperty(Vue.prototype, '$console', {
    get () {
      return $console || ($console = loggerCreator.call(this))
    }
  })
}
