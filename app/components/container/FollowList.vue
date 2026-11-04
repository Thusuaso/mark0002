<template>
  <div>
    <DataTable
      :value="list"
      v-model:filters="filters1"
      filterDisplay="row"
      v-model:selection="selectedFollow"
      selectionMode="single"
      @row-click="followSelected($event)"
      paginator
      :rows="10"
    >
      <Column
        field="MusteriAdi"
        header="Customer"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="SiparisNo"
        header="Po"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <!-- Liste sunucudan yukleme tarihine gore (yeniden eskiye) gelir;
           baslik tiklanarak yon degistirilebilir. -->
      <Column
        field="YuklemeTarihi"
        header="Shipment Date"
        :sortable="true"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ dateToString(slotProps.data.YuklemeTarihi) }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="KonteynerNo"
        header="Container No"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="Line"
        header="Line"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />

      <Column
        field="Eta"
        header="Est. Date"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ dateToString(slotProps.data.Eta) }}
        </template>
      </Column>

      <Column
        field="Kalan"
        header="Time to Arrival"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />

      <Column header="#" headerClass="tableHeader" bodyClass="tableBody">
        <template #body="slotProps">
          <div
            v-if="
              slotProps.data.KonsimentoDurum == null ||
              !slotProps.data.KonsimentoDurum
            "
          >
            Not Sent
          </div>
          <div v-else>Sent</div>
        </template>
      </Column>

      <Column
        field="AktarmaLimanAdi"
        header="Port"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />

      <!--
        Yuklemenin yapildigi acente. Takip adresi varsa konteyner
        numarasiyla birlikte yeni sekmede acilan link gosterilir.

        @click.stop ZORUNLU: DataTable satir tiklamasini dinliyor
        (@row-click -> followSelected) ve link tiklamasi satira da
        yayilirsa ayni anda hem yeni sekme acilir hem duzenleme
        dialogu patlar.
      -->
      <Column
        field="AcenteAdi"
        header="Agency"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          <a
            v-if="slotProps.data.TakipLinki"
            :href="slotProps.data.TakipLinki"
            target="_blank"
            rel="noopener noreferrer"
            @click.stop
          >
            {{ slotProps.data.AcenteAdi }}
            <i class="pi pi-external-link" style="font-size: 0.7rem"></i>
          </a>
          <span v-else>{{ slotProps.data.AcenteAdi || "-" }}</span>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>

      <Column
        field="Sorumlu"
        header="Seller"
        :showFilterMenu="false"
        :showClearButton="false"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @input="filterCallback()"
            class="p-column-filter"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { FilterMatchMode } from "@primevue/core/api"

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
      filters1: {
        MusteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuklemeTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KonteynerNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Sorumlu: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        AcenteAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      selectedFollow: null,
    }
  },

  methods: {
    followSelected(event) {
      this.$emit("follow-selected-dialog-emit", event.data)
    },
  },
}
</script>

<!--
  components/container/FollowList.vue
  (Nuxt 2: components/container/follow/list.vue)

  Etiket adi <ContainerFollowList>. Nuxt 2'de ad `containerFollowList`
  idi (plugins/components.js:253, ELLE kayit) -- tesaduf eseri ayni ada
  cikiyor, ama bu sefer DOSYA YOLUNDAN uretiliyor.

  Bu bilesen IKI sayfada da ayni sekilde kullaniliyor
  (operation/follow.vue takip listesini, operation/unfollow.vue takipsiz
  listesini veriyor); tek fark hangi getter'in prop olarak gectigi.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] import { FilterMatchMode } from "primevue/api"
         -> "@primevue/core/api"
      Alt paket "primevue/api" PrimeVue 4'te TAMAMEN kaldirildi; eski yol
      derlemeyi "Failed to resolve import" ile dusurur.

  [x] :filters   + @update:filters   -> v-model:filters
      :selection + @update:selection -> v-model:selection
      Nuxt 2'deki hali Vue 2 .sync codemod ciktisiydi; Vue 3'te dogru
      yazim v-model:<ad>.

  [x] responsiveLayout="scroll" KALDIRILDI.
      PrimeVue 4'te bu prop YOK (v3'teki "scroll" davranisi artik
      varsayilan). Vue tanimadigi prop'u kok ogeye DOM attribute'u olarak
      duser -- zararsiz ama olu.

  [x] <Column ...></Column> -> <Column ... />  (ic icerik olmayan ucu)

  [x] props.list -> `default: () => []`
      Nuxt 2'de default YOKTU, yani veri gelene kadar DataTable
      :value="undefined" aliyordu.

  NOT: dateToString global (app/plugins/formatters.ts) ve GOSTERIM bicimi
  uretiyor -> "02-10-2026". Burada iki kolonda yalnizca gosteriliyor,
  dogru olan bu. API'ye tarih YAZAN taraf FollowForm.vue ve orada
  utils/dates.ts'ten toIsoDate kullaniliyor.
-->
