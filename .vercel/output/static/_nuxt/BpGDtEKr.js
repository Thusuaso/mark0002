import{n as e}from"./hePW80VL.js";import{U as t,f as n,k as r,p as i,u as a,z as o}from"./DUUoC_6G.js";import{t as s}from"./OH4aFwok.js";import{t as c}from"./CJFgjcHx.js";var l=s.extend({name:`card`,style:`
    .p-card {
        background: dt('card.background');
        color: dt('card.color');
        box-shadow: dt('card.shadow');
        border-radius: dt('card.border.radius');
        display: flex;
        flex-direction: column;
    }

    .p-card-caption {
        display: flex;
        flex-direction: column;
        gap: dt('card.caption.gap');
    }

    .p-card-body {
        padding: dt('card.body.padding');
        display: flex;
        flex-direction: column;
        gap: dt('card.body.gap');
    }

    .p-card-title {
        font-size: dt('card.title.font.size');
        font-weight: dt('card.title.font.weight');
    }

    .p-card-subtitle {
        color: dt('card.subtitle.color');
    }
`,classes:{root:`p-card p-component`,header:`p-card-header`,body:`p-card-body`,caption:`p-card-caption`,title:`p-card-title`,subtitle:`p-card-subtitle`,content:`p-card-content`,footer:`p-card-footer`}}),u=e({default:()=>d}),d={name:`Card`,extends:{name:`BaseCard`,extends:c,style:l,provide:function(){return{$pcCard:this,$parentInstance:this}}},inheritAttrs:!1};function f(e,s,c,l,u,d){return o(),i(`div`,r({class:e.cx(`root`)},e.ptmi(`root`)),[e.$slots.header?(o(),i(`div`,r({key:0,class:e.cx(`header`)},e.ptm(`header`)),[t(e.$slots,`header`)],16)):n(``,!0),a(`div`,r({class:e.cx(`body`)},e.ptm(`body`)),[e.$slots.title||e.$slots.subtitle?(o(),i(`div`,r({key:0,class:e.cx(`caption`)},e.ptm(`caption`)),[e.$slots.title?(o(),i(`div`,r({key:0,class:e.cx(`title`)},e.ptm(`title`)),[t(e.$slots,`title`)],16)):n(``,!0),e.$slots.subtitle?(o(),i(`div`,r({key:1,class:e.cx(`subtitle`)},e.ptm(`subtitle`)),[t(e.$slots,`subtitle`)],16)):n(``,!0)],16)):n(``,!0),a(`div`,r({class:e.cx(`content`)},e.ptm(`content`)),[t(e.$slots,`content`)],16),e.$slots.footer?(o(),i(`div`,r({key:1,class:e.cx(`footer`)},e.ptm(`footer`)),[t(e.$slots,`footer`)],16)):n(``,!0)],16)],16)}d.render=f;export{d as n,u as t};