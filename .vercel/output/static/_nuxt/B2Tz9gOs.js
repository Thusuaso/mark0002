import{Bt as e,G as t,H as n,K as r,Lt as i,U as a,W as o,d as s,f as c,k as l,nt as u,p as d,r as f,tt as p,u as m,v as h,y as g,z as _}from"./DUUoC_6G.js";import{t as v}from"./DrPW8wbh.js";import{B as y,D as b,F as x,P as S,Q as C,et as w,l as T,t as E,xt as D}from"./OH4aFwok.js";import{t as O}from"./CRHlWn3X.js";import{t as k}from"./cO8iUN-n.js";import{t as A}from"./BormhqHp.js";import{t as j}from"./CJFgjcHx.js";import{t as M}from"./CsFFSw7x.js";import{t as N}from"./CDXMYN9b.js";import{t as P}from"./DUYirLWF.js";var F=E.extend({name:`menu`,style:`
    .p-menu {
        background: dt('menu.background');
        color: dt('menu.color');
        border: 1px solid dt('menu.border.color');
        border-radius: dt('menu.border.radius');
        min-width: 12.5rem;
    }

    .p-menu-list {
        margin: 0;
        padding: dt('menu.list.padding');
        outline: 0 none;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: dt('menu.list.gap');
    }

    .p-menu-item-content {
        transition:
            background dt('menu.transition.duration'),
            color dt('menu.transition.duration');
        border-radius: dt('menu.item.border.radius');
        color: dt('menu.item.color');
        overflow: hidden;
    }

    .p-menu-item-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        color: inherit;
        padding: dt('menu.item.padding');
        gap: dt('menu.item.gap');
        user-select: none;
        outline: 0 none;
    }

    .p-menu-item-label {
        line-height: 1;
    }

    .p-menu-item-icon {
        color: dt('menu.item.icon.color');
    }

    .p-menu-item.p-focus .p-menu-item-content {
        color: dt('menu.item.focus.color');
        background: dt('menu.item.focus.background');
    }

    .p-menu-item.p-focus .p-menu-item-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover {
        color: dt('menu.item.focus.color');
        background: dt('menu.item.focus.background');
    }

    .p-menu-item:not(.p-disabled) .p-menu-item-content:hover .p-menu-item-icon {
        color: dt('menu.item.icon.focus.color');
    }

    .p-menu-overlay {
        box-shadow: dt('menu.shadow');
    }

    .p-menu-submenu-label {
        background: dt('menu.submenu.label.background');
        padding: dt('menu.submenu.label.padding');
        color: dt('menu.submenu.label.color');
        font-weight: dt('menu.submenu.label.font.weight');
    }

    .p-menu-separator {
        border-block-start: 1px solid dt('menu.separator.border.color');
    }
`,classes:{root:function(e){return[`p-menu p-component`,{"p-menu-overlay":e.props.popup}]},start:`p-menu-start`,list:`p-menu-list`,submenuLabel:`p-menu-submenu-label`,separator:`p-menu-separator`,end:`p-menu-end`,item:function(e){var t=e.instance;return[`p-menu-item`,{"p-focus":t.id===t.focusedOptionId,"p-disabled":t.disabled()}]},itemContent:`p-menu-item-content`,itemLink:`p-menu-item-link`,itemIcon:`p-menu-item-icon`,itemLabel:`p-menu-item-label`}}),I={name:`BaseMenu`,extends:j,props:{popup:{type:Boolean,default:!1},model:{type:Array,default:null},appendTo:{type:[String,Object],default:`body`},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},tabindex:{type:Number,default:0},ariaLabel:{type:String,default:null},ariaLabelledby:{type:String,default:null}},style:F,provide:function(){return{$pcMenu:this,$parentInstance:this}}},L={name:`Menuitem`,hostName:`Menu`,extends:j,inheritAttrs:!1,emits:[`item-click`,`item-mousemove`],props:{item:null,templates:null,id:null,focusedOptionId:null,index:null},methods:{getItemProp:function(e,t){return e&&e.item?D(e.item[t]):void 0},getPTOptions:function(e){return this.ptm(e,{context:{item:this.item,index:this.index,focused:this.isItemFocused(),disabled:this.disabled()}})},isItemFocused:function(){return this.focusedOptionId===this.id},onItemClick:function(e){var t=this.getItemProp(this.item,`command`);t&&t({originalEvent:e,item:this.item.item}),this.$emit(`item-click`,{originalEvent:e,item:this.item,id:this.id})},onItemMouseMove:function(e){this.$emit(`item-mousemove`,{originalEvent:e,item:this.item,id:this.id})},visible:function(){return typeof this.item.visible==`function`?this.item.visible():this.item.visible!==!1},disabled:function(){return typeof this.item.disabled==`function`?this.item.disabled():this.item.disabled},label:function(){return typeof this.item.label==`function`?this.item.label():this.item.label},getMenuItemProps:function(e){return{action:l({class:this.cx(`itemLink`),tabindex:`-1`},this.getPTOptions(`itemLink`)),icon:l({class:[this.cx(`itemIcon`),e.icon]},this.getPTOptions(`itemIcon`)),label:l({class:this.cx(`itemLabel`)},this.getPTOptions(`itemLabel`))}}},computed:{dataP:function(){return O({focus:this.isItemFocused(),disabled:this.disabled()})}},directives:{ripple:M}},R=[`id`,`aria-label`,`aria-disabled`,`data-p-focused`,`data-p-disabled`,`data-p`],z=[`data-p`],B=[`href`,`target`],V=[`data-p`],H=[`data-p`];function U(n,a,o,f,p,h){var g=t(`ripple`);return h.visible()?(_(),d(`li`,l({key:0,id:o.id,class:[n.cx(`item`),o.item.class],role:`menuitem`,style:o.item.style,"aria-label":h.label(),"aria-disabled":h.disabled(),"data-p-focused":h.isItemFocused(),"data-p-disabled":h.disabled()||!1,"data-p":h.dataP},h.getPTOptions(`item`)),[m(`div`,l({class:n.cx(`itemContent`),onClick:a[0]||=function(e){return h.onItemClick(e)},onMousemove:a[1]||=function(e){return h.onItemMouseMove(e)},"data-p":h.dataP},h.getPTOptions(`itemContent`)),[o.templates.item?o.templates.item?(_(),s(r(o.templates.item),{key:1,item:o.item,label:h.label(),props:h.getMenuItemProps(o.item)},null,8,[`item`,`label`,`props`])):c(``,!0):u((_(),d(`a`,l({key:0,href:o.item.url,class:n.cx(`itemLink`),target:o.item.target,tabindex:`-1`},h.getPTOptions(`itemLink`)),[o.templates.itemicon?(_(),s(r(o.templates.itemicon),{key:0,item:o.item,class:i(n.cx(`itemIcon`))},null,8,[`item`,`class`])):o.item.icon?(_(),d(`span`,l({key:1,class:[n.cx(`itemIcon`),o.item.icon],"data-p":h.dataP},h.getPTOptions(`itemIcon`)),null,16,V)):c(``,!0),m(`span`,l({class:n.cx(`itemLabel`),"data-p":h.dataP},h.getPTOptions(`itemLabel`)),e(h.label()),17,H)],16,B)),[[g]])],16,z)],16,R)):c(``,!0)}L.render=U;function W(e){return J(e)||q(e)||K(e)||G()}function G(){throw TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function K(e,t){if(e){if(typeof e==`string`)return Y(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Y(e,t):void 0}}function q(e){if(typeof Symbol<`u`&&e[Symbol.iterator]!=null||e[`@@iterator`]!=null)return Array.from(e)}function J(e){if(Array.isArray(e))return Y(e)}function Y(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var X={name:`Menu`,extends:I,inheritAttrs:!1,emits:[`show`,`hide`,`focus`,`blur`],data:function(){return{overlayVisible:!1,focused:!1,focusedOptionIndex:-1,selectedOptionIndex:-1}},target:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,list:null,mounted:function(){this.popup||(this.bindResizeListener(),this.bindOutsideClickListener())},beforeUnmount:function(){this.unbindResizeListener(),this.unbindOutsideClickListener(),this.scrollHandler&&=(this.scrollHandler.destroy(),null),this.target=null,this.container&&this.autoZIndex&&k.clear(this.container),this.container=null},methods:{itemClick:function(e){var t=e.item;this.disabled(t)||(t.command&&t.command(e),this.overlayVisible&&this.hide(),!this.popup&&this.focusedOptionIndex!==e.id&&(this.focusedOptionIndex=e.id))},itemMouseMove:function(e){this.focused&&(this.focusedOptionIndex=e.id)},onListFocus:function(e){this.focused=!0,!this.popup&&this.changeFocusedOptionIndex(0),this.$emit(`focus`,e)},onListBlur:function(e){this.focused=!1,this.focusedOptionIndex=-1,this.$emit(`blur`,e)},onListKeyDown:function(e){switch(e.code){case`ArrowDown`:this.onArrowDownKey(e);break;case`ArrowUp`:this.onArrowUpKey(e);break;case`Home`:this.onHomeKey(e);break;case`End`:this.onEndKey(e);break;case`Enter`:case`NumpadEnter`:this.onEnterKey(e);break;case`Space`:this.onSpaceKey(e);break;case`Escape`:this.popup&&(y(this.target),this.hide());case`Tab`:this.overlayVisible&&this.hide()}},onArrowDownKey:function(e){var t=this.findNextOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(t),e.preventDefault()},onArrowUpKey:function(e){if(e.altKey&&this.popup)y(this.target),this.hide(),e.preventDefault();else{var t=this.findPrevOptionIndex(this.focusedOptionIndex);this.changeFocusedOptionIndex(t),e.preventDefault()}},onHomeKey:function(e){this.changeFocusedOptionIndex(0),e.preventDefault()},onEndKey:function(e){this.changeFocusedOptionIndex(S(this.container,`li[data-pc-section="item"][data-p-disabled="false"]`).length-1),e.preventDefault()},onEnterKey:function(e){var t=w(this.list,`li[id="${`${this.focusedOptionIndex}`}"]`),n=t&&w(t,`a[data-pc-section="itemlink"]`);this.popup&&y(this.target),n?n.click():t&&t.click(),e.preventDefault()},onSpaceKey:function(e){this.onEnterKey(e)},findNextOptionIndex:function(e){var t=W(S(this.container,`li[data-pc-section="item"][data-p-disabled="false"]`)).findIndex(function(t){return t.id===e});return t>-1?t+1:0},findPrevOptionIndex:function(e){var t=W(S(this.container,`li[data-pc-section="item"][data-p-disabled="false"]`)).findIndex(function(t){return t.id===e});return t>-1?t-1:0},changeFocusedOptionIndex:function(e){var t=S(this.container,`li[data-pc-section="item"][data-p-disabled="false"]`),n=e>=t.length?t.length-1:e<0?0:e;n>-1&&(this.focusedOptionIndex=t[n].getAttribute(`id`))},toggle:function(e,t){this.overlayVisible?this.hide():this.show(e,t)},show:function(e,t){this.overlayVisible=!0,this.target=t??e.currentTarget},hide:function(){this.overlayVisible=!1,this.target=null},onEnter:function(e){b(e,{position:`absolute`,top:`0`}),this.alignOverlay(),this.bindOutsideClickListener(),this.bindResizeListener(),this.bindScrollListener(),this.autoZIndex&&k.set(`menu`,e,this.baseZIndex||this.$primevue.config.zIndex.menu),this.popup&&y(this.list),this.$emit(`show`)},onLeave:function(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindScrollListener(),this.$emit(`hide`)},onAfterLeave:function(e){this.autoZIndex&&k.clear(e)},alignOverlay:function(){T(this.container,this.target),C(this.target)>C(this.container)&&(this.container.style.minWidth=C(this.target)+`px`)},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){var n=e.container&&!e.container.contains(t.target),r=!e.target||e.target!==t.target&&!e.target.contains(t.target);e.overlayVisible&&n&&r?e.hide():!e.popup&&n&&r&&(e.focusedOptionIndex=-1)},document.addEventListener(`click`,this.outsideClickListener,!0))},unbindOutsideClickListener:function(){this.outsideClickListener&&=(document.removeEventListener(`click`,this.outsideClickListener,!0),null)},bindScrollListener:function(){var e=this;this.scrollHandler||=new A(this.target,function(){e.overlayVisible&&e.hide()}),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.overlayVisible&&!x()&&e.hide()},window.addEventListener(`resize`,this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&=(window.removeEventListener(`resize`,this.resizeListener),null)},visible:function(e){return typeof e.visible==`function`?e.visible():e.visible!==!1},disabled:function(e){return typeof e.disabled==`function`?e.disabled():e.disabled},label:function(e){return typeof e.label==`function`?e.label():e.label},onOverlayClick:function(e){N.emit(`overlay-click`,{originalEvent:e,target:this.target})},containerRef:function(e){this.container=e},listRef:function(e){this.list=e}},computed:{focusedOptionId:function(){return this.focusedOptionIndex===-1?null:this.focusedOptionIndex},dataP:function(){return O({popup:this.popup})}},components:{PVMenuitem:L,Portal:P}},Z=[`id`,`data-p`],Q=[`id`,`tabindex`,`aria-activedescendant`,`aria-label`,`aria-labelledby`],$=[`id`];function ee(t,r,i,u,y,b){var x=o(`PVMenuitem`),S=o(`Portal`);return _(),s(S,{appendTo:t.appendTo,disabled:!t.popup},{default:p(function(){return[g(v,l({name:`p-anchored-overlay`,onEnter:b.onEnter,onLeave:b.onLeave,onAfterLeave:b.onAfterLeave},t.ptm(`transition`)),{default:p(function(){return[!t.popup||y.overlayVisible?(_(),d(`div`,l({key:0,ref:b.containerRef,id:t.$id,class:t.cx(`root`),onClick:r[3]||=function(){return b.onOverlayClick&&b.onOverlayClick.apply(b,arguments)},"data-p":b.dataP},t.ptmi(`root`)),[t.$slots.start?(_(),d(`div`,l({key:0,class:t.cx(`start`)},t.ptm(`start`)),[a(t.$slots,`start`)],16)):c(``,!0),m(`ul`,l({ref:b.listRef,id:t.$id+`_list`,class:t.cx(`list`),role:`menu`,tabindex:t.tabindex,"aria-activedescendant":y.focused?b.focusedOptionId:void 0,"aria-label":t.ariaLabel,"aria-labelledby":t.ariaLabelledby,onFocus:r[0]||=function(){return b.onListFocus&&b.onListFocus.apply(b,arguments)},onBlur:r[1]||=function(){return b.onListBlur&&b.onListBlur.apply(b,arguments)},onKeydown:r[2]||=function(){return b.onListKeyDown&&b.onListKeyDown.apply(b,arguments)}},t.ptm(`list`)),[(_(!0),d(f,null,n(t.model,function(r,i){return _(),d(f,{key:b.label(r)+i.toString()},[r.items&&b.visible(r)&&!r.separator?(_(),d(f,{key:0},[r.items?(_(),d(`li`,l({key:0,id:t.$id+`_`+i,class:[t.cx(`submenuLabel`),r.class],role:`none`},{ref_for:!0},t.ptm(`submenuLabel`)),[a(t.$slots,t.$slots.submenulabel?`submenulabel`:`submenuheader`,{item:r},function(){return[h(e(b.label(r)),1)]})],16,$)):c(``,!0),(_(!0),d(f,null,n(r.items,function(e,n){return _(),d(f,{key:e.label+i+`_`+n},[b.visible(e)&&!e.separator?(_(),s(x,{key:0,id:t.$id+`_`+i+`_`+n,item:e,templates:t.$slots,focusedOptionId:b.focusedOptionId,unstyled:t.unstyled,onItemClick:b.itemClick,onItemMousemove:b.itemMouseMove,pt:t.pt},null,8,[`id`,`item`,`templates`,`focusedOptionId`,`unstyled`,`onItemClick`,`onItemMousemove`,`pt`])):b.visible(e)&&e.separator?(_(),d(`li`,l({key:`separator`+i+n,class:[t.cx(`separator`),r.class],style:e.style,role:`separator`},{ref_for:!0},t.ptm(`separator`)),null,16)):c(``,!0)],64)}),128))],64)):b.visible(r)&&r.separator?(_(),d(`li`,l({key:`separator`+i.toString(),class:[t.cx(`separator`),r.class],style:r.style,role:`separator`},{ref_for:!0},t.ptm(`separator`)),null,16)):(_(),s(x,{key:b.label(r)+i.toString(),id:t.$id+`_`+i,item:r,index:i,templates:t.$slots,focusedOptionId:b.focusedOptionId,unstyled:t.unstyled,onItemClick:b.itemClick,onItemMousemove:b.itemMouseMove,pt:t.pt},null,8,[`id`,`item`,`index`,`templates`,`focusedOptionId`,`unstyled`,`onItemClick`,`onItemMousemove`,`pt`]))],64)}),128))],16,Q),t.$slots.end?(_(),d(`div`,l({key:1,class:t.cx(`end`)},t.ptm(`end`)),[a(t.$slots,`end`)],16)):c(``,!0)],16,Z)):c(``,!0)]}),_:3},16,[`onEnter`,`onLeave`,`onAfterLeave`])]}),_:3},8,[`appendTo`,`disabled`])}X.render=ee;export{X as default};