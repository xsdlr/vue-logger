# vue-logger
configurable logger for component of Vue2

# use
```javascript
import Vue from 'vue'
import logger from 'vue-logger'

const options = {
  // set logger level, default is 'debug'
  // level order: 'debug' < 'info' < 'warn' < 'error' < 'off'
  level: 'debug'
}
vue.use(logger, options)
```
