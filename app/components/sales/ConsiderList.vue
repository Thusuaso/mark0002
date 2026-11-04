<template>
  <div>
    <DataTable
      :value="list"
      v-model:selection="selectedPointsOfConsider"
      selectionMode="single"
      @row-click="$emit('points_of_consider_selected_emit', $event)"
    >
      <Column
        field="Hata"
        header="Points of Consider"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
    </DataTable>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  data() {
    return {
      selectedPointsOfConsider: null,
    }
  },
}
</script>

<!--
  components/sales/ConsiderList.vue
  (Nuxt 2: components/sales/consider/list.vue)

  Etiket adi <SalesConsiderList>. Nuxt 2'de ad `salesConsiderList` idi
  (plugins/components.js:334, ELLE kayit).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] :selection + @update:selection -> v-model:selection
  [x] <Column ...></Column> -> <Column ... />
  [x] props.list -> `default: () => []`  (Nuxt 2'de default yoktu, veri
      gelene kadar DataTable :value="undefined" aliyordu)
-->
