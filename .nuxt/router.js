import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _c288462c = () => interopDefault(import('..\\pages\\auth\\index.vue' /* webpackChunkName: "pages/auth/index" */))
const _579285b0 = () => interopDefault(import('..\\pages\\finance\\index.vue' /* webpackChunkName: "pages/finance/index" */))
const _862cf8ca = () => interopDefault(import('..\\pages\\offers\\index.vue' /* webpackChunkName: "pages/offers/index" */))
const _df5551ec = () => interopDefault(import('..\\pages\\passwords\\index.vue' /* webpackChunkName: "pages/passwords/index" */))
const _05b1da26 = () => interopDefault(import('..\\pages\\customer\\bgp.vue' /* webpackChunkName: "pages/customer/bgp" */))
const _018637f2 = () => interopDefault(import('..\\pages\\customer\\fair.vue' /* webpackChunkName: "pages/customer/fair" */))
const _54444b0e = () => interopDefault(import('..\\pages\\customer\\mekmar.vue' /* webpackChunkName: "pages/customer/mekmar" */))
const _886b3504 = () => interopDefault(import('..\\pages\\customer\\offer.vue' /* webpackChunkName: "pages/customer/offer" */))
const _ea2560a4 = () => interopDefault(import('..\\pages\\customer\\selection.vue' /* webpackChunkName: "pages/customer/selection" */))
const _4eba058c = () => interopDefault(import('..\\pages\\operation\\cards.vue' /* webpackChunkName: "pages/operation/cards" */))
const _61f889ac = () => interopDefault(import('..\\pages\\operation\\container.vue' /* webpackChunkName: "pages/operation/container" */))
const _595653c8 = () => interopDefault(import('..\\pages\\operation\\containerlist.vue' /* webpackChunkName: "pages/operation/containerlist" */))
const _93c70a50 = () => interopDefault(import('..\\pages\\operation\\follow.vue' /* webpackChunkName: "pages/operation/follow" */))
const _4bea8c81 = () => interopDefault(import('..\\pages\\operation\\shipment.vue' /* webpackChunkName: "pages/operation/shipment" */))
const _346ca89a = () => interopDefault(import('..\\pages\\operation\\supplier.vue' /* webpackChunkName: "pages/operation/supplier" */))
const _029fd1d2 = () => interopDefault(import('..\\pages\\operation\\transport.vue' /* webpackChunkName: "pages/operation/transport" */))
const _c3925320 = () => interopDefault(import('..\\pages\\operation\\transportlist.vue' /* webpackChunkName: "pages/operation/transportlist" */))
const _73d2d671 = () => interopDefault(import('..\\pages\\operation\\unfollow.vue' /* webpackChunkName: "pages/operation/unfollow" */))
const _4cac3028 = () => interopDefault(import('..\\pages\\operation\\uploadform.vue' /* webpackChunkName: "pages/operation/uploadform" */))
const _de6face4 = () => interopDefault(import('..\\pages\\orders\\production.vue' /* webpackChunkName: "pages/orders/production" */))
const _32433664 = () => interopDefault(import('..\\pages\\orders\\shipped.vue' /* webpackChunkName: "pages/orders/shipped" */))
const _6da3de70 = () => interopDefault(import('..\\pages\\orders\\waiting.vue' /* webpackChunkName: "pages/orders/waiting" */))
const _6b0aa85d = () => interopDefault(import('..\\pages\\panel\\project\\index.vue' /* webpackChunkName: "pages/panel/project/index" */))
const _5e995db3 = () => interopDefault(import('..\\pages\\panel\\usa\\index.vue' /* webpackChunkName: "pages/panel/usa/index" */))
const _3e87b5e4 = () => interopDefault(import('..\\pages\\panel\\users\\index.vue' /* webpackChunkName: "pages/panel/users/index" */))
const _13dc792f = () => interopDefault(import('..\\pages\\sales\\bgp.vue' /* webpackChunkName: "pages/sales/bgp" */))
const _8cd5b7f6 = () => interopDefault(import('..\\pages\\sales\\consider.vue' /* webpackChunkName: "pages/sales/consider" */))
const _45579a06 = () => interopDefault(import('..\\pages\\sales\\follow.vue' /* webpackChunkName: "pages/sales/follow" */))
const _1c1e666a = () => interopDefault(import('..\\pages\\sales\\maintodo.vue' /* webpackChunkName: "pages/sales/maintodo" */))
const _bc9ff22e = () => interopDefault(import('..\\pages\\sales\\representative.vue' /* webpackChunkName: "pages/sales/representative" */))
const _4bb2ca12 = () => interopDefault(import('..\\pages\\sales\\todo.vue' /* webpackChunkName: "pages/sales/todo" */))
const _2f0edda0 = () => interopDefault(import('..\\pages\\sample\\finance.vue' /* webpackChunkName: "pages/sample/finance" */))
const _222a7078 = () => interopDefault(import('..\\pages\\sample\\sample.vue' /* webpackChunkName: "pages/sample/sample" */))
const _d68495a4 = () => interopDefault(import('..\\pages\\selection\\input.vue' /* webpackChunkName: "pages/selection/input" */))
const _0bbe3e66 = () => interopDefault(import('..\\pages\\selection\\size.vue' /* webpackChunkName: "pages/selection/size" */))
const _fa466018 = () => interopDefault(import('..\\pages\\mekmer\\products\\production.vue' /* webpackChunkName: "pages/mekmer/products/production" */))
const _41d3c828 = () => interopDefault(import('..\\pages\\mekmer\\products\\shipped.vue' /* webpackChunkName: "pages/mekmer/products/shipped" */))
const _4c77f7a3 = () => interopDefault(import('..\\pages\\panel\\products\\notpublished.vue' /* webpackChunkName: "pages/panel/products/notpublished" */))
const _2f013d14 = () => interopDefault(import('..\\pages\\panel\\products\\published.vue' /* webpackChunkName: "pages/panel/products/published" */))
const _345a0719 = () => interopDefault(import('..\\pages\\panel\\products\\queue.vue' /* webpackChunkName: "pages/panel/products/queue" */))
const _f2598506 = () => interopDefault(import('..\\pages\\reports\\mekmar\\ayo.vue' /* webpackChunkName: "pages/reports/mekmar/ayo" */))
const _00246c27 = () => interopDefault(import('..\\pages\\reports\\mekmar\\forwarding.vue' /* webpackChunkName: "pages/reports/mekmar/forwarding" */))
const _88a610d0 = () => interopDefault(import('..\\pages\\reports\\mekmar\\gu.vue' /* webpackChunkName: "pages/reports/mekmar/gu" */))
const _3514d202 = () => interopDefault(import('..\\pages\\reports\\mekmar\\loading.vue' /* webpackChunkName: "pages/reports/mekmar/loading" */))
const _7545bf70 = () => interopDefault(import('..\\pages\\reports\\mekmar\\mk.vue' /* webpackChunkName: "pages/reports/mekmar/mk" */))
const _08655928 = () => interopDefault(import('..\\pages\\reports\\mekmar\\summary.vue' /* webpackChunkName: "pages/reports/mekmar/summary" */))
const _35d2efbd = () => interopDefault(import('..\\pages\\reports\\mekmer\\atlanta.vue' /* webpackChunkName: "pages/reports/mekmer/atlanta" */))
const _03b6ed79 = () => interopDefault(import('..\\pages\\reports\\mekmer\\mine.vue' /* webpackChunkName: "pages/reports/mekmer/mine" */))
const _7275545f = () => interopDefault(import('..\\pages\\reports\\mekmer\\production.vue' /* webpackChunkName: "pages/reports/mekmer/production" */))
const _cfb48f40 = () => interopDefault(import('..\\pages\\reports\\mekmer\\stock.vue' /* webpackChunkName: "pages/reports/mekmer/stock" */))
const _33c5e5dc = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _c288462c,
    name: "auth"
  }, {
    path: "/finance",
    component: _579285b0,
    name: "finance"
  }, {
    path: "/offers",
    component: _862cf8ca,
    name: "offers"
  }, {
    path: "/passwords",
    component: _df5551ec,
    name: "passwords"
  }, {
    path: "/customer/bgp",
    component: _05b1da26,
    name: "customer-bgp"
  }, {
    path: "/customer/fair",
    component: _018637f2,
    name: "customer-fair"
  }, {
    path: "/customer/mekmar",
    component: _54444b0e,
    name: "customer-mekmar"
  }, {
    path: "/customer/offer",
    component: _886b3504,
    name: "customer-offer"
  }, {
    path: "/customer/selection",
    component: _ea2560a4,
    name: "customer-selection"
  }, {
    path: "/operation/cards",
    component: _4eba058c,
    name: "operation-cards"
  }, {
    path: "/operation/container",
    component: _61f889ac,
    name: "operation-container"
  }, {
    path: "/operation/containerlist",
    component: _595653c8,
    name: "operation-containerlist"
  }, {
    path: "/operation/follow",
    component: _93c70a50,
    name: "operation-follow"
  }, {
    path: "/operation/shipment",
    component: _4bea8c81,
    name: "operation-shipment"
  }, {
    path: "/operation/supplier",
    component: _346ca89a,
    name: "operation-supplier"
  }, {
    path: "/operation/transport",
    component: _029fd1d2,
    name: "operation-transport"
  }, {
    path: "/operation/transportlist",
    component: _c3925320,
    name: "operation-transportlist"
  }, {
    path: "/operation/unfollow",
    component: _73d2d671,
    name: "operation-unfollow"
  }, {
    path: "/operation/uploadform",
    component: _4cac3028,
    name: "operation-uploadform"
  }, {
    path: "/orders/production",
    component: _de6face4,
    name: "orders-production"
  }, {
    path: "/orders/shipped",
    component: _32433664,
    name: "orders-shipped"
  }, {
    path: "/orders/waiting",
    component: _6da3de70,
    name: "orders-waiting"
  }, {
    path: "/panel/project",
    component: _6b0aa85d,
    name: "panel-project"
  }, {
    path: "/panel/usa",
    component: _5e995db3,
    name: "panel-usa"
  }, {
    path: "/panel/users",
    component: _3e87b5e4,
    name: "panel-users"
  }, {
    path: "/sales/bgp",
    component: _13dc792f,
    name: "sales-bgp"
  }, {
    path: "/sales/consider",
    component: _8cd5b7f6,
    name: "sales-consider"
  }, {
    path: "/sales/follow",
    component: _45579a06,
    name: "sales-follow"
  }, {
    path: "/sales/maintodo",
    component: _1c1e666a,
    name: "sales-maintodo"
  }, {
    path: "/sales/representative",
    component: _bc9ff22e,
    name: "sales-representative"
  }, {
    path: "/sales/todo",
    component: _4bb2ca12,
    name: "sales-todo"
  }, {
    path: "/sample/finance",
    component: _2f0edda0,
    name: "sample-finance"
  }, {
    path: "/sample/sample",
    component: _222a7078,
    name: "sample-sample"
  }, {
    path: "/selection/input",
    component: _d68495a4,
    name: "selection-input"
  }, {
    path: "/selection/size",
    component: _0bbe3e66,
    name: "selection-size"
  }, {
    path: "/mekmer/products/production",
    component: _fa466018,
    name: "mekmer-products-production"
  }, {
    path: "/mekmer/products/shipped",
    component: _41d3c828,
    name: "mekmer-products-shipped"
  }, {
    path: "/panel/products/notpublished",
    component: _4c77f7a3,
    name: "panel-products-notpublished"
  }, {
    path: "/panel/products/published",
    component: _2f013d14,
    name: "panel-products-published"
  }, {
    path: "/panel/products/queue",
    component: _345a0719,
    name: "panel-products-queue"
  }, {
    path: "/reports/mekmar/ayo",
    component: _f2598506,
    name: "reports-mekmar-ayo"
  }, {
    path: "/reports/mekmar/forwarding",
    component: _00246c27,
    name: "reports-mekmar-forwarding"
  }, {
    path: "/reports/mekmar/gu",
    component: _88a610d0,
    name: "reports-mekmar-gu"
  }, {
    path: "/reports/mekmar/loading",
    component: _3514d202,
    name: "reports-mekmar-loading"
  }, {
    path: "/reports/mekmar/mk",
    component: _7545bf70,
    name: "reports-mekmar-mk"
  }, {
    path: "/reports/mekmar/summary",
    component: _08655928,
    name: "reports-mekmar-summary"
  }, {
    path: "/reports/mekmer/atlanta",
    component: _35d2efbd,
    name: "reports-mekmer-atlanta"
  }, {
    path: "/reports/mekmer/mine",
    component: _03b6ed79,
    name: "reports-mekmer-mine"
  }, {
    path: "/reports/mekmer/production",
    component: _7275545f,
    name: "reports-mekmer-production"
  }, {
    path: "/reports/mekmer/stock",
    component: _cfb48f40,
    name: "reports-mekmer-stock"
  }, {
    path: "/",
    component: _33c5e5dc,
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
