import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4193e1b2 = () => interopDefault(import('..\\pages\\auth\\index.vue' /* webpackChunkName: "pages/auth/index" */))
const _f8bc6a84 = () => interopDefault(import('..\\pages\\container.vue' /* webpackChunkName: "pages/container" */))
const _205305cb = () => interopDefault(import('..\\pages\\finance\\index.vue' /* webpackChunkName: "pages/finance/index" */))
const _70bfcad0 = () => interopDefault(import('..\\pages\\offers\\index.vue' /* webpackChunkName: "pages/offers/index" */))
const _468202ed = () => interopDefault(import('..\\pages\\passwords\\index.vue' /* webpackChunkName: "pages/passwords/index" */))
const _07dda9ea = () => interopDefault(import('..\\pages\\customer\\bgp.vue' /* webpackChunkName: "pages/customer/bgp" */))
const _4da28095 = () => interopDefault(import('..\\pages\\customer\\fair.vue' /* webpackChunkName: "pages/customer/fair" */))
const _e7eaf348 = () => interopDefault(import('..\\pages\\customer\\mekmar.vue' /* webpackChunkName: "pages/customer/mekmar" */))
const _19919d8a = () => interopDefault(import('..\\pages\\customer\\offer.vue' /* webpackChunkName: "pages/customer/offer" */))
const _6363f4eb = () => interopDefault(import('..\\pages\\customer\\selection.vue' /* webpackChunkName: "pages/customer/selection" */))
const _04e6b16f = () => interopDefault(import('..\\pages\\operation\\cards.vue' /* webpackChunkName: "pages/operation/cards" */))
const _0561bd8d = () => interopDefault(import('..\\pages\\operation\\container.vue' /* webpackChunkName: "pages/operation/container" */))
const _52566cab = () => interopDefault(import('..\\pages\\operation\\containerlist.vue' /* webpackChunkName: "pages/operation/containerlist" */))
const _74f56956 = () => interopDefault(import('..\\pages\\operation\\follow.vue' /* webpackChunkName: "pages/operation/follow" */))
const _246131be = () => interopDefault(import('..\\pages\\operation\\shipment.vue' /* webpackChunkName: "pages/operation/shipment" */))
const _837f5e20 = () => interopDefault(import('..\\pages\\operation\\supplier.vue' /* webpackChunkName: "pages/operation/supplier" */))
const _38fdd435 = () => interopDefault(import('..\\pages\\operation\\transport.vue' /* webpackChunkName: "pages/operation/transport" */))
const _d192215a = () => interopDefault(import('..\\pages\\operation\\transportlist.vue' /* webpackChunkName: "pages/operation/transportlist" */))
const _4c497bae = () => interopDefault(import('..\\pages\\operation\\unfollow.vue' /* webpackChunkName: "pages/operation/unfollow" */))
const _6f0c31e9 = () => interopDefault(import('..\\pages\\operation\\uploadform.vue' /* webpackChunkName: "pages/operation/uploadform" */))
const _6e7968b1 = () => interopDefault(import('..\\pages\\orders\\production.vue' /* webpackChunkName: "pages/orders/production" */))
const _1e4b308b = () => interopDefault(import('..\\pages\\orders\\shipped.vue' /* webpackChunkName: "pages/orders/shipped" */))
const _009adc85 = () => interopDefault(import('..\\pages\\orders\\waiting.vue' /* webpackChunkName: "pages/orders/waiting" */))
const _006cf25a = () => interopDefault(import('..\\pages\\panel\\project\\index.vue' /* webpackChunkName: "pages/panel/project/index" */))
const _6e022e30 = () => interopDefault(import('..\\pages\\panel\\usa\\index.vue' /* webpackChunkName: "pages/panel/usa/index" */))
const _8d9a6b6a = () => interopDefault(import('..\\pages\\panel\\users\\index.vue' /* webpackChunkName: "pages/panel/users/index" */))
const _3736e95c = () => interopDefault(import('..\\pages\\sales\\bgp.vue' /* webpackChunkName: "pages/sales/bgp" */))
const _1dfc207c = () => interopDefault(import('..\\pages\\sales\\consider.vue' /* webpackChunkName: "pages/sales/consider" */))
const _2fea6c0c = () => interopDefault(import('..\\pages\\sales\\follow.vue' /* webpackChunkName: "pages/sales/follow" */))
const _649b5e56 = () => interopDefault(import('..\\pages\\sales\\important-links.vue' /* webpackChunkName: "pages/sales/important-links" */))
const _295d9888 = () => interopDefault(import('..\\pages\\sales\\maintodo.vue' /* webpackChunkName: "pages/sales/maintodo" */))
const _371250e6 = () => interopDefault(import('..\\pages\\sales\\representative.vue' /* webpackChunkName: "pages/sales/representative" */))
const _e7a60762 = () => interopDefault(import('..\\pages\\sales\\todo.vue' /* webpackChunkName: "pages/sales/todo" */))
const _1fe55ced = () => interopDefault(import('..\\pages\\sample\\finance.vue' /* webpackChunkName: "pages/sample/finance" */))
const _3b071067 = () => interopDefault(import('..\\pages\\sample\\sample.vue' /* webpackChunkName: "pages/sample/sample" */))
const _4aea6111 = () => interopDefault(import('..\\pages\\selection\\input.vue' /* webpackChunkName: "pages/selection/input" */))
const _318dac8a = () => interopDefault(import('..\\pages\\selection\\size.vue' /* webpackChunkName: "pages/selection/size" */))
const _5a8fbf57 = () => interopDefault(import('..\\pages\\mekmer\\products\\production.vue' /* webpackChunkName: "pages/mekmer/products/production" */))
const _68d6cba5 = () => interopDefault(import('..\\pages\\mekmer\\products\\shipped.vue' /* webpackChunkName: "pages/mekmer/products/shipped" */))
const _6b22f4a0 = () => interopDefault(import('..\\pages\\panel\\products\\notpublished.vue' /* webpackChunkName: "pages/panel/products/notpublished" */))
const _bc4664ce = () => interopDefault(import('..\\pages\\panel\\products\\published.vue' /* webpackChunkName: "pages/panel/products/published" */))
const _4b40fcbc = () => interopDefault(import('..\\pages\\panel\\products\\queue.vue' /* webpackChunkName: "pages/panel/products/queue" */))
const _859d8040 = () => interopDefault(import('..\\pages\\reports\\mekmar\\ayo.vue' /* webpackChunkName: "pages/reports/mekmar/ayo" */))
const _cbe5d3c4 = () => interopDefault(import('..\\pages\\reports\\mekmar\\continent-order.vue' /* webpackChunkName: "pages/reports/mekmar/continent-order" */))
const _2f869dc0 = () => interopDefault(import('..\\pages\\reports\\mekmar\\country-order.vue' /* webpackChunkName: "pages/reports/mekmar/country-order" */))
const _7d32f46c = () => interopDefault(import('..\\pages\\reports\\mekmar\\filter-finance.vue' /* webpackChunkName: "pages/reports/mekmar/filter-finance" */))
const _72748464 = () => interopDefault(import('..\\pages\\reports\\mekmar\\forwarding.vue' /* webpackChunkName: "pages/reports/mekmar/forwarding" */))
const _d7b8c656 = () => interopDefault(import('..\\pages\\reports\\mekmar\\gu.vue' /* webpackChunkName: "pages/reports/mekmar/gu" */))
const _2e14eae5 = () => interopDefault(import('..\\pages\\reports\\mekmar\\loading.vue' /* webpackChunkName: "pages/reports/mekmar/loading" */))
const _c45874f6 = () => interopDefault(import('..\\pages\\reports\\mekmar\\mk.vue' /* webpackChunkName: "pages/reports/mekmar/mk" */))
const _16652762 = () => interopDefault(import('..\\pages\\reports\\mekmar\\summary.vue' /* webpackChunkName: "pages/reports/mekmar/summary" */))
const _10a70717 = () => interopDefault(import('..\\pages\\reports\\mekmar\\supplier-cost.vue' /* webpackChunkName: "pages/reports/mekmar/supplier-cost" */))
const _2ed308a0 = () => interopDefault(import('..\\pages\\reports\\mekmer\\atlanta.vue' /* webpackChunkName: "pages/reports/mekmer/atlanta" */))
const _53711837 = () => interopDefault(import('..\\pages\\reports\\mekmer\\by-buying-production.vue' /* webpackChunkName: "pages/reports/mekmer/by-buying-production" */))
const _b83cf8f2 = () => interopDefault(import('..\\pages\\reports\\mekmer\\finance.vue' /* webpackChunkName: "pages/reports/mekmer/finance" */))
const _cdcd9114 = () => interopDefault(import('..\\pages\\reports\\mekmer\\mine.vue' /* webpackChunkName: "pages/reports/mekmer/mine" */))
const _e00f4bfe = () => interopDefault(import('..\\pages\\reports\\mekmer\\onhold.vue' /* webpackChunkName: "pages/reports/mekmer/onhold" */))
const _367526c8 = () => interopDefault(import('..\\pages\\reports\\mekmer\\production.vue' /* webpackChunkName: "pages/reports/mekmer/production" */))
const _90d86ff2 = () => interopDefault(import('..\\pages\\reports\\mekmer\\productions.vue' /* webpackChunkName: "pages/reports/mekmer/productions" */))
const _458ea700 = () => interopDefault(import('..\\pages\\reports\\mekmer\\shipped.vue' /* webpackChunkName: "pages/reports/mekmer/shipped" */))
const _a1e6a3fa = () => interopDefault(import('..\\pages\\reports\\mekmer\\stock.vue' /* webpackChunkName: "pages/reports/mekmer/stock" */))
const _98744e84 = () => interopDefault(import('..\\pages\\reports\\mekmer\\strips.vue' /* webpackChunkName: "pages/reports/mekmer/strips" */))
const _51c4f10f = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/auth",
    component: _4193e1b2,
    name: "auth"
  }, {
    path: "/container",
    component: _f8bc6a84,
    name: "container"
  }, {
    path: "/finance",
    component: _205305cb,
    name: "finance"
  }, {
    path: "/offers",
    component: _70bfcad0,
    name: "offers"
  }, {
    path: "/passwords",
    component: _468202ed,
    name: "passwords"
  }, {
    path: "/customer/bgp",
    component: _07dda9ea,
    name: "customer-bgp"
  }, {
    path: "/customer/fair",
    component: _4da28095,
    name: "customer-fair"
  }, {
    path: "/customer/mekmar",
    component: _e7eaf348,
    name: "customer-mekmar"
  }, {
    path: "/customer/offer",
    component: _19919d8a,
    name: "customer-offer"
  }, {
    path: "/customer/selection",
    component: _6363f4eb,
    name: "customer-selection"
  }, {
    path: "/operation/cards",
    component: _04e6b16f,
    name: "operation-cards"
  }, {
    path: "/operation/container",
    component: _0561bd8d,
    name: "operation-container"
  }, {
    path: "/operation/containerlist",
    component: _52566cab,
    name: "operation-containerlist"
  }, {
    path: "/operation/follow",
    component: _74f56956,
    name: "operation-follow"
  }, {
    path: "/operation/shipment",
    component: _246131be,
    name: "operation-shipment"
  }, {
    path: "/operation/supplier",
    component: _837f5e20,
    name: "operation-supplier"
  }, {
    path: "/operation/transport",
    component: _38fdd435,
    name: "operation-transport"
  }, {
    path: "/operation/transportlist",
    component: _d192215a,
    name: "operation-transportlist"
  }, {
    path: "/operation/unfollow",
    component: _4c497bae,
    name: "operation-unfollow"
  }, {
    path: "/operation/uploadform",
    component: _6f0c31e9,
    name: "operation-uploadform"
  }, {
    path: "/orders/production",
    component: _6e7968b1,
    name: "orders-production"
  }, {
    path: "/orders/shipped",
    component: _1e4b308b,
    name: "orders-shipped"
  }, {
    path: "/orders/waiting",
    component: _009adc85,
    name: "orders-waiting"
  }, {
    path: "/panel/project",
    component: _006cf25a,
    name: "panel-project"
  }, {
    path: "/panel/usa",
    component: _6e022e30,
    name: "panel-usa"
  }, {
    path: "/panel/users",
    component: _8d9a6b6a,
    name: "panel-users"
  }, {
    path: "/sales/bgp",
    component: _3736e95c,
    name: "sales-bgp"
  }, {
    path: "/sales/consider",
    component: _1dfc207c,
    name: "sales-consider"
  }, {
    path: "/sales/follow",
    component: _2fea6c0c,
    name: "sales-follow"
  }, {
    path: "/sales/important-links",
    component: _649b5e56,
    name: "sales-important-links"
  }, {
    path: "/sales/maintodo",
    component: _295d9888,
    name: "sales-maintodo"
  }, {
    path: "/sales/representative",
    component: _371250e6,
    name: "sales-representative"
  }, {
    path: "/sales/todo",
    component: _e7a60762,
    name: "sales-todo"
  }, {
    path: "/sample/finance",
    component: _1fe55ced,
    name: "sample-finance"
  }, {
    path: "/sample/sample",
    component: _3b071067,
    name: "sample-sample"
  }, {
    path: "/selection/input",
    component: _4aea6111,
    name: "selection-input"
  }, {
    path: "/selection/size",
    component: _318dac8a,
    name: "selection-size"
  }, {
    path: "/mekmer/products/production",
    component: _5a8fbf57,
    name: "mekmer-products-production"
  }, {
    path: "/mekmer/products/shipped",
    component: _68d6cba5,
    name: "mekmer-products-shipped"
  }, {
    path: "/panel/products/notpublished",
    component: _6b22f4a0,
    name: "panel-products-notpublished"
  }, {
    path: "/panel/products/published",
    component: _bc4664ce,
    name: "panel-products-published"
  }, {
    path: "/panel/products/queue",
    component: _4b40fcbc,
    name: "panel-products-queue"
  }, {
    path: "/reports/mekmar/ayo",
    component: _859d8040,
    name: "reports-mekmar-ayo"
  }, {
    path: "/reports/mekmar/continent-order",
    component: _cbe5d3c4,
    name: "reports-mekmar-continent-order"
  }, {
    path: "/reports/mekmar/country-order",
    component: _2f869dc0,
    name: "reports-mekmar-country-order"
  }, {
    path: "/reports/mekmar/filter-finance",
    component: _7d32f46c,
    name: "reports-mekmar-filter-finance"
  }, {
    path: "/reports/mekmar/forwarding",
    component: _72748464,
    name: "reports-mekmar-forwarding"
  }, {
    path: "/reports/mekmar/gu",
    component: _d7b8c656,
    name: "reports-mekmar-gu"
  }, {
    path: "/reports/mekmar/loading",
    component: _2e14eae5,
    name: "reports-mekmar-loading"
  }, {
    path: "/reports/mekmar/mk",
    component: _c45874f6,
    name: "reports-mekmar-mk"
  }, {
    path: "/reports/mekmar/summary",
    component: _16652762,
    name: "reports-mekmar-summary"
  }, {
    path: "/reports/mekmar/supplier-cost",
    component: _10a70717,
    name: "reports-mekmar-supplier-cost"
  }, {
    path: "/reports/mekmer/atlanta",
    component: _2ed308a0,
    name: "reports-mekmer-atlanta"
  }, {
    path: "/reports/mekmer/by-buying-production",
    component: _53711837,
    name: "reports-mekmer-by-buying-production"
  }, {
    path: "/reports/mekmer/finance",
    component: _b83cf8f2,
    name: "reports-mekmer-finance"
  }, {
    path: "/reports/mekmer/mine",
    component: _cdcd9114,
    name: "reports-mekmer-mine"
  }, {
    path: "/reports/mekmer/onhold",
    component: _e00f4bfe,
    name: "reports-mekmer-onhold"
  }, {
    path: "/reports/mekmer/production",
    component: _367526c8,
    name: "reports-mekmer-production"
  }, {
    path: "/reports/mekmer/productions",
    component: _90d86ff2,
    name: "reports-mekmer-productions"
  }, {
    path: "/reports/mekmer/shipped",
    component: _458ea700,
    name: "reports-mekmer-shipped"
  }, {
    path: "/reports/mekmer/stock",
    component: _a1e6a3fa,
    name: "reports-mekmer-stock"
  }, {
    path: "/reports/mekmer/strips",
    component: _98744e84,
    name: "reports-mekmer-strips"
  }, {
    path: "/",
    component: _51c4f10f,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
