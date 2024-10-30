<template>
  <div>
    <DataTable :value="list">
      <Column field="YuklemeEvrakID" header="Y.ID">
        <template #body="slotProps">
          {{ slotProps.data.YuklemeEvrakID  }}
        </template>
      </Column>
      <Column field="SiparisFaturaTurID" header="S.ID">
        <template #body="slotProps">
          {{ slotProps.data.SiparisFaturaTurID  }}
        </template>
      </Column>
      <Column field="Tarih" header="Upload Date">
        <template #body="slotProps">
          {{ slotProps.data.Tarih | dateToString }}
        </template>
      </Column>
      <Column field="Evrak" header="Document Name"></Column>
      <Column field="Link" header="Link">
        <template #body="slotProps">
          <a :href="slotProps.data.Link">
            <i class="pi pi-download"></i>
          </a>
        </template>
      </Column>
      <Column field="kullanici" header="Document Rep"> </Column>
      <Column header="#">
        <template #body="slotProps">
          <Button
            v-if="slotProps.data.Evrak == 'Proforma Invoice'"
            label="Sil"
            class="p-button-danger"
            @click="proformaDelete(slotProps.data.ID)"
          ></Button>
          <Button
            v-if="slotProps.data.YuklemeEvrakID == 3"
            label="Sil"
            class="p-button-danger"
            @click="isfDelete(slotProps.data)"
          ></Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
  },
  methods: {
    isfDelete(event) {
      if(confirm('Are you sure you want to delete?')){
        this.$emit("isf_delete_emit", event);

      }
    },
    proformaDelete(id) {
      if(confirm('Are you sure you want to delete?')){
        this.$emit("proforma_delete_emit", id);

      }
    },
  },
  watch: {
    list() {
      console.log(this.list);
    },
  },
};
</script>
