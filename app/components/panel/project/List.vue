<template>
  <div>
    <!--
      `:value.sync="list"` -> DUZ `:value`.
      Kaynakta .sync vardi ama PrimeVue DataTable `update:value`
      OLAYINI HIC YAYMIYOR, yani .sync bugune kadar tetiklenmedi ve
      `list` (bir PROP) hic atanmadi -- olu bir baglamaydi.
      Codemod onu mekanik olarak `v-model:value`ya cevirdi ve Vue 3
      derleyicisi "prop uzerinde v-model" diye DERLEMEYI DUSURDU.
      Davranis-esdeger dogru bicim bu.

      YORUM ETIKETIN ICINDEYDI (`<DataTable` ile `>` arasinda) ve HTML'de
      bu MUMKUN DEGIL: derleyici yorumu oznitelik sanmadi, metin olarak
      SAYFAYA BASTI -- ekranda tablo basliklarinin ustunde ham yorum
      metni goruluyordu. Etiketin DISINA alindi.
    -->
    <DataTable
      v-model:editingRows="editingRows"
      :value="list"
      editMode="row"
      dataKey="Queue"
      @row-edit-save="onRowEditSave"
      :pt="{
        table: { style: 'min-width: 50rem' },
        column: {
          bodycell: ({ state }) => ({
            style:
              state['d_editing'] &&
              'padding-top: 0.6rem; padding-bottom: 0.6rem',
          }),
        },
      }"
      selectionMode="single"
      @row-click="$emit('panel_project_selected_emit', $event.data.ID)"
      :reorderableColumns="true"
      @row-reorder="colReOrderProject"
      v-model:filters="filterProjects"
      filterDisplay="row"
      sortField="Queue"
      :sortOrder="1"
      style="font-size: 80%"
    >
      <Column field="Queue" header="Queue" style="width: 20%">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>
      <Column
        field="ID"
        header="Id"
        :showFilterMenu="false"
        :showClearButton="false"
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
        field="ProjectName"
        header="Project (En)"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
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
        field="ProjectName_Fr"
        header="Project (Fr)"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
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
        field="ProjectName_Es"
        header="Project (Es)"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
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
        field="ProjectName_Ru"
        header="Project (Ru)"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
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
        field="ProjectName_Ar"
        header="Project (Ar)"
        :showFilterMenu="false"
        :showClearButton="false"
      >
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
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
        field="CountryName"
        header="Country"
        :showFilterMenu="false"
        :showClearButton="false"
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
      <Column>
        <template #body="slotProps">
          <img :src="slotProps.data.Image" width="150" height="150" lazyload />
        </template>
      </Column>
      <Column field="VideoStatus" header="Video Status">
        <template #body="slotProps">
          <div v-if="slotProps.data.VideoStatus">Yes</div>
          <div v-else>No</div>
        </template>
      </Column>
      <Column
        :rowEditor="true"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></Column>
    </DataTable>

    <!-- <DataTable
      :value="list"
      v-model:selection="selectedPanelProject"
      selectionMode="single"
      @row-click="$emit('panel_project_selected_emit', $event.data.ID)"
      :reorderableColumns="true"
      @row-reorder="colReOrderProject"
      v-model:filters="filterProjects"
      filterDisplay="row"
      sortField="Queue"
      :sortOrder="1"
    >
      <Column
        :rowReorder="true"
        :headerStyle="{ width: '4rem' }"
        :reorderableColumn="false"
      />
      <Column
        field="ID"
        header="Id"
        :showFilterMenu="false"
        :showClearButton="false"
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
        field="Queue"
        header="Queue"
        :showFilterMenu="false"
        :showClearButton="false"
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
        field="ProjectName"
        header="Project (En)"
        :showFilterMenu="false"
        :showClearButton="false"
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
        field="ProjectName_Fr"
        header="Project (Fr)"
        :showFilterMenu="false"
        :showClearButton="false"
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
        field="ProjectName_Es"
        header="Project (Es)"
        :showFilterMenu="false"
        :showClearButton="false"
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
        field="ProjectName_Ru"
        header="Project (Ru)"
        :showFilterMenu="false"
        :showClearButton="false"
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
        field="CountryName"
        header="Country"
        :showFilterMenu="false"
        :showClearButton="false"
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
      <Column>
        <template #body="slotProps">
          <img :src="slotProps.data.Image" width="150" height="150" lazyload />
        </template>
      </Column>
      <Column field="VideoStatus" header="Video Status">
        <template #body="slotProps">
          <div v-if="slotProps.data.VideoStatus">Yes</div>
          <div v-else>No</div>
        </template>
      </Column>
    </DataTable> -->
  </div>
</template>
<script>
import { FilterMatchMode } from "@primevue/core/api";
import { usePanelStore } from "~/stores/panel"

export default {
  computed: {
    panelStore() {
      return usePanelStore()
    },
  },

  props: {
    list: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      editingRows: [],
      selectedPanelProject: null,
      filterProjects: {
        ID: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Queue: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ProjectName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ProjectName_Fr: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ProjectName_Es: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ProjectName_Ru: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        ProjectName_Ar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        CountryName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    onCellEditComplete() {},
    /*
     * DUZELTILDI -- BASARISIZLIK SESSIZDI: kaynakta .catch() YOKTU.
     * Istek patlarsa kullanici ne hata gorur ne de liste tazelenir;
     * ekranda eski sira durmaya devam eder ve kullanici degisikligin
     * kaydedildigini sanir.
     */
    async onRowEditSave(event) {
      try {
        await useLegacyApi().post("/panel/project/queue/changing", {
          body: event,
        })
        useAppToast().success("Project queue updated successfully")
        this.panelStore.setPanelProjectList()
      } catch (err) {
        console.error("proje sirasi guncellenemedi:", err)
        useAppToast().error("Project queue could not be updated")
      }
    },
    colReOrderProject(event) {
      let index = 1;
      const data = [];
      event.value.forEach((x) => {
        x.Queue = index;
        data.push(x);
        index++;
      });
      /* MUT_ ZORUNLU: kaynakta commit'ti (mutation). Duz bir cevrim ayni
       * adli ACTION'a baglardi -- o da listeyi SUNUCUDAN yeniden ceker,
       * yani kullanicinin surukleyerek yaptigi yeni sira aninda geri
       * alinmis gorunurdu. */
      this.panelStore.MUT_setPanelProjectList(data);
    },
  },
};
</script>
