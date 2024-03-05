<template>
   <div class="container">
        <home :home="home" />
        <Button @click="getMessage" label="test"/>
        {{ messageRxd }}
   </div>
</template>

<script>
export default {

    computed:{
      home(){
            return this.$store.getters.getHomeList;
        }  
    },
    components:{
    },
    data(){
      return{
        socket:null,
        messageRxd:'1234',
        }  
    },
    beforeMount() {
      
  },
    created(){
        this.$store.dispatch('getHome');
    },
    mounted() {
     
      this.socket = this.$nuxtSocket({
      channel: '/index'
    })
    /* Listen for events: */
    this.socket
    .on('someEvent', (msg, cb) => {
      /* Handle event */
    })
  },
  methods: {
    getMessage() {
      this.$socket.emit('message');
  },
  }
}
</script>
