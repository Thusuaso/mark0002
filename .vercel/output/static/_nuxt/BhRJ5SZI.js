import{Bt as e,H as t,K as n,Lt as r,U as i,W as a,d as o,f as s,k as c,p as l,r as u,u as d,y as f,z as p}from"./DUUoC_6G.js";import{t as m}from"./OH4aFwok.js";import{t as h}from"./CJFgjcHx.js";import{t as g}from"./Co-BfoWv.js";var _=m.extend({name:`breadcrumb`,style:`
    .p-breadcrumb {
        background: dt('breadcrumb.background');
        padding: dt('breadcrumb.padding');
        overflow-x: auto;
    }

    .p-breadcrumb-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        gap: dt('breadcrumb.gap');
    }

    .p-breadcrumb-separator {
        display: flex;
        align-items: center;
        color: dt('breadcrumb.separator.color');
    }

    .p-breadcrumb-separator-icon:dir(rtl) {
        transform: rotate(180deg);
    }

    .p-breadcrumb::-webkit-scrollbar {
        display: none;
    }

    .p-breadcrumb-item-link {
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: dt('breadcrumb.item.gap');
        transition:
            background dt('breadcrumb.transition.duration'),
            color dt('breadcrumb.transition.duration'),
            outline-color dt('breadcrumb.transition.duration'),
            box-shadow dt('breadcrumb.transition.duration');
        border-radius: dt('breadcrumb.item.border.radius');
        outline-color: transparent;
        color: dt('breadcrumb.item.color');
    }

    .p-breadcrumb-item-link:focus-visible {
        box-shadow: dt('breadcrumb.item.focus.ring.shadow');
        outline: dt('breadcrumb.item.focus.ring.width') dt('breadcrumb.item.focus.ring.style') dt('breadcrumb.item.focus.ring.color');
        outline-offset: dt('breadcrumb.item.focus.ring.offset');
    }

    .p-breadcrumb-item-link:hover .p-breadcrumb-item-label {
        color: dt('breadcrumb.item.hover.color');
    }

    .p-breadcrumb-item-label {
        transition: inherit;
    }

    .p-breadcrumb-item-icon {
        color: dt('breadcrumb.item.icon.color');
        transition: inherit;
    }

    .p-breadcrumb-item-link:hover .p-breadcrumb-item-icon {
        color: dt('breadcrumb.item.icon.hover.color');
    }
`,classes:{root:`p-breadcrumb p-component`,list:`p-breadcrumb-list`,homeItem:`p-breadcrumb-home-item`,separator:`p-breadcrumb-separator`,separatorIcon:`p-breadcrumb-separator-icon`,item:function(e){return[`p-breadcrumb-item`,{"p-disabled":e.instance.disabled()}]},itemLink:`p-breadcrumb-item-link`,itemIcon:`p-breadcrumb-item-icon`,itemLabel:`p-breadcrumb-item-label`}}),v={name:`BaseBreadcrumb`,extends:h,props:{model:{type:Array,default:null},home:{type:null,default:null}},style:_,provide:function(){return{$pcBreadcrumb:this,$parentInstance:this}}},y={name:`BreadcrumbItem`,hostName:`Breadcrumb`,extends:h,props:{item:null,templates:null,index:null},methods:{onClick:function(e){this.item.command&&this.item.command({originalEvent:e,item:this.item})},visible:function(){return typeof this.item.visible==`function`?this.item.visible():this.item.visible!==!1},disabled:function(){return typeof this.item.disabled==`function`?this.item.disabled():this.item.disabled},label:function(){return typeof this.item.label==`function`?this.item.label():this.item.label},isCurrentUrl:function(){var e=this.item,t=e.to,n=e.url,r=typeof window<`u`?window.location.pathname:``;return t===r||n===r?`page`:void 0}},computed:{ptmOptions:function(){return{context:{item:this.item,index:this.index}}},getMenuItemProps:function(){var e=this;return{action:c({class:this.cx(`itemLink`),"aria-current":this.isCurrentUrl(),onClick:function(t){return e.onClick(t)}},this.ptm(`itemLink`,this.ptmOptions)),icon:c({class:[this.cx(`icon`),this.item.icon]},this.ptm(`icon`,this.ptmOptions)),label:c({class:this.cx(`label`)},this.ptm(`label`,this.ptmOptions))}}}},b=[`href`,`target`,`aria-current`];function x(t,i,a,u,d,f){return f.visible()?(p(),l(`li`,c({key:0,class:[t.cx(`item`),a.item.class]},t.ptm(`item`,f.ptmOptions)),[a.templates.item?(p(),o(n(a.templates.item),{key:1,item:a.item,label:f.label(),props:f.getMenuItemProps},null,8,[`item`,`label`,`props`])):(p(),l(`a`,c({key:0,href:a.item.url||`#`,class:t.cx(`itemLink`),target:a.item.target,"aria-current":f.isCurrentUrl(),onClick:i[0]||=function(){return f.onClick&&f.onClick.apply(f,arguments)}},t.ptm(`itemLink`,f.ptmOptions)),[a.templates&&a.templates.itemicon?(p(),o(n(a.templates.itemicon),{key:0,item:a.item,class:r(t.cx(`itemIcon`,f.ptmOptions))},null,8,[`item`,`class`])):a.item.icon?(p(),l(`span`,c({key:1,class:[t.cx(`itemIcon`),a.item.icon]},t.ptm(`itemIcon`,f.ptmOptions)),null,16)):s(``,!0),a.item.label?(p(),l(`span`,c({key:2,class:t.cx(`itemLabel`)},t.ptm(`itemLabel`,f.ptmOptions)),e(f.label()),17)):s(``,!0)],16,b))],16)):s(``,!0)}y.render=x;var S={name:`Breadcrumb`,extends:v,inheritAttrs:!1,components:{BreadcrumbItem:y,ChevronRightIcon:g}};function C(e,n,r,m,h,g){var _=a(`BreadcrumbItem`),v=a(`ChevronRightIcon`);return p(),l(`nav`,c({class:e.cx(`root`)},e.ptmi(`root`)),[d(`ol`,c({class:e.cx(`list`)},e.ptm(`list`)),[e.home?(p(),o(_,c({key:0,item:e.home,class:e.cx(`homeItem`),templates:e.$slots,pt:e.pt,unstyled:e.unstyled},e.ptm(`homeItem`)),null,16,[`item`,`class`,`templates`,`pt`,`unstyled`])):s(``,!0),(p(!0),l(u,null,t(e.model,function(t,n){return p(),l(u,{key:t.label+`_`+n},[e.home||n!==0?(p(),l(`li`,c({key:0,class:e.cx(`separator`)},{ref_for:!0},e.ptm(`separator`)),[i(e.$slots,`separator`,{},function(){return[f(v,c({"aria-hidden":`true`,class:e.cx(`separatorIcon`)},{ref_for:!0},e.ptm(`separatorIcon`)),null,16,[`class`])]})],16)):s(``,!0),f(_,{item:t,index:n,templates:e.$slots,pt:e.pt,unstyled:e.unstyled},null,8,[`item`,`index`,`templates`,`pt`,`unstyled`])],64)}),128))],16)],16)}S.render=C;export{S as default};