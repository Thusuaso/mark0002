<template>
  <div>
    <DataTable :value="list.forwList" :loading="loading">
      <Column field="Marketing" header="Marketing"></Column>
      <Column field="Fob" header="Fob">
        <template #body="slotProps">
          {{ slotProps.data.Fob | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.forwarding.fob | formatPriceUsd }}
        </template>
      </Column>
      <Column field="Ddp" header="Ddp">
        <template #body="slotProps">
          {{ slotProps.data.Ddp | formatPriceUsd }}
        </template>
        <template #footer>
          {{ total.forwarding.ddp | formatPriceUsd }}
        </template>
      </Column>
    </DataTable>
    <br />
    <div class="row">
      <div class="col">
        <DataTable :value="list.forwMekmarList" scrollable scrollHeight="500px" :loading="loading">
          <template #header> Mekmar </template>
          <Column field="SiparisNo" header="Po"></Column>
          <Column field="Fob" header="Fob">
            <template #body="slotProps">
              {{ slotProps.data.Fob | formatPriceUsd }}
            </template>
            <template #footer>
              {{ total.mekmar.ddp | formatPriceUsd }}
            </template>
          </Column>
          <Column field="Ddp" header="Ddp">
            <template #body="slotProps">
              {{ slotProps.data.Ddp | formatPriceUsd }}
            </template>
            <template #footer>
              {{ total.mekmar.ddp | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col">
        <DataTable :value="list.forwInList" scrollable scrollHeight="500px" :loading="loading">
          <template #header> İç Piyasa </template>
          <Column field="SiparisNo" header="Po"></Column>
          <Column field="Fob" header="Fob">
            <template #body="slotProps">
              {{ slotProps.data.Fob | formatPriceUsd }}
            </template>
            <template #footer>
              {{ total.in.ddp | formatPriceUsd }}
            </template>
          </Column>
          <Column field="Ddp" header="Ddp">
            <template #body="slotProps">
              {{ slotProps.data.Ddp | formatPriceUsd }}
            </template>
            <template #footer>
              {{ total.in.ddp | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col">
        <DataTable :value="list.forwMekmerList" scrollable scrollHeight="500px" :loading="loading">
          <template #header>Mekmer </template>
          <Column field="SiparisNo" header="Po"></Column>
          <Column field="Fob" header="Fob">
            <template #body="slotProps">
              {{ slotProps.data.Fob | formatPriceUsd }}
            </template>
            <template #footer>
              {{ total.mekmer.ddp | formatPriceUsd }}
            </template>
          </Column>
          <Column field="Ddp" header="Ddp">
            <template #body="slotProps">
              {{ slotProps.data.Ddp | formatPriceUsd }}
            </template>
            <template #footer>
              {{ total.mekmer.ddp | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col">
        <DataTable :value="list.forwImpList" scrollable scrollHeight="500px" :loading="loading">
          <template #header>Imperial Homes </template>
          <Column field="SiparisNo" header="Po"></Column>
          <Column field="Fob" header="Fob">
            <template #body="slotProps">
              {{ slotProps.data.Fob | formatPriceUsd }}
            </template>
            <template #footer>
              {{ total.imp.ddp | formatPriceUsd }}
            </template>
          </Column>
          <Column field="Ddp" header="Ddp">
            <template #body="slotProps">
              {{ slotProps.data.Ddp | formatPriceUsd }}
            </template>
            <template #footer>
              {{ total.imp.ddp | formatPriceUsd }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      required: false,
    },
    total: {
      type: Object,
      required: false,
    },
    loading: {
      type: Boolean,
      required:false
    }
  },
};
</script>
