import{K as e,Lt as t,U as n,W as r,d as i,f as a,k as o,tt as s,z as c}from"./DUUoC_6G.js";import{t as l}from"./DrPW8wbh.js";import{a as u,t as d}from"./OH4aFwok.js";import{t as f}from"./cO8iUN-n.js";import{t as p}from"./CJFgjcHx.js";import{n as m}from"./B73JyQCi.js";import{t as h}from"./DAFm1g1Q.js";var g=d.extend({name:`scrolltop`,style:`
    .p-scrolltop.p-button {
        position: fixed !important;
        inset-block-end: 20px;
        inset-inline-end: 20px;
    }

    .p-scrolltop-sticky.p-button {
        position: sticky !important;
        display: flex;
        margin-inline-start: auto;
    }

    .p-scrolltop-enter-from {
        opacity: 0;
    }

    .p-scrolltop-enter-active {
        transition: opacity 300ms;
    }

    .p-scrolltop-leave-to {
        opacity: 0;
    }

    .p-scrolltop-leave-active {
        transition: opacity 300ms;
    }
`,classes:{root:function(e){return[`p-scrolltop`,{"p-scrolltop-sticky":e.props.target!==`window`}]},icon:`p-scrolltop-icon`}}),_={name:`ScrollTop`,extends:{name:`BaseScrollTop`,extends:p,props:{target:{type:String,default:`window`},threshold:{type:Number,default:400},icon:{type:String,default:void 0},behavior:{type:String,default:`smooth`},buttonProps:{type:Object,default:function(){return{rounded:!0}}}},style:g,provide:function(){return{$pcScrollTop:this,$parentInstance:this}}},inheritAttrs:!1,scrollListener:null,container:null,data:function(){return{visible:!1}},mounted:function(){this.target===`window`?this.bindDocumentScrollListener():this.target===`parent`&&this.bindParentScrollListener()},beforeUnmount:function(){this.target===`window`?this.unbindDocumentScrollListener():this.target===`parent`&&this.unbindParentScrollListener(),this.container&&(f.clear(this.container),this.overlay=null)},methods:{onClick:function(){(this.target===`window`?window:this.$el.parentElement).scroll({top:0,behavior:this.behavior})},checkVisibility:function(e){this.visible=e>this.threshold},bindParentScrollListener:function(){var e=this;this.scrollListener=function(){e.checkVisibility(e.$el.parentElement.scrollTop)},this.$el.parentElement.addEventListener(`scroll`,this.scrollListener)},bindDocumentScrollListener:function(){var e=this;this.scrollListener=function(){e.checkVisibility(u())},window.addEventListener(`scroll`,this.scrollListener)},unbindParentScrollListener:function(){this.scrollListener&&=(this.$el.parentElement.removeEventListener(`scroll`,this.scrollListener),null)},unbindDocumentScrollListener:function(){this.scrollListener&&=(window.removeEventListener(`scroll`,this.scrollListener),null)},onEnter:function(e){f.set(`overlay`,e,this.$primevue.config.zIndex.overlay)},onAfterLeave:function(e){f.clear(e)},containerRef:function(e){this.container=e?e.$el:void 0}},computed:{scrollTopAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.scrollTop:void 0}},components:{ChevronUpIcon:h,Button:m}};function v(u,d,f,p,m,h){var g=r(`Button`);return c(),i(l,o({name:`p-scrolltop`,appear:``,onEnter:h.onEnter,onAfterLeave:h.onAfterLeave},u.ptm(`transition`)),{default:s(function(){return[m.visible?(c(),i(g,o({key:0,ref:h.containerRef,class:u.cx(`root`),onClick:h.onClick,"aria-label":h.scrollTopAriaLabel,unstyled:u.unstyled},u.buttonProps,{pt:u.ptm(`root`)}),{icon:s(function(r){return[n(u.$slots,`icon`,{class:t(u.cx(`icon`))},function(){return[(c(),i(e(u.icon?`span`:`ChevronUpIcon`),o({class:[u.cx(`icon`),u.icon,r.class]},u.ptm(`root`).icon,{"data-pc-section":`icon`}),null,16,[`class`]))]})]}),_:3},16,[`class`,`onClick`,`aria-label`,`unstyled`,`pt`])):a(``,!0)]}),_:3},16,[`onEnter`,`onAfterLeave`])}_.render=v;export{_ as default};