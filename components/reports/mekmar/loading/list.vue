<template>
  <div class="row">
    <div class="col">
      <DataTable :value="list" responsiveLayout="scroll"
      sortField="Dtp"
      :sortOrder="-1"
      :loading="loading"
      :scrollable="true" scrollHeight="550px"
    >
    <Column field="YuklemeTarihi" header="L.Date">
      <template #body="slotProps">
        {{ slotProps.data.YuklemeTarihi | dateToString }}
      </template>
    </Column>
    <Column field="MusteriAdi" header="Customer"></Column>
    <Column field="SiparisNo" header="Po"></Column>
    <Column field="Fob" header="Fob">
      <template #body="slotProps">
        {{ slotProps.data.Fob | formatPriceUsd }}
      </template>
      <template #footer>
        {{ total.fob | formatPriceUsd }}
      </template>
    </Column>
    <Column field="Dtp" header="Ddp">
      <template #body="slotProps">
        {{ slotProps.data.Dtp | formatPriceUsd }}
      </template>
      <template #footer>
        {{ total.ddp | formatPriceUsd }}
      </template>
    </Column>

  </DataTable>
    </div>
    <div class="col">
      <DataTable :value="yearly" responsiveLayout="scroll"
      sortField="Dtp"
      :sortOrder="-1"
      :loading="loading"
      :scrollable="true" scrollHeight="550px"
    >
    <Column field="MusteriAdi" header="Customer"></Column>
    <Column field="SiparisNo" header="Po"></Column>
    <Column field="Fob" header="Fob">
      <template #body="slotProps">
        {{ slotProps.data.Fob | formatPriceUsd }}
      </template>
      <template #footer>
        {{ yearlyTotal.fob | formatPriceUsd }}
      </template>
    </Column>
    <Column field="Dtp" header="Ddp">
      <template #body="slotProps">
        {{ slotProps.data.Dtp | formatPriceUsd }}
      </template>
      <template #footer>
        {{ yearlyTotal.ddp | formatPriceUsd }}
      </template>
    </Column>

  </DataTable>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    list:{
      type:Array,
      required:false
    },
    total:{
      type:Object,
      required:false
    },
    yearly:{
      type:Array,
      required:false
    },
    yearlyTotal:{
      type:Object,
      required:false
    },
    loading:{
      type:Boolean,
      required:false
    }
  }
}
</script>