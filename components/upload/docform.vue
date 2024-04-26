<template>
    <div>
        <Button icon="pi pi-download" class="p-button"  @click="$refs.link_id.click()"/>
        <a :href="link" ref="link_id"/>


    </div>
</template>
<script>
export default {
    props:{
        link:{
            type:String,
            default:''
        }
    }
}
</script>
<style></style>