import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2e17fb5a = () => interopDefault(import('..\\pages\\auth\\index.vue' /* webpackChunkName: "pages/auth/index" */))
const _5fff99c2 = () => interopDefault(import('..\\pages\\finance\\index.vue' /* webpackChunkName: "pages/finance/index" */))
const _59adf2c4 = () => interopDefault(import('..\\pages\\offers\\index.vue' /* webpackChunkName: "pages/offers/index" */))
const _80cda97e = () => interopDefault(import('..\\pages\\passwords\\index.vue' /* webpackChunkName: "pages/passwords/index" */))
const _cc28fbd4 = () => interopDefault(import('..\\pages\\customer\\bgp.vue' /* webpackChunkName: "pages/customer/bgp" */))
const _0560a42e = () => interopDefault(import('..\\pages\\customer\\fair.vue' /* webpackChunkName: "pages/customer/fair" */))
const _0521aeb0 = () => interopDefault(import('..\\pages\\customer\\mekmar.vue' /* webpackChunkName: "pages/customer/mekmar" */))
const _392fae67 = () => interopDefault(import('..\\pages\\customer\\offer.vue' /* webpackChunkName: "pages/customer/offer" */))
const _5d7c07d2 = () => interopDefault(import('..\\pages\\customer\\selection.vue' /* webpackChunkName: "pages/customer/selection" */))
const _7dfdd9c3 = () => interopDefault(import('..\\pages\\operation\\cards.vue' /* webpackChunkName: "pages/operation/cards" */))
const _53449be1 = () => interopDefault(import('..\\pages\\operation\\container.vue' /* webpackChunkName: "pages/operation/container" */))
const _1c3a00ff = () => interopDefault(import('..\\pages\\operation\\containerlist.vue' /* webpackChunkName: "pages/operation/containerlist" */))
const _6f532d81 = () => interopDefault(import('..\\pages\\operation\\follow.vue' /* webpackChunkName: "pages/operation/follow" */))
const _db818e2c = () => interopDefault(import('..\\pages\\operation\\shipment.vue' /* webpackChunkName: "pages/operation/shipment" */))
const _2c1e581c = () => interopDefault(import('..\\pages\\operation\\supplier.vue' /* webpackChunkName: "pages/operation/supplier" */))
const _f23e9aee = () => interopDefault(import('..\\pages\\operation\\transport.vue' /* webpackChunkName: "pages/operation/transport" */))
const _611a83a7 = () => interopDefault(import('..\\pages\\operation\\transportlist.vue' /* webpackChunkName: "pages/operation/transportlist" */))
const _8bb0fa4c = () => interopDefault(import('..\\pages\\operation\\unfollow.vue' /* webpackChunkName: "pages/operation/unfollow" */))
const _44f5c3d6 = () => interopDefault(import('..\\pages\\operation\\uploadform.vue' /* webpackChunkName: "pages/operation/uploadform" */))
const _033067f6 = () => interopDefault(import('..\\pages\\orders\\production.vue' /* webpackChunkName: "pages/orders/production" */))
const _6443adb7 = () => interopDefault(import('..\\pages\\orders\\shipped.vue' /* webpackChunkName: "pages/orders/shipped" */))
const _469359b1 = () => interopDefault(import('..\\pages\\orders\\waiting.vue' /* webpackChunkName: "pages/orders/waiting" */))
const _6ee5de86 = () => interopDefault(import('..\\pages\\panel\\project\\index.vue' /* webpackChunkName: "pages/panel/project/index" */))
const _17d0105c = () => interopDefault(import('..\\pages\\panel\\usa\\index.vue' /* webpackChunkName: "pages/panel/usa/index" */))
const _2710d177 = () => interopDefault(import('..\\pages\\panel\\users\\index.vue' /* webpackChunkName: "pages/panel/users/index" */))
const _26c582a6 = () => interopDefault(import('..\\pages\\sales\\bgp.vue' /* webpackChunkName: "pages/sales/bgp" */))
const _36fa6cee = () => interopDefault(import('..\\pages\\sales\\consider.vue' /* webpackChunkName: "pages/sales/consider" */))
const _7a18a226 = () => interopDefault(import('..\\pages\\sales\\follow.vue' /* webpackChunkName: "pages/sales/follow" */))
const _2e56ea29 = () => interopDefault(import('..\\pages\\sales\\important-links.vue' /* webpackChunkName: "pages/sales/important-links" */))
const _6f5615b4 = () => interopDefault(import('..\\pages\\sales\\maintodo.vue' /* webpackChunkName: "pages/sales/maintodo" */))
const _b4e985dc = () => interopDefault(import('..\\pages\\sales\\representative.vue' /* webpackChunkName: "pages/sales/representative" */))
const _d42a210a = () => interopDefault(import('..\\pages\\sales\\todo.vue' /* webpackChunkName: "pages/sales/todo" */))
const _65ddda19 = () => interopDefault(import('..\\pages\\sample\\finance.vue' /* webpackChunkName: "pages/sample/finance" */))
const _2a97848a = () => interopDefault(import('..\\pages\\sample\\sample.vue' /* webpackChunkName: "pages/sample/sample" */))
const _77fced36 = () => interopDefault(import('..\\pages\\selection\\input.vue' /* webpackChunkName: "pages/selection/input" */))
const _778629b6 = () => interopDefault(import('..\\pages\\selection\\size.vue' /* webpackChunkName: "pages/selection/size" */))
const _b5adecaa = () => interopDefault(import('..\\pages\\mekmer\\products\\production.vue' /* webpackChunkName: "pages/mekmer/products/production" */))
const _49347c5e = () => interopDefault(import('..\\pages\\mekmer\\products\\shipped.vue' /* webpackChunkName: "pages/mekmer/products/shipped" */))
const _73b2f4cc = () => interopDefault(import('..\\pages\\panel\\products\\notpublished.vue' /* webpackChunkName: "pages/panel/products/notpublished" */))
const _fda6c626 = () => interopDefault(import('..\\pages\\panel\\products\\published.vue' /* webpackChunkName: "pages/panel/products/published" */))
const _a834d3e0 = () => interopDefault(import('..\\pages\\panel\\products\\queue.vue' /* webpackChunkName: "pages/panel/products/queue" */))
const _0b141e34 = () => interopDefault(import('..\\pages\\reports\\mekmar\\ayo.vue' /* webpackChunkName: "pages/reports/mekmar/ayo" */))
const _18a9d368 = () => interopDefault(import('..\\pages\\reports\\mekmar\\ayo-compare.vue' /* webpackChunkName: "pages/reports/mekmar/ayo-compare" */))
const _bc78ccd0 = () => interopDefault(import('..\\pages\\reports\\mekmar\\filter-finance.vue' /* webpackChunkName: "pages/reports/mekmar/filter-finance" */))
const _7d1e9f90 = () => interopDefault(import('..\\pages\\reports\\mekmar\\forwarding.vue' /* webpackChunkName: "pages/reports/mekmar/forwarding" */))
const _0201a401 = () => interopDefault(import('..\\pages\\reports\\mekmar\\gu.vue' /* webpackChunkName: "pages/reports/mekmar/gu" */))
const _100f018e = () => interopDefault(import('..\\pages\\reports\\mekmar\\loading.vue' /* webpackChunkName: "pages/reports/mekmar/loading" */))
const _0bb1ccb1 = () => interopDefault(import('..\\pages\\reports\\mekmar\\mk.vue' /* webpackChunkName: "pages/reports/mekmar/mk" */))
const _829dfeba = () => interopDefault(import('..\\pages\\reports\\mekmar\\summary.vue' /* webpackChunkName: "pages/reports/mekmar/summary" */))
const _0e92c618 = () => interopDefault(import('..\\pages\\reports\\mekmer\\atlanta.vue' /* webpackChunkName: "pages/reports/mekmer/atlanta" */))
const _6dc517db = () => interopDefault(import('..\\pages\\reports\\mekmer\\finance.vue' /* webpackChunkName: "pages/reports/mekmer/finance" */))
const _079223a2 = () => interopDefault(import('..\\pages\\reports\\mekmer\\mine.vue' /* webpackChunkName: "pages/reports/mekmer/mine" */))
const _43e6eb2d = () => interopDefault(import('..\\pages\\reports\\mekmer\\onhold.vue' /* webpackChunkName: "pages/reports/mekmer/onhold" */))
const _2120f070 = () => interopDefault(import('..\\pages\\reports\\mekmer\\production.vue' /* webpackChunkName: "pages/reports/mekmer/production" */))
const _022d125b = () => interopDefault(import('..\\pages\\reports\\mekmer\\productions.vue' /* webpackChunkName: "pages/reports/mekmer/productions" */))
const _b1c77e58 = () => interopDefault(import('..\\pages\\reports\\mekmer\\shipped.vue' /* webpackChunkName: "pages/reports/mekmer/shipped" */))
const _0fb14757 = () => interopDefault(import('..\\pages\\reports\\mekmer\\stock.vue' /* webpackChunkName: "pages/reports/mekmer/stock" */))
const _67b469ea = () => interopDefault(import('..\\pages\\reports\\mekmer\\strips.vue' /* webpackChunkName: "pages/reports/mekmer/strips" */))
const _3113b53b = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _2e17fb5a,
    name: "auth"
  }, {
    path: "/finance",
    component: _5fff99c2,
    name: "finance"
  }, {
    path: "/offers",
    component: _59adf2c4,
    name: "offers"
  }, {
    path: "/passwords",
    component: _80cda97e,
    name: "passwords"
  }, {
    path: "/customer/bgp",
    component: _cc28fbd4,
    name: "customer-bgp"
  }, {
    path: "/customer/fair",
    component: _0560a42e,
    name: "customer-fair"
  }, {
    path: "/customer/mekmar",
    component: _0521aeb0,
    name: "customer-mekmar"
  }, {
    path: "/customer/offer",
    component: _392fae67,
    name: "customer-offer"
  }, {
    path: "/customer/selection",
    component: _5d7c07d2,
    name: "customer-selection"
  }, {
    path: "/operation/cards",
    component: _7dfdd9c3,
    name: "operation-cards"
  }, {
    path: "/operation/container",
    component: _53449be1,
    name: "operation-container"
  }, {
    path: "/operation/containerlist",
    component: _1c3a00ff,
    name: "operation-containerlist"
  }, {
    path: "/operation/follow",
    component: _6f532d81,
    name: "operation-follow"
  }, {
    path: "/operation/shipment",
    component: _db818e2c,
    name: "operation-shipment"
  }, {
    path: "/operation/supplier",
    component: _2c1e581c,
    name: "operation-supplier"
  }, {
    path: "/operation/transport",
    component: _f23e9aee,
    name: "operation-transport"
  }, {
    path: "/operation/transportlist",
    component: _611a83a7,
    name: "operation-transportlist"
  }, {
    path: "/operation/unfollow",
    component: _8bb0fa4c,
    name: "operation-unfollow"
  }, {
    path: "/operation/uploadform",
    component: _44f5c3d6,
    name: "operation-uploadform"
  }, {
    path: "/orders/production",
    component: _033067f6,
    name: "orders-production"
  }, {
    path: "/orders/shipped",
    component: _6443adb7,
    name: "orders-shipped"
  }, {
    path: "/orders/waiting",
    component: _469359b1,
    name: "orders-waiting"
  }, {
    path: "/panel/project",
    component: _6ee5de86,
    name: "panel-project"
  }, {
    path: "/panel/usa",
    component: _17d0105c,
    name: "panel-usa"
  }, {
    path: "/panel/users",
    component: _2710d177,
    name: "panel-users"
  }, {
    path: "/sales/bgp",
    component: _26c582a6,
    name: "sales-bgp"
  }, {
    path: "/sales/consider",
    component: _36fa6cee,
    name: "sales-consider"
  }, {
    path: "/sales/follow",
    component: _7a18a226,
    name: "sales-follow"
  }, {
    path: "/sales/important-links",
    component: _2e56ea29,
    name: "sales-important-links"
  }, {
    path: "/sales/maintodo",
    component: _6f5615b4,
    name: "sales-maintodo"
  }, {
    path: "/sales/representative",
    component: _b4e985dc,
    name: "sales-representative"
  }, {
    path: "/sales/todo",
    component: _d42a210a,
    name: "sales-todo"
  }, {
    path: "/sample/finance",
    component: _65ddda19,
    name: "sample-finance"
  }, {
    path: "/sample/sample",
    component: _2a97848a,
    name: "sample-sample"
  }, {
    path: "/selection/input",
    component: _77fced36,
    name: "selection-input"
  }, {
    path: "/selection/size",
    component: _778629b6,
    name: "selection-size"
  }, {
    path: "/mekmer/products/production",
    component: _b5adecaa,
    name: "mekmer-products-production"
  }, {
    path: "/mekmer/products/shipped",
    component: _49347c5e,
    name: "mekmer-products-shipped"
  }, {
    path: "/panel/products/notpublished",
    component: _73b2f4cc,
    name: "panel-products-notpublished"
  }, {
    path: "/panel/products/published",
    component: _fda6c626,
    name: "panel-products-published"
  }, {
    path: "/panel/products/queue",
    component: _a834d3e0,
    name: "panel-products-queue"
  }, {
    path: "/reports/mekmar/ayo",
    component: _0b141e34,
    name: "reports-mekmar-ayo"
  }, {
    path: "/reports/mekmar/ayo-compare",
    component: _18a9d368,
    name: "reports-mekmar-ayo-compare"
  }, {
    path: "/reports/mekmar/filter-finance",
    component: _bc78ccd0,
    name: "reports-mekmar-filter-finance"
  }, {
    path: "/reports/mekmar/forwarding",
    component: _7d1e9f90,
    name: "reports-mekmar-forwarding"
  }, {
    path: "/reports/mekmar/gu",
    component: _0201a401,
    name: "reports-mekmar-gu"
  }, {
    path: "/reports/mekmar/loading",
    component: _100f018e,
    name: "reports-mekmar-loading"
  }, {
    path: "/reports/mekmar/mk",
    component: _0bb1ccb1,
    name: "reports-mekmar-mk"
  }, {
    path: "/reports/mekmar/summary",
    component: _829dfeba,
    name: "reports-mekmar-summary"
  }, {
    path: "/reports/mekmer/atlanta",
    component: _0e92c618,
    name: "reports-mekmer-atlanta"
  }, {
    path: "/reports/mekmer/finance",
    component: _6dc517db,
    name: "reports-mekmer-finance"
  }, {
    path: "/reports/mekmer/mine",
    component: _079223a2,
    name: "reports-mekmer-mine"
  }, {
    path: "/reports/mekmer/onhold",
    component: _43e6eb2d,
    name: "reports-mekmer-onhold"
  }, {
    path: "/reports/mekmer/production",
    component: _2120f070,
    name: "reports-mekmer-production"
  }, {
    path: "/reports/mekmer/productions",
    component: _022d125b,
    name: "reports-mekmer-productions"
  }, {
    path: "/reports/mekmer/shipped",
    component: _b1c77e58,
    name: "reports-mekmer-shipped"
  }, {
    path: "/reports/mekmer/stock",
    component: _0fb14757,
    name: "reports-mekmer-stock"
  }, {
    path: "/reports/mekmer/strips",
    component: _67b469ea,
    name: "reports-mekmer-strips"
  }, {
    path: "/",
    component: _3113b53b,
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
