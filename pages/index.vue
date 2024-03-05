<template>
   <div class="container">
        <home :home="home" />
        <Button label="test" @click="methods1" class="btn btn-success"></Button>
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
        
        }  
    },
    created(){
        this.$store.dispatch('getHome');
    },
    mounted() {
    const socket = this.$nuxtSocket({
        channel: '/socket.io'
    })
    /* Listen for events: */
    socket
    .on('someEvent', (msg) => {
      console.log(msg)
    })
  },
    methods:{
        methods1(){
            const socket = this.$nuxtSocket({
                channel: '/socket.io'
            });
            socket.emit('someEvent','deneme')
        }
    }
}
</script>
