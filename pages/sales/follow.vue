<template>
    <div class="container">
        <div class="row">
            <followList @followDetail="followDetail($event)" v-for="item of getFollowList" :key="item.FirmaAdi" :follow="item"/>
        </div>
        <Dialog :visible.sync="follow_dialog" modal :header="customer" >
            <div class="row container">
                <div class="col">
                    <button type="button" class="btn btn-outline-success w-100" @click="newForm">Yeni</button>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-outline-primary w-100">Takibi Bırak</button>
                </div>
            </div>
            <followForm :detailFollow="getFollowDetail" @follow_detail_data="followDetailData($event)"/>
        </Dialog>
        <Dialog :visible.sync="follow_form_detail_dialog" :header="follow_form_detail_header" modal :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <followFormDetail :followDetail="!getFollowDetailNewButton ? getFollowDetailData:followFormModel" @closed_follow_dialog="follow_form_detail_dialog = false"/>
        </Dialog>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    computed:{
        ...mapGetters([
            'getFollowDetailNewButton',
            'getFollowDetailData',
            'getFollowDetail',
            'getFollowList'
        ])
    },
    data(){
        return{
            follow_dialog:false,
            customer:null,
            follow_form_detail_dialog:false,
            follow_form_detail_header:null,
            followFormModel:{
                'MusteriAdi':null,
                'Aciklama':null,
                'Baslik':null,
                'Hatirlatma_Notu':null,
                'Tarih':null,
                'Hatirlatma_Tarih':null,
            },
        }
    },
    created(){
        this.$store.dispatch('setFollowList');
    },
    methods:{
        newForm(){
          this.followFormModel.MusteriAdi = this.getFollowDetail[0].MusteriAdi;
          this.followFormModel.MusteriId = this.getFollowDetail[0].ID;
          this.$store.dispatch('setFollowDetailNewButton',true);
          this.follow_form_detail_dialog = true;
          this.follow_form_detail_header = 'Yeni';

        },
        followDetailData(event){
            this.follow_form_detail_dialog = true;
            this.follow_form_detail_header = event.MusteriAdi;
        },
        followDetail(event){
            this.$store.dispatch('setFollowDetail',event.FirmaAdi);
            this.customer = event.FirmaAdi;
            this.follow_dialog = true;
        }
    }
}
</script>