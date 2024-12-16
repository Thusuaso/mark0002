import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']

let store = {};

(function updateModules () {
  store = normalizeRoot(require('..\\store\\index.js'), 'store/index.js')

  // If store is an exported method = classic mode (deprecated)

  if (typeof store === 'function') {
    return console.warn('Classic mode for store/ is deprecated and will be removed in Nuxt 3.')
  }

  // Enforce store modules
  store.modules = store.modules || {}

  resolveStoreModules(require('..\\store\\modules\\accounts.js'), 'modules/accounts.js')
  resolveStoreModules(require('..\\store\\modules\\auth.js'), 'modules/auth.js')
  resolveStoreModules(require('..\\store\\modules\\authority.js'), 'modules/authority.js')
  resolveStoreModules(require('..\\store\\modules\\bgp.js'), 'modules/bgp.js')
  resolveStoreModules(require('..\\store\\modules\\cards.js'), 'modules/cards.js')
  resolveStoreModules(require('..\\store\\modules\\container.js'), 'modules/container.js')
  resolveStoreModules(require('..\\store\\modules\\customer.js'), 'modules/customer.js')
  resolveStoreModules(require('..\\store\\modules\\finance.js'), 'modules/finance.js')
  resolveStoreModules(require('..\\store\\modules\\home.js'), 'modules/home.js')
  resolveStoreModules(require('..\\store\\modules\\importantLink.js'), 'modules/importantLink.js')
  resolveStoreModules(require('..\\store\\modules\\loading.js'), 'modules/loading.js')
  resolveStoreModules(require('..\\store\\modules\\local.js'), 'modules/local.js')
  resolveStoreModules(require('..\\store\\modules\\logs.js'), 'modules/logs.js')
  resolveStoreModules(require('..\\store\\modules\\models.js'), 'modules/models.js')
  resolveStoreModules(require('..\\store\\modules\\offer.js'), 'modules/offer.js')
  resolveStoreModules(require('..\\store\\modules\\order.js'), 'modules/order.js')
  resolveStoreModules(require('..\\store\\modules\\panel.js'), 'modules/panel.js')
  resolveStoreModules(require('..\\store\\modules\\reports.js'), 'modules/reports.js')
  resolveStoreModules(require('..\\store\\modules\\representative.js'), 'modules/representative.js')
  resolveStoreModules(require('..\\store\\modules\\sales.js'), 'modules/sales.js')
  resolveStoreModules(require('..\\store\\modules\\sample.js'), 'modules/sample.js')
  resolveStoreModules(require('..\\store\\modules\\selection.js'), 'modules/selection.js')
  resolveStoreModules(require('..\\store\\modules\\shared.js'), 'modules/shared.js')
  resolveStoreModules(require('..\\store\\modules\\shipment.js'), 'modules/shipment.js')
  resolveStoreModules(require('..\\store\\modules\\supplier.js'), 'modules/supplier.js')
  resolveStoreModules(require('..\\store\\modules\\todo.js'), 'modules/todo.js')
  resolveStoreModules(require('..\\store\\modules\\transport.js'), 'modules/transport.js')
  resolveStoreModules(require('..\\store\\modules\\upload.js'), 'modules/upload.js')

  // If the environment supports hot reloading...

  if (process.client && module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept([
      '..\\store\\index.js',
      '..\\store\\modules\\accounts.js',
      '..\\store\\modules\\auth.js',
      '..\\store\\modules\\authority.js',
      '..\\store\\modules\\bgp.js',
      '..\\store\\modules\\cards.js',
      '..\\store\\modules\\container.js',
      '..\\store\\modules\\customer.js',
      '..\\store\\modules\\finance.js',
      '..\\store\\modules\\home.js',
      '..\\store\\modules\\importantLink.js',
      '..\\store\\modules\\loading.js',
      '..\\store\\modules\\local.js',
      '..\\store\\modules\\logs.js',
      '..\\store\\modules\\models.js',
      '..\\store\\modules\\offer.js',
      '..\\store\\modules\\order.js',
      '..\\store\\modules\\panel.js',
      '..\\store\\modules\\reports.js',
      '..\\store\\modules\\representative.js',
      '..\\store\\modules\\sales.js',
      '..\\store\\modules\\sample.js',
      '..\\store\\modules\\selection.js',
      '..\\store\\modules\\shared.js',
      '..\\store\\modules\\shipment.js',
      '..\\store\\modules\\supplier.js',
      '..\\store\\modules\\todo.js',
      '..\\store\\modules\\transport.js',
      '..\\store\\modules\\upload.js',
    ], () => {
      // Update `root.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      window.$nuxt.$store.hotUpdate(store)
    })
  }
})()

// createStore
export const createStore = store instanceof Function ? store : () => {
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}

function normalizeRoot (moduleData, filePath) {
  moduleData = moduleData.default || moduleData

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`)
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData)
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule (moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn(`'state' should be a method that returns an object in ${filePath}`)

    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function resolveStoreModules (moduleData, filename) {
  moduleData = moduleData.default || moduleData
  // Remove store src + extension (./foo/index.js -> foo/index)
  const namespace = filename.replace(/\.(js|mjs)$/, '')
  const namespaces = namespace.split('/')
  let moduleName = namespaces[namespaces.length - 1]
  const filePath = `store/${filename}`

  moduleData = moduleName === 'state'
    ? normalizeState(moduleData, filePath)
    : normalizeModule(moduleData, filePath)

  // If src is a known Vuex property
  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName
    const propertyStoreModule = getStoreModule(store, namespaces, { isProperty: true })

    // Replace state since it's a function
    mergeProperty(propertyStoreModule, moduleData, property)
    return
  }

  // If file is foo/index.js, it should be saved as foo
  const isIndexModule = (moduleName === 'index')
  if (isIndexModule) {
    namespaces.pop()
    moduleName = namespaces[namespaces.length - 1]
  }

  const storeModule = getStoreModule(store, namespaces)

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property)
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced
  }
}

function normalizeState (moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    console.warn(`${filePath} should export a method that returns an object`)
    const state = Object.assign({}, moduleData)
    return () => state
  }
  return normalizeModule(moduleData, filePath)
}

function getStoreModule (storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty (storeModule, moduleData, property) {
  if (!moduleData) {
    return
  }

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}
