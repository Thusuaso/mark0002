<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <Button
            severity="warn"
            label="Excel"
            @click="excel_output"
          />
        </div>
        <div class="col">
          <Button
            severity="info"
            label="Collection"
            @click="collectionClick"
          />
        </div>
      </div>
    </div>

    <ReportsMekmerFinanceList
      :list="financeStore.getFinanceListFilter"
      :total="financeStore.getFinanceTotalListMekmer"
      :expiry="financeStore.getFinanceExpiryList"
      :allStatus="buttonAllStatus"
      :allList="financeStore.getFinanceListAll"
      @finance_list_selected_mekmer_emit="financeListSelected($event)"
      :loading="sharedStore.isLoading"
      :maya="financeStore.getFinanceListMaya"
      :status="false"
    />

    <div class="row">
      <div class="row">
        <div class="col-sm-6">
          <Select
            class="w-100"
            v-model="selectedMonth"
            :options="months"
            optionLabel="name"
            @change="monthSelected($event)"
          />
        </div>
        <div class="col-sm-6">
          <Button
            type="button"
            severity="info"
            class="w-100"
            icon="pi pi-file-excel"
            label="Excel"
            @click="exportMekmarFinance"
          />
        </div>
      </div>
      <div class="col-12">
        <DataTable
          :value="monthly_mekmar_finance_list"
          scrollable
          scrollHeight="600px"
          v-model:selection="selectedMonthlyFinance"
          selectionMode="single"
          @row-select="financeMonthlySelected($event)"
          sortField="yuklemetarihi"
          :sortOrder="-1"
        >
          <template #header>
            MEKMAR => MEKMER DEN SATIN ALDIĞI ÜRÜNLERİN BEDELLERİ
          </template>
          <Column
            field="siparisno"
            header="Purchase Order"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ slotProps.data.siparisno }}
            </template>
          </Column>
          <Column
            field="yuklemetarihi"
            header="Shipment Date"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ dateToString(slotProps.data.yuklemetarihi) }}
            </template>
          </Column>
          <Column
            field="toplam"
            header="Order Total USD"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.toplam) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(mekmarListTotal.order) }}
            </template>
          </Column>
          <Column
            field="iscilik"
            header="Labour"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.iscilik) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(mekmarListTotal.labour) }}
            </template>
          </Column>
          <Column
            field="kalan"
            header="Balance"
            headerClass="tableHeader"
            bodyClass="tableBody"
          >
            <template #body="slotProps">
              <div
                :style="{
                  backgroundColor:
                    slotProps.data.kalan > 8 ? 'green' : 'transparent',
                  color: slotProps.data.kalan > 8 ? 'white' : 'black',
                }"
              >
                {{ formatPriceUsd(slotProps.data.kalan) }}
              </div>
            </template>
            <template #footer>
              {{ formatPriceUsd(mekmarListTotal.balanced) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <Dialog
      v-model:visible="finance_collection_list_form"
      header=""
      modal
      :maximizable="true"
    >
      <ReportsMekmerFinanceCollectionList
        :list="financeStore.getFinanceCollectionList"
        :years="financeStore.getFinanceCollectionYearList"
        :months="financeStore.getFinanceCollectionMonthList"
        :total="financeStore.getFinanceCollectionTotal"
        :loading="sharedStore.isLoading"
        :sample="financeStore.getFinanceCollectionSampleList"
        :sampleTotal="financeStore.getFinanceCollectionSampleTotal"
      />
    </Dialog>
    <Dialog v-model:visible="finance_advanced_payment_form" header="" modal>
      <ReportsMekmerFinanceAdvancePaymentForm
        :list="financeStore.getFinanceAdvancedPaymentList"
        :model="modelsStore.getFinancePaymentModel"
        @advanced_payment_save_emit="advancesPaymentSave($event)"
      />
    </Dialog>
    <Dialog v-model:visible="finance_po_list_form" header="" modal>
      <ReportsMekmerFinancePoList
        :poList="financeStore.getFinancePoList"
        :paidList="financeStore.getFinancePaidList"
        :poListTotal="financeStore.getFinancePoListTotal"
        :paidListTotal="financeStore.getFinancePaidListTotal"
        @po_list_selected_emit="poListSelected($event)"
        @po_paid_detail_list_selected_emit="poPaidDetailListSelected($event)"
        :loading="sharedStore.isLoading"
        @paid_selected_emit="paidDetailSelected($event)"
      />
    </Dialog>
    <Dialog v-model:visible="finance_po_detail_form" header="" modal>
      <ReportsMekmerFinancePoForm
        :model="modelsStore.getFinancePoModelMekmer"
        :po="finance_po_list_detail"
        @po_paid_process_emit="poPaidProcess($event)"
        :poPaidList="financeStore.getFinancePoPaidListMekmer"
        @po_paid_delete_emit="poPaidDelete($event)"
      />
    </Dialog>
    <Dialog v-model:visible="finance_po_paid_detail_form" header="" modal>
      <ReportsMekmerFinancePaidList
        :list="financeStore.getFinancePoPaidDetailList"
      />
    </Dialog>
    <Dialog
      v-model:visible="finance_mekmar_form"
      header=""
      modal
      contentStyle="width:1200px;height:700px"
    >
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div class="row m-auto text-center">
        <div class="col-sm-6">
          <CustomInput
            :value="model.balanced"
            text="Balanced"
            @onInput="model.balanced = $event"
            :disabled="true"
          />
        </div>
        <div class="col-sm-6">
          <FloatLabel>
            <DatePicker
              v-model="paid_date"
              inputId="date"
              @date-select="paidDateSelected($event)"
              dateFormat="dd/mm/yy"
            />
            <label for="date">Date</label>
          </FloatLabel>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div class="row m-auto text-center">
        <div class="col-sm-3">
          <CustomInput
            :value="model.paid"
            text="Paid Amount"
            @onInput="model.paid = $event"
            :disabled="false"
          />
        </div>
        <div class="col-sm-3">
          <CustomInput
            :value="model.cost"
            text="Cost"
            @onInput="model.cost = $event"
            :disabled="false"
          />
        </div>
        <div class="col-sm-3">
          <CustomInput
            :value="model.currency"
            text="Rate"
            @onInput="model.currency = $event"
            :disabled="false"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Button
            type="button"
            severity="success" class="w-100"
            label="Save"
            @click="saveFinanceMekmar"
          />
        </div>
      </div>
    </Dialog>
    <Dialog v-model:visible="po_paid_detail_list_dialog_visible" header="" modal>
      <DataTable
        :value="poPaidDetailList"
        responsiveLayout="scroll"
        v-model:selection="selectedPoPaidDetailList"
        selectionMode="single"
        @row-click="poPaidDetailListSelectedDataTable($event)"
      >
        <Column field="Tarih" header="Date">
          <template #body="slotProps">
            {{ dateToString(slotProps.data.Tarih) }}
          </template>
        </Column>
        <Column field="SiparisNo" header="Po"></Column>
        <Column field="Aciklama" header="Desc."></Column>
        <Column field="Tutar" header="Paid">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Tutar) }}
          </template>
        </Column>
        <Column field="Masraf" header="Currency">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Masraf) }}
          </template>
        </Column>
        <Column field="Kur" header="Currency">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Kur) }}
          </template>
        </Column>
      </DataTable>
    </Dialog>
    <Dialog
      v-model:visible="po_paid_detail_list_detail_dialog_visible"
      header=""
      modal
    >
      <div class="row m-auto text-center mt-5 mb-5">
        <div class="col">
          <DatePicker v-model="modelPaidPo.Tarih" />
        </div>
        <div class="col">
          <CustomInput
            :value="modelPaidPo.Tutar"
            text="Paid"
            @onInput="model.Tutar = $event"
          />
        </div>
        <div class="col">
          <CustomInput
            :value="modelPaidPo.Masraf"
            text="Cost"
            @onInput="model.Masraf = $event"
          />
        </div>
        <div class="col">
          <CustomInput
            :value="modelPaidPo.Kur"
            text="Currency"
            @onInput="model.Currency = $event"
          />
        </div>
        <div class="col">
          <Textarea v-model="modelPaidPo.Aciklama" rows="5" cols="30" />
        </div>
      </div>
      <div class="row m-auto text-center mt-5">
        <div class="col">
          <Button
            severity="success" class="w-100"
            label="Update"
            @click="updatePoPaid"
          />
        </div>
        <div class="col">
          <Button
            severity="danger" class="w-100"
            label="Delete"
            @click="deletePoPaid"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import { toIsoDate } from "~/utils/dates"
import { useFinanceStore } from "~/stores/finance"
import { useModelsStore } from "~/stores/models"
import { useSharedStore } from "~/stores/shared"


export default {
  computed: {
    financeStore() {
          return useFinanceStore()
        },
        modelsStore() {
          return useModelsStore()
        },
        sharedStore() {
          return useSharedStore()
        },
  },
  data() {
    return {
      poPaidDetailSelectedList: {},
      po_paid_detail_list_detail_dialog_visible: false,
      selectedPoPaidDetailList: {},
      po_paid_detail_list_dialog_visible: false,
      poPaidDetailList: [],
      getFinanceMekmerToMekmarFields: [
        { label: "Po", field: "siparisno" },
        { label: "Shipped Date", field: "yuklemetarihi" },
        { label: "Order", field: "toplam" },
        { label: "Labour", field: "iscilik" },
        { label: "Balanced", field: "kalan" },
      ],
      paid_date: null,
      selectedMonthlyFinance: null,
      monthly_mekmar_finance_list: [],
      /*
       * [x] KALDIRILDI: ikinci bir `finance_collection_list_form: false`
       * girisi. data() icinde ayni anahtar IKI KEZ tanimliydi; JS nesne
       * literalinde SONRAKI kazanir, yani ilki olu koddu. Iki deger de
       * false oldugu icin davranis degismiyor -- ama yinelenen anahtar
       * sessizdir (ne derleme ne calisma hatasi) ve biri degistirilse
       * digeri sessizce yok sayilirdi. Ayni hata order/models store'unda
       * da vardi (bkz. verify-stores'un yinelenen anahtar kontrolu).
       */
      checked: "Mekmer",
      mekmarMekmerList: false,
      buttonAllStatus: false,
      finance_collection_list_form: false,
      finance_advanced_payment_form: false,
      finance_po_detail_form: false,
      finance_po_list_detail: {},
      finance_po_list_form: false,
      finance_po_paid_detail_form: false,
      customerId: 0,
      financeListExcelFields: {
        "Firma Adı": "FirmaAdi",
        "Toplam Sipariş": "TotalOrder",
        "Üretimdeki Siparişler": "ProductOrder",
        "Yüklenen Siparişler": "ForwardingOrder",
        Peşinat: "AdvancedPayment",
        Ödenen: "Paid",
        Bakiye: "BalancedProduction",
        "Bakiye (Üretim Hariç)": "Balanced",
      },
      months: [
        { id: 1, name: "January" },
        { id: 2, name: "February" },
        { id: 3, name: "March" },
        { id: 4, name: "April" },
        { id: 5, name: "May" },
        { id: 6, name: "June" },
        { id: 7, name: "July" },
        { id: 8, name: "August" },
        { id: 9, name: "September" },
        { id: 10, name: "October" },
        { id: 11, name: "November" },
        { id: 12, name: "December" },
      ],
      selectedMonth: {},
      mekmarListTotal: {
        order: 0,
        labour: 0,
        balanced: 0,
      },
      finance_mekmar_form: false,
      model: {
        balanced: 0,
        paid: 0,
        cost: 0,
        currency: 0,
        date: "",
        po: "",
        customer: 0,
      },
      modelPaidPo: {
        ID: 0,
        Tarih: "",
        Aciklama: "",
        Tutar: 0,
        Masraf: 0,
        Kur: 0,
      },
    };
  },
  mounted() {
    this.financeStore.setFinanceListFilter();
    const date = new Date();
    const month = date.getMonth() + 1;
    this.selectedMonth = this.months.find((x) => x.id == month);
    this.loadMonthlyMekmarFinance(month);
  },
  methods: {
    /*
     * <vue-excel-xlsx> KARSILIGI.
     *
     * O bileşen Vue 2'ye bagli (Vue.component ile kayitli bir eklenti) ve
     * pilota KURULMADI; Vue 3'te calismaz. Yaptigi is, :data dizisini
     * :columns ({ label, field }) eslemesine gore bir xlsx dosyasina
     * yazip indirmekti -- aynisi burada xlsx paketiyle yapiliyor
     * (paket zaten kurulu: package.json "xlsx": ^0.18.5, ayni yontem
     * reports/mekmer/calculating-cost.vue'da da kullaniliyor).
     *
     * Kolon tanimi KORUNDU: data().getFinanceMekmerToMekmarFields.
     * Dosya adi da orijinalle ayni: :file-name="'Finance'" -> Finance.xlsx
     */
    async exportMekmarFinance() {
      const XLSX = await import("xlsx")

      const columns = this.getFinanceMekmerToMekmarFields
      const rows = this.monthly_mekmar_finance_list || []

      const aoa = [columns.map((c) => c.label)]
      for (const row of rows) {
        aoa.push(columns.map((c) => row[c.field] ?? ""))
      }

      const ws = XLSX.utils.aoa_to_sheet(aoa)
      ws["!cols"] = columns.map(() => ({ wch: 18 }))

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, "sheetname")
      XLSX.writeFile(wb, "Finance.xlsx")
    },
    deletePoPaid() {
      if (confirm("Are you sure you want to delete")) {
        useLegacyApi()
          .delete(
            `/finance/mekmer/paid/detail/list/delete/${this.modelPaidPo.ID}`
          )
          .then((res) => {
            if (res.data.status) {
              useAppToast().success("Silme işlemi başarıyla gerçekleştirildi.");
            } else {
              useAppToast().error("Silme işlemi başarısız.");
            }
          });
      }
    },
    updatePoPaid() {
      useLegacyApi()
        .put("/finance/mekmer/paid/detail/list/update", this.modelPaidPo)
        .then((res) => {
          if (res.data.status) {
          }
        });
    },
    poPaidDetailListSelectedDataTable(event) {
      this.poPaidDetailSelectedList = event.data;
      this.modelPaidPo.ID = event.data.ID;
      this.modelPaidPo.Tarih = toIsoDate(event.data.Tarih);
      this.modelPaidPo.Aciklama = event.data.Aciklama;
      this.modelPaidPo.Tutar = event.data.Tutar;
      this.modelPaidPo.Masraf = event.data.Masraf;
      this.modelPaidPo.Kur = event.data.Kur;

      this.po_paid_detail_list_detail_dialog_visible = true;
    },
    paidDetailSelected(event) {
      useLegacyApi()
        .get(
          `/finance/mekmer/paid/detail/list/${event.tarih}/${this.customerId}`
        )
        .then((res) => {
          this.poPaidDetailList = res.data.list;
          this.po_paid_detail_list_dialog_visible = true;
        });
    },
    saveFinanceMekmar() {
      /*
       * Artik Python'daki excel sunucusundan DEGIL, Nitro'dan:
       * server/routes/finance-api/mekmar/po-paid-save.post.ts
       *
       * [x] `if (res)` -> `if (res.status)` DUZELTILDI.
       *     `res` her zaman bir nesne oldugu icin eski kosul ASLA
       *     yanlisa dusmuyordu: Python {"status": false} donse bile
       *     kullaniciya "Success" gosteriliyor ve liste bosuna
       *     yenileniyordu. Basarisiz kayit hic fark edilmiyordu.
       */
      /*
       * $fetch + baseURL "/" KULLANILIYOR, useApi() DEGIL: useApi()'nin
       * baseURL'i "/api" (legacy Express). Nitro rotalari kokte.
       */
      $fetch("/finance-api/mekmar/po-paid-save", {
        baseURL: "/",
        method: "POST",
        body: this.model,
      }).then((res) => {
        if (res.status) {
          useAppToast().success("Success");
          /*
           * DUZELTILDI -- TOPLAMLAR SIFIRLANMIYORDU: burada liste
           * yeniden okunuyor ama mekmarListTotal'a EKLENIYORDU; yani
           * kayittan sonra footer toplamlari IKI KATINA cikiyordu
           * (her kayitta bir kat daha). loadMonthlyMekmarFinance
           * toplamlari once sifirliyor.
           */
          this.loadMonthlyMekmarFinance(this.selectedMonth.id);
        } else {
          useAppToast().error("Error");
        }
      });
    },
    paidDateSelected(event) {
      this.model.date = toIsoDate(event);
      /*
       * Kur artik EXCEL SUNUCUSUNDAN DEGIL, Nitro'dan geliyor:
       * server/routes/tcmb-api/usd/[kind]/[year]/[month]/[day].get.ts
       * (Python tarafindan kurtulma planinin 2. adimi).
       *
       * year/month/day hesabi KALKTI -- useTcmb() tarihi kendisi
       * parcaliyor; hafta sonu/tatil icin geriye yurume de sunucuda.
       *
       * DUZELTILDI -- .catch() YOKTU: Excel sunucusu ulasilamazsa
       * kullanici hicbir sey gormuyor ve kur ESKI degerinde kaliyordu;
       * sonra kaydederse YANLIS kurla kayit olusuyordu.
       */
      useTcmb()
        .getUSDRate(event, "banknote")
        .then(({ rate }) => {
          this.model.currency = parseFloat(rate);
        })
        .catch((err) => {
          console.error("kur alinamadi:", err);
          useAppToast().error("Döviz kuru alınamadı.");
        });
    },
    monthSelected(event) {
      this.loadMonthlyMekmarFinance(event.value.id);
    },

    /*
     * Aylik MEKMAR->MEKMER siparis listesi. Artik EXCEL SUNUCUSUNDAN
     * DEGIL, Nitro'dan:
     * server/routes/finance-api/mekmer/monthly-orders/[month].get.ts
     * (Python tarafindan kurtulma planinin 2. adimi).
     *
     * [x] UC AYNI BLOK TEK YERE ALINDI: mounted, ay secimi ve kayit
     *     sonrasi yenileme ayni istegi + ayni toplama dongusunu
     *     kopyaliyordu, ve ucu de BIRBIRINDEN FARKLIYDI (biri toplami
     *     sifirliyor, biri sifirlamiyor, biri disinda sifirliyordu).
     *
     * [x] .catch() EKLENDI: hicbirinde yoktu; istek patlarsa tablo eski
     *     ayin verisiyle kaliyor ama basliktaki ay YENI ayi gosteriyordu
     *     -- kullanici yanlis ayin verisine bakiyor ve bunu bilmiyordu.
     *
     * DIKKAT -- SUNUCU YILI KENDI BELIRLIYOR: sorgu YEAR(GETDATE())
     * kullaniyor, yani her zaman icinde bulunulan yil. Ay secimi gecen
     * yila GIDEMEZ. Python'da da boyleydi.
     */
    loadMonthlyMekmarFinance(month) {
      this.mekmarListTotal.order = 0;
      this.mekmarListTotal.labour = 0;
      this.mekmarListTotal.balanced = 0;

      $fetch(`/finance-api/mekmer/monthly-orders/${month}`, { baseURL: "/" })
        .then(({ list }) => {
          this.monthly_mekmar_finance_list = list;

          for (const row of list) {
            this.mekmarListTotal.order += row.toplam;
            this.mekmarListTotal.labour += row.iscilik;
            this.mekmarListTotal.balanced += row.kalan;
          }
        })
        .catch((err) => {
          console.error("aylik mekmar listesi alinamadi:", err);
          useAppToast().error("Aylık liste alınamadı.");
        });
    },
    collectionClick() {
      this.financeStore.setFinanceCollectionListMekmer();
      this.finance_collection_list_form = true;
    },
    checkedMekmarMekmer(event) {
      if (this.mekmarMekmerList) {
        this.checked = "Mekmar";
        this.financeStore.setFinanceListFilter();
      } else {
        this.checked = "Mekmer";
        this.financeStore.setFinanceList();
      }
    },
    /*
     * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
     *   eski: POST {excelServerBase}/finance/reports/test/excel/mekmer (uret)
     *       + GET  ayni adres                                          (indir)
     *   yeni: POST /excel-api/finance/test-mekmer                      (tek istek)
     *         server/routes/excel-api/finance/test-mekmer.post.ts
     *
     * ESKI AKISTAKI UC SORUN:
     *   - `if (response.status)` HTTP durumunu (daima 200) okuyordu,
     *     sunucunun govdede dondurdugu {"status": false}'u DEGIL; yani
     *     uretim patlasa bile indirme tetikleniyordu.
     *   - Indirme ayri bir GET oldugu icin, Python tarafinda bu uc ile
     *     /finance/reports/test/excel ucu AYNI dosyayi paylasiyordu
     *     (excel/dosyalar/finans_test_list.xlsx) -- Mekmar raporu alan
     *     baska bir kullanici bu kullanicinin dosyasini EZIYORDU.
     *   - Olusturulan <a> DOM'dan hic kaldirilmiyordu.
     *
     * localStore artik bu metot icin gerekmiyor (getLocalUrl'in tek
     * kullanim yeri buydu).
     */
    async excel_output() {
      try {
        await exportExcel(
          "/excel-api/finance/test-mekmer",
          this.financeStore.getFinanceListFilter,
          "finans_test_list.xlsx",
        );
      } catch (err) {
        console.error("mekmer finans excel ciktisi basarisiz:", err);
        useAppToast().error("Excel olusturulamadi.");
      }
    },
    poPaidDetailListSelected(event) {
      const data = {
        Tarih: toIsoDate(event.data.Tarih),
        MusteriID: this.customerId,
      };
      this.financeStore.setPoPaidDetailList(data);
      this.finance_po_paid_detail_form = true;
    },
    poPaidDelete(event) {
      if (confirm("Silme İşlemini Onaylıyor musunuz?")) {
        this.financeStore.setPoPaidDeleteMekmer(event);
        const data = {
          description:
            this.$cookie.get("username") +
            ", " +
            event.siparisno +
            " na sahip $" +
            event.tutar +
            " tutar, $" +
            event.masraf +
            " masraf ve $" +
            event.kur +
            " sildi.",
          po: event.siparisno,
          color: "#ffec31",
        };
        this.$logs.save(data);
      }
    },
    poPaidProcess(event) {
      if (this.financeStore.getFinancePoButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    save(event) {
      this.financeStore.setPoPaidMekmerSave(event);
      const data = {
        description:
          this.$cookie.get("username") +
          ", " +
          event.siparisno +
          " ya  $" +
          event.tutar +
          " tutar, $" +
          event.masraf +
          " masraf ve $" +
          event.kur +
          " kur girişi yaptı.",
        po: event.siparisno,
        color: "#ffec31",
      };
      this.$logs.save(data);
    },
    update(event) {
      this.financeStore.setPoPaidUpdateMekmer(event);
      const data = {
        description:
          this.$cookie.get("username") +
          ", " +
          event.siparisno +
          " nın $" +
          event.tutar +
          " tutar, $" +
          event.masraf +
          " masraf ve $" +
          event.kur +
          " kurunu değiştirdi.",
        po: event.siparisno,
        color: "#ffec31",
      };
      this.$logs.save(data);
    },
    poListSelected(event) {
      this.finance_po_list_detail = event.data;
      this.finance_po_detail_form = true;
      this.financeStore.setFinancePoPaidListMekmer(event.data.siparisno);
    },
    financeListSelected(event) {
      this.customerId = event.data.customer_id;
      this.financeStore.setFinancePoMekmerList(event.data.customer_id);
      this.finance_po_list_form = true;
    },
    advancesPaymentSave(event) {
      this.financeStore.setAdvancedPaymentSaveMekmer(event);
    },
    advancedPayment() {
      this.financeStore.setFinanceAdvancedPaymentListMekmer();
      this.modelsStore.setFinancePaymentModel();
      this.finance_advanced_payment_form = true;
    },
    financeMonthlySelected(event) {
      this.finance_mekmar_form = true;
      this.model.customer = event.data.musteri_id;
      this.model.po = event.data.siparisno;
      this.model.balanced = event.data.kalan;
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 576px) {
  .row {
    clear: both;
    display: block;
    width: 100%;
  }
  .col {
    clear: both;
    display: block;
    width: 100%;
  }
}
</style>

<!--
  pages/reports/mekmer/finance.vue

  BAGIMLILIK ZINCIRI (hepsi bu adimda tasindi):
    store/modules/finance.js                    -> app/stores/finance.ts (976 satir)
    .../finance/lists/list.vue        (financeListMekmer)
        -> components/reports/mekmer/FinanceList.vue
    .../finance/lists/po.vue          (financePoListMekmer)
        -> components/reports/mekmer/FinancePoList.vue
    .../finance/forms/po.vue          (financePoFormMekmer)
        -> components/reports/mekmer/FinancePoForm.vue
    .../finance/lists/collection.vue  (financeCollectionListMekmer)
        -> components/reports/mekmer/FinanceCollectionList.vue
    .../finance/forms/advancepayment.vue (financeAdvancedPaymentFormMekmer)
        -> components/reports/mekmer/FinanceAdvancePaymentForm.vue
    .../finance/lists/paid.vue        (FinancePaidListMekmer)
        -> components/reports/mekmer/FinancePaidList.vue

  Bilesen dosya adlari DUZLESTIRILDI (lists/forms alt klasorleri kalkti):
  auto-import adi yoldan uretildigi icin eski yol
  `ReportsMekmerFinanceListsList` gibi adlar verirdi. Yeni adlar
  kardeslerinin kalibina uyuyor (ReportsMekmerStockList, ...).

  TASIMA YOLU: elle yeniden yazilmadi; tools/codemods/vue2-to-vue3.mjs +
  codemod-float-label.mjs uygulandi, sonra codemod'un "ELLE YAPILACAK"
  listesi kapatildi. Store icin vuex-to-pinia.mjs kullanildi.

  ELLE KAPATILANLAR (sayfa):
  [x] mapGetters(26 getter) -> store computed'leri. Getter'lar UC AYRI
      store'a dagiliyor; Vuex namespaced OLMADIGI icin sayfa hepsini tek
      isim uzayindan okuyordu:
        24 getter -> finance.ts
         getFinancePaymentModel / getFinancePoModelMekmer -> models.ts
         getLocalUrl -> local.ts
         getLoading  -> shared.ts, ama ADI DEGISTI: isLoading
           (Vuex'te boolean'di, pilotta SAYAC ve getter `loading > 0`)
      mapGetters'da olup sayfada HIC kullanilmayan 3 getter
      (getfinanceList, getFinanceListTotal, getFinancePoPaidList)
      mapGetters ile birlikte dustu.
  [x] 13x $store.dispatch -> ilgili Pinia eylemi. Biri CAPRAZ MODULDU:
      setFinancePaymentModel finance degil MODELS store'unda.
  [x] 3x this.$axios -> useLegacyApi()   (axios sozlesmesi, .data korunur)
  [x] 4x this.$toast  -> useAppToast()
  [x] 6x this.$excelApi -> useExcelApi()
  [x] 3x plugins/date date.dateToString -> toIsoDate (API'ye yazilan bicim)
  [x] created() -> mounted()
      created() SSR'da da calisir, async isi beklenmez, liste BOS
      serialize edilir ve hydration sonrasi bir daha calismaz
      (bkz. commit 2afc877e3). mounted() sunucuda hic calismaz.
  [x] <vue-excel-xlsx> -> <Button @click="exportMekmarFinance">
      O bileşen Vue 2'ye bagli ve pilota kurulmadi. Ayrintisi
      exportMekmarFinance()'in ustundeki notta; kolon tanimi ve dosya adi
      (Finance.xlsx) orijinalle ayni.

  CODEMOD'UN YAPTIKLARI:
     10x :x + @update:x -> v-model:x
      2x <Calendar> -> <DatePicker>,  1x <Dropdown> -> <Select>
      6x p-button-* -> severity
      1x p-float-label -> <FloatLabel>
      5x bileşen etiketi (sonra pilot adlariyla duzeltildi)

  KALDIRILDI -- OLU KOD:
  [x] data() icinde YINELENEN `finance_collection_list_form` anahtari
      (ayrinti data() icindeki notta).

  DIKKAT -- DOKUNULMADI:
  [!] Finans LISTELERI artik NITRO'dan geliyor:
      server/routes/finance-api/reports/{test,test-filter,mekmer-all}
      (Nuxt 2'de ve pilotun ilk halinde Excel sunucusundaydi.)
      Ekran bos gelirse ILK BAKILACAK YER o rotalar ve
      server/utils/finance-report.ts.
      Excel CIKTISI hala Excel sunucusunda
      (/finance/reports/test/excel/mekmer).
  [!] EKRANDA GORULMEDI.
-->
