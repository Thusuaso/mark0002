<template>
    <div class="container">
        <DataTable 
            :value="detailFollow" 
            tableStyle="min-width: 50rem"
            :selection="selectedFollowDetail"
            selectionMode="single" 
            :metaKeySelection="true" 
            dataKey="ID"
            @row-click="followDetailSelected($event)"
        >
            <Column field="Tarih" header="Kayıt">
                <template #body="slotProps">
                    {{ slotProps.data.Tarih | dateToString }}
                </template>
            </Column>
            <Column field="Baslik" header="Başlık"></Column>
            <Column field="Aciklama" header="Aciklama"></Column>
            <Column field="Hatirlatma_Tarih" header="Hatirlatma Tarih">
                <template #body="slotProps">
                    {{ slotProps.data.Hatirlatma_Tarih | dateToString }}
                </template>
            </Column>
            <Column field="Hatirlatma_Notu" header="Hatirlatma A."></Column>
            <Column field="KullaniciAdi" header="Temsilci"></Column>
        </DataTable>
     </div>
</template>
<script>
export default {
    computed:{
      
    },
    props:{
        detailFollow:{
            type:Array,
            required:false,
        }
    },
    data(){
        return{
            selectedFollowDetail:null,
        }
    },
    methods:{
        followDetailSelected(event){
            this.$store.dispatch('setFollowDetailNewButton',false);
            this.$store.dispatch('setFollowDetailData',event.data);
            this.$emit('follow_detail_data',event.data);
        }
    }
}
</script>