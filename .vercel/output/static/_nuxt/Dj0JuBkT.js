import{Bt as e,H as t,f as n,k as r,nt as i,p as a,r as o,u as s,z as c}from"./DUUoC_6G.js";import{a as l}from"./DrPW8wbh.js";import{Et as u,t as d}from"./OH4aFwok.js";import{t as f}from"./CJFgjcHx.js";var p=u(),m=d.extend({name:`terminal`,style:`
    .p-terminal {
        display: block;
        height: dt('terminal.height');
        overflow: auto;
        background: dt('terminal.background');
        color: dt('terminal.color');
        border: 1px solid dt('terminal.border.color');
        padding: dt('terminal.padding');
        border-radius: dt('terminal.border.radius');
    }

    .p-terminal-prompt {
        display: flex;
        align-items: center;
    }

    .p-terminal-prompt-value {
        flex: 1 1 auto;
        border: 0 none;
        background: transparent;
        color: inherit;
        padding: 0;
        outline: 0 none;
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
    }

    .p-terminal-prompt-label {
        margin-inline-end: dt('terminal.prompt.gap');
    }

    .p-terminal-input::-ms-clear {
        display: none;
    }

    .p-terminal-command-response {
        margin: dt('terminal.command.response.margin');
    }
`,classes:{root:`p-terminal p-component`,welcomeMessage:`p-terminal-welcome-message`,commandList:`p-terminal-command-list`,command:`p-terminal-command`,commandValue:`p-terminal-command-value`,commandResponse:`p-terminal-command-response`,prompt:`p-terminal-prompt`,promptLabel:`p-terminal-prompt-label`,promptValue:`p-terminal-prompt-value`}}),h={name:`Terminal`,extends:{name:`BaseTerminal`,extends:f,props:{welcomeMessage:{type:String,default:null},prompt:{type:String,default:null}},style:m,provide:function(){return{$pcTerminal:this,$parentInstance:this}}},inheritAttrs:!1,data:function(){return{commandText:null,commands:[]}},mounted:function(){p.on(`response`,this.responseListener),this.$refs.input.focus()},updated:function(){this.$el.scrollTop=this.$el.scrollHeight},beforeUnmount:function(){p.off(`response`,this.responseListener)},methods:{onClick:function(){this.$refs.input.focus()},onKeydown:function(e){e.key===`Enter`&&this.commandText&&(this.commands.push({text:this.commandText}),p.emit(`command`,this.commandText),this.commandText=``)},responseListener:function(e){this.commands[this.commands.length-1].response=e}}};function g(u,d,f,p,m,h){return c(),a(`div`,r({class:u.cx(`root`),onClick:d[2]||=function(){return h.onClick&&h.onClick.apply(h,arguments)}},u.ptmi(`root`)),[u.welcomeMessage?(c(),a(`div`,r({key:0,class:u.cx(`welcomeMessage`)},u.ptm(`welcomeMessage`)),e(u.welcomeMessage),17)):n(``,!0),s(`div`,r({class:u.cx(`commandList`)},u.ptm(`content`)),[(c(!0),a(o,null,t(m.commands,function(t,n){return c(),a(`div`,r({key:t.text+n.toString(),class:u.cx(`command`)},{ref_for:!0},u.ptm(`commands`)),[s(`span`,r({class:u.cx(`promptLabel`)},{ref_for:!0},u.ptm(`prompt`)),e(u.prompt),17),s(`span`,r({class:u.cx(`commandValue`)},{ref_for:!0},u.ptm(`command`)),e(t.text),17),s(`div`,r({class:u.cx(`commandResponse`),"aria-live":`polite`},{ref_for:!0},u.ptm(`response`)),e(t.response),17)],16)}),128))],16),s(`div`,r({class:u.cx(`prompt`)},u.ptm(`container`)),[s(`span`,r({class:u.cx(`promptLabel`)},u.ptm(`prompt`)),e(u.prompt),17),i(s(`input`,r({ref:`input`,"onUpdate:modelValue":d[0]||=function(e){return m.commandText=e},class:u.cx(`promptValue`),type:`text`,autocomplete:`off`,onKeydown:d[1]||=function(){return h.onKeydown&&h.onKeydown.apply(h,arguments)}},u.ptm(`commandText`)),null,16),[[l,m.commandText]])],16)],16)}h.render=g;export{h as default};