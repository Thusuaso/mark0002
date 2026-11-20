<template>
  <DataTable
    :value="list"
    class="p-datatable-sm table-dense"
    showGridlines
    scrollable
    :scrollHeight="'var(--app-table-height)'"
    :loading="loading"
    v-model:filters="filters"
    filterDisplay="row"
    sortField="Tarih"
    :sortOrder="-1"
    dataKey="ID"
  >
    <template #empty>
      <p class="pl-empty">
        {{
          durum === "kullanilan"
            ? "Kullanılmış palet yok."
            : durum === "kullanilmayan"
              ? "Kullanılmamış palet yok."
              : "Henüz palet kaydı yok."
        }}
      </p>
    </template>

    <Column
      field="PaletNo"
      header="Palet No"
      :showFilterMenu="false"
      :showClearButton="false"
      bodyClass="pl-no"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          class="p-column-filter"
          @input="filterCallback()"
        />
      </template>
      <template #footer>Toplam</template>
    </Column>

    <Column field="Tarih" header="Tarih" sortable>
      <template #body="{ data }">{{ dateToString(data.Tarih) }}</template>
    </Column>

    <Column
      field="FirmaAdi"
      header="Firma"
      :showFilterMenu="false"
      :showClearButton="false"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          class="p-column-filter"
          @input="filterCallback()"
        />
      </template>
    </Column>

    <Column
      field="UrunBilgisi"
      header="Ürün Bilgisi"
      :showFilterMenu="false"
      :showClearButton="false"
      headerClass="col-details"
      bodyClass="col-details"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          class="p-column-filter"
          @input="filterCallback()"
        />
      </template>
    </Column>

    <!--
      OLCULER TEK KOLONDA: "20,30 x 40,50 x 2,00".
      Uc ayri kolon tablonun yarisini sayiya ayirirdi ve uclu olcu
      zaten BIRLIKTE okunuyor. Ayri ayri suzmek gerekirse ucu de ayri
      kolona cikarilabilir -- veri zaten ayri alanlarda geliyor.
    -->
    <Column header="En x Boy x Kalınlık" bodyClass="pl-olcu">
      <template #body="{ data }">
        {{ formatDecimal(data.En) }} × {{ formatDecimal(data.Boy) }}
        <template v-if="data.Kalinlik !== null && data.Kalinlik !== undefined">
          × {{ formatDecimal(data.Kalinlik) }}
        </template>
        <span v-else class="pl-yok" title="Kalınlık girilmemiş">× —</span>
      </template>
    </Column>

    <Column field="Adet" header="Adet" sortable bodyClass="pl-num">
      <template #footer>{{ adetToplam }}</template>
    </Column>

    <Column field="M2" header="M2" sortable bodyClass="pl-num">
      <template #body="{ data }">{{ formatDecimal(data.M2) }}</template>
      <template #footer>{{ formatDecimal(m2Toplam) }}</template>
    </Column>

    <!--
      KULLANILDI -- HEM DURUM HEM DUGME.

      Istek: "o palet kullanildiysa kullanildi yazacak ve
      isaretlenebilecek, kullanilmadiysa kullanilmadi yazacak".
      Yani hucre bir yazi (durum) ve bir isaret kutusu (eylem) birden
      tasiyor. Ikisi tek dugmede birlesti: yazinin kendisi tiklanabilir,
      yanindaki kutu da durumu gosteriyor.

      RENK TEK TASIYICI DEGIL: yazi ("Kullanıldı" / "Kullanılmadı") ve
      kutudaki tik isareti de orada.
    -->
    <Column header="Durum" bodyClass="pl-durum">
      <template #body="{ data }">
        <button
          type="button"
          class="pl-flag"
          :class="data.Kullanildi ? 'pl-flag--evet' : 'pl-flag--hayir'"
          :aria-pressed="String(!!data.Kullanildi)"
          :title="
            data.Kullanildi
              ? 'Kullanılmadı olarak işaretle'
              : 'Kullanıldı olarak işaretle'
          "
          @click="$emit('palet_used_emit', data)"
        >
          <i
            class="pi"
            :class="data.Kullanildi ? 'pi-check-square' : 'pi-stop'"
            aria-hidden="true"
          />
          {{ data.Kullanildi ? "Kullanıldı" : "Kullanılmadı" }}
        </button>
      </template>
    </Column>

    <Column header="" bodyClass="pl-islem">
      <template #body="{ data }">
        <Button
          icon="pi pi-pencil"
          severity="secondary"
          text
          size="small"
          v-tooltip.left="'Düzenle'"
          @click="$emit('palet_selected_emit', data)"
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          text
          size="small"
          v-tooltip.left="'Sil'"
          @click="$emit('palet_delete_emit', data)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { FilterMatchMode } from "@primevue/core/api"

/*
 * components/palet/List.vue  --  <PaletList>
 *
 * Palet listesi. Suzgec (Tumu / Kullanilan / Kullanilmayan) SAYFADA,
 * bu bilesende degil: suzme sunucuda yapiliyor (api/index.js
 * /palet/list) ve liste zaten suzulmus geliyor. Burada yalnizca kolon
 * bazli metin suzgecleri var.
 */
export default {
  props: {
    list: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    /* Bos liste mesajini durumuna gore yazmak icin. */
    durum: { type: String, default: "tumu" },
    m2Toplam: { type: Number, default: 0 },
    adetToplam: { type: Number, default: 0 },
  },

  emits: ["palet_selected_emit", "palet_used_emit", "palet_delete_emit"],

  data() {
    return {
      filters: {
        PaletNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
        FirmaAdi: { value: null, matchMode: FilterMatchMode.CONTAINS },
        UrunBilgisi: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    }
  },
}
</script>

<style scoped>
.pl-empty {
  margin: 0;
  padding: 1.5rem 0;
  text-align: center;
  color: #6b7280;
}

.pl-no {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}

.pl-num,
.pl-olcu {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.pl-num {
  text-align: right;
}

.pl-yok {
  color: #9ca3af;
}

.pl-durum,
.pl-islem {
  white-space: nowrap;
}

/*
 * Durum dugmesi: 32px dokunma yuksekligi. Satir yuksekligini
 * artirmasin diye dolgu dar; .table-dense satirlari zaten sik.
 */
.pl-flag {
  display: inline-flex;
  gap: 0.35rem;
  align-items: center;

  min-height: 30px;
  padding: 0.1rem 0.6rem;

  font: inherit;
  font-weight: 600;

  background: none;
  border: 1px solid transparent;
  border-radius: 999px;
  cursor: pointer;
}

.pl-flag .pi {
  font-size: 0.8rem;
}

.pl-flag--evet {
  color: #0f766e;
  background: #e3f2ef;
  border-color: #b9ded6;
}

.pl-flag--hayir {
  color: #92400e;
  background: #fef3c7;
  border-color: #f3dca0;
}

.pl-flag:hover {
  filter: brightness(0.96);
}
</style>
