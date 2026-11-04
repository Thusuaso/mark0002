<template>
  <div>
    <Button
      type="button"
      severity="success"
      class="w-100"
      label="Change Queue"
      @click="$emit('sales_to_do_main_list_change_queue', list)"
    />
    <DataTable
      :value="list"
      :reorderableColumns="true"
      @row-reorder="onRowReorder($event)"
      v-model:selection="selectedMainList"
      selectionMode="single"
      @row-click="$emit('main_to_do_list_selected_emit', $event)"
      v-model:filters="mainTodoFilter"
      filterDisplay="row"
    >
      <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="false" />
      <Column
        field="Sira"
        header="Queue"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
      <Column
        field="OrtakGorev"
        header="Assignee"
        :showFilterMenu="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column
        field="Yapilacak"
        header="Assignment"
        :showFilterMenu="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
      <Column header="#" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          <Button
            type="button"
            label="Done"
            @click="$emit('sales_to_do_main_done_emit', slotProps.data.ID)"
          />
        </template>
      </Column>
      <Column header="#" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          <Button
            type="button"
            severity="secondary"
            label="Seen"
            @click="$emit('sales_to_do_main_seen_emit', slotProps.data.ID)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { FilterMatchMode } from "@primevue/core/api"
import { useTodoStore } from "~/stores/todo"

export default {
  props: {
    list: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  computed: {
    todoStore() {
      return useTodoStore()
    },
  },

  data() {
    return {
      selectedMainList: null,
      mainTodoFilter: {
        OrtakGorev: { value: null, matchMode: FilterMatchMode.CONTAINS },
        Yapilacak: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    }
  },

  methods: {
    /*
     * Surukle-birak sonrasi Sira alanlarini 1'den yeniden numaralandirip
     * listeyi state'e yaziyor. Sunucuya GONDERMIYOR -- kaydetme ayri bir
     * adim, "Change Queue" dugmesi.
     */
    onRowReorder(event) {
      const data = event.value.map((x, i) => {
        x.Sira = i + 1
        return x
      })

      this.todoStore.MUT_setTodosMainList(data)
    },
  },
}
</script>

<!--
  components/todo/MainList.vue   (Nuxt 2: components/todo/main/list.vue)

  Etiket adi <TodoMainList> -- Nuxt 2'deki ELLE kayitli adla ayni
  (plugins/components.js:335), ama bu sefer DOSYA YOLUNDAN uretiliyor.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] this.$store.commit("setTodosMainList", data)
         -> todoStore.MUT_setTodosMainList(data)

      BU SATIR EN KRITIK OLANI. Vuex'te `setTodosMainList` IKI AYRI
      seydi: bir ACTION (API'den kullanici adina gore liste ceker) ve bir
      MUTATION (verilen diziyi state'e yazar). Burada COMMIT ediliyor,
      yani MUTATION kastediliyor.

      Duz bir cevrim bunu `todoStore.setTodosMainList(data)` yapardi --
      yani ACTION'i cagirirdi. O action argumani KULLANICI ADI sanip
      API'den listeyi YENIDEN CEKERDI: kullanicinin surukleyerek yaptigi
      siralama aninda cope gider, tablo eski haline donerdi. Hata vermez,
      sadece "surukleme calismiyor" olarak gorunurdu.

      MUT_setTodosMainList pilota BU COMMIT'TE eklendi (stores/todo.ts).

  [x] import { FilterMatchMode } from "primevue/api"
         -> "@primevue/core/api"   (alt paket PrimeVue 4'te kaldirildi)

  [x] :selection + @update:selection -> v-model:selection
      :filters + @update:filters     -> v-model:filters
      (Vue 2 .sync codemod ciktisinin Vue 3 karsiligi.)

  [x] class="p-button-success w-100" -> severity="success" class="w-100"
      class="p-button-secondary"     -> severity="secondary"
      class="p-button-primary"       -> KALDIRILDI (primary zaten
                                        Button'un varsayilani)
      PrimeVue 4'te p-button-<severity> siniflari kaldirildi; sinif
      olarak birakilsa dugmeler sessizce varsayilan renkte kalirdi.

  [x] <Column ...></Column> -> <Column ... />  (ic icerik yok)

  [x] type="text" -> type="button"  ("Change Queue" dugmesinde)
      Nuxt 2'de `type="text"` yaziyordu. Bu bir <button> ogesinin type'i
      olarak GECERSIZ; tarayici gecersiz type'i "submit" olarak yorumlar.
      Dugme bir <form> icinde OLMADIGI icin bugun bir etkisi yok, ama
      ileride form icine alinsa sayfayi gonderirdi. Diger dugmeler zaten
      type="button" yaziyor -- tutarli hale getirildi.

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:
      onRowReorder, listedeki nesnelerin `Sira` alanini YERINDE
      degistiriyor (x.Sira = i + 1). Bu nesneler store'dan geliyor, yani
      prop uzerinden store state'i degistirilmis oluyor. Nuxt 2'de de
      boyleydi; davranis korundu.
-->
