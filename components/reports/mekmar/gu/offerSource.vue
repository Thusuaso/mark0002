<template>
  <div class="row">
    <div class="col-3">
      <DataTable :value="source_data.data_1" scrollable scrollHeight="450px">
        <template #header>
          <div style="margin: 0px auto; text-align: center">{{ date }}</div>
        </template>
        <Column field="KaynakYeri" header="Source"> </Column>
        <Column field="Num" header="Count">
          <template #footer>
            {{ data_1_total }}
          </template>
        </Column>
        <Column header="%">
          <template #body="slotProps">
            {{ ((slotProps.data.Num / data_1_total) * 100).toFixed(2) }}%
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable :value="source_data.data_2" scrollable scrollHeight="450px">
        <template #header>
          <div style="margin: 0px auto; text-align: center">{{ date - 1 }}</div>
        </template>
        <Column field="KaynakYeri" header="Source"> </Column>
        <Column field="Num" header="Count">
          <template #footer>
            {{ data_2_total }}
          </template>
        </Column>
        <Column header="%">
          <template #body="slotProps">
            {{ ((slotProps.data.Num / data_2_total) * 100).toFixed(2) }}%
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable :value="source_data.data_3" scrollable scrollHeight="450px">
        <template #header>
          <div style="margin: 0px auto; text-align: center">{{ date - 2 }}</div>
        </template>
        <Column field="KaynakYeri" header="Source"> </Column>
        <Column field="Num" header="Count">
          <template #footer>
            {{ data_3_total }}
          </template>
        </Column>
        <Column header="%">
          <template #body="slotProps">
            {{ ((slotProps.data.Num / data_3_total) * 100).toFixed(2) }}%
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="col-3">
      <DataTable :value="source_data.data_4" scrollable scrollHeight="450px">
        <template #header>
          <div style="margin: 0px auto; text-align: center">{{ date - 3 }}</div>
        </template>
        <Column field="KaynakYeri" header="Source"> </Column>
        <Column field="Num" header="Count">
          <template #footer>
            {{ data_4_total }}
          </template>
        </Column>
        <Column header="%">
          <template #body="slotProps">
            {{ ((slotProps.data.Num / data_4_total) * 100).toFixed(2) }}%
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      source_data: [],
      date: new Date().getFullYear(),
      data_1_total: 0,
      data_2_total: 0,
      data_3_total: 0,
      data_4_total: 0,
    };
  },
  created() {
    this.$axios.get("mekmar/reports/offer/source").then((res) => {
      this.source_data = res.data;
      this.source_data.data_1.forEach((item) => {
        this.data_1_total += item.Num;
      });
      this.source_data.data_2.forEach((item) => {
        this.data_2_total += item.Num;
      });
      this.source_data.data_3.forEach((item) => {
        this.data_3_total += item.Num;
      });
      this.source_data.data_4.forEach((item) => {
        this.data_4_total += item.Num;
      });
    });
  },
};
</script>
