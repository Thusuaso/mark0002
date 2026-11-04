<template>
  <div class="container" style="height: 400px">
    <div class="row">
      <div class="col">
        <Textarea
          v-model="todo.Yapilacak"
          class="w-100"
          rows="5"
          placeholder="Assignment"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FloatLabel>
          <AutoComplete
            v-model="selectedUsers"
            inputId="users"
            :suggestions="filteredUsers"
            @complete="searchUsers($event)"
            optionLabel="KullaniciAdi"
            :multiple="true"
          />
          <label for="users">Assignee</label>
        </FloatLabel>
      </div>
      <div class="col">
        <Select
          v-model="selectedPriority"
          :options="priorities"
          optionLabel="oncelik"
          placeholder="Priority"
        />
      </div>
      <div class="col">
        <Checkbox v-model="todo.Acil" :binary="true" /> Urgent
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Button
          type="button"
          severity="success"
          class="w-100"
          label="Save"
          @click="saveProcess"
        />
      </div>
      <div class="col" v-if="!todoStore.getTodoButtonStatus">
        <Button
          type="button"
          severity="danger"
          class="w-100"
          label="Delete"
          @click="deleteForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useTodoStore } from "~/stores/todo"

export default {
  props: {
    todoDetail: {
      type: Object,
      required: false,
      default: null,
    },
    users: {
      type: Array,
      required: true,
    },
  },

  computed: {
    todoStore() {
      return useTodoStore()
    },

    todo() {
      return this.todoDetail
    },
  },

  data() {
    return {
      filteredUsers: null,
      selectedUsers: [],
      selectedPriority: null,
      priorities: [{ oncelik: "A" }, { oncelik: "B" }, { oncelik: "C" }],
    }
  },

  created() {
    if (!this.todoStore.getTodoButtonStatus) {
      this.createdProcess()
    }
  },

  methods: {
    searchUsers(event) {
      if (event.query.length === 0) {
        this.filteredUsers = this.users
        return
      }

      this.filteredUsers = this.users.filter((x) =>
        x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase()),
      )
    },

    createdProcess() {
      const users = this.todo.OrtakGorev.split(",")
      users.forEach((x) => {
        const user = this.users.find((y) => y.KullaniciAdi == x)
        this.selectedUsers.push(user)
      })
      this.selectedPriority = this.priorities.find(
        (x) => x.oncelik == this.todo.YapilacakOncelik,
      )
    },

    /*
     * BOS -- NUXT 2'DE DE BOSTU.
     *
     * saveProcess(), getTodoButtonStatus true oldugunda (yani "yeni gorev"
     * kipinde) bu metodu cagiriyor ve HICBIR SEY olmuyordu: ne istek, ne
     * toast, ne konsol izi. Kullanici Save'e basip bos bir ekrana bakiyordu.
     *
     * BILEREK DOLDURULMADI: bu formun yeni gorev olusturma yolu hic
     * yazilmamis (yeni kayit sidebar'daki TodoByUsernameForm uzerinden
     * gidiyor). Buraya bir kaydetme istegi UYDURMAK, var olmayan bir
     * davranis icat etmek olurdu -- hangi uca, hangi govdeyle gidecegi
     * belirsiz.
     *
     * Tek degisiklik: artik SESSIZ degil. console.warn en azindan
     * "neden hicbir sey olmadi" sorusuna bakilacak bir yer biraktiyor.
     */
    save() {
      console.warn(
        "SalesTodoForm.save(): bu formda yeni gorev olusturma yolu " +
          "Nuxt 2'de de uygulanmamisti -- istek gonderilmedi.",
      )
    },

    /*
     * Tek tirnaklari ikiye katliyor. SQL kacisi, ISTEMCI TARAFINDA.
     *
     * DEGISTIRILMEDI cunku sunucu `CustomYapilacak` alanini bu bicimde
     * bekliyor; burada duzeltmek api/index.js'i de degistirmek demek.
     * Dogru yer sunucu tarafindaki parametreli sorgu -- bu ayri bir is.
     */
    __stringCharacterChange(event) {
      const data = event.split("'")
      let value = ""

      data.forEach((x) => {
        value += x + "''"
      })

      return value.substring(0, value.length - 2)
    },

    update() {
      /*
       * DUZELTILDI -- 4'TEN FAZLA KISI SECILIRSE ALAN BOS KALIYORDU.
       *
       * Nuxt 2'deki hali 1, 2, 3 ve 4 kisi icin ayri birer if dali
       * yaziyordu ve her dal adlari ELLE birlestiriyordu:
       *
       *     if (len == 1) { ... } else if (len == 2) { ... }
       *     else if (len == 3) { ... } else if (len == 4) { ... }
       *
       * BESINCI kisi secildiginde hicbir dal tutmuyordu: OrtakGorev
       * basta "" yapildigi icin BOS KALIYOR ve gorev kimseye atanmamis
       * olarak kaydediliyordu. Hata yok, toast "Başarıyla Güncellendi"
       * diyor -- atama sessizce kayboluyor.
       *
       * join(",") hem dort dali hem siniri kaldiriyor; 1-4 kisi icin
       * uretilen dizge BIREBIR AYNI.
       */
      this.todo.OrtakGorev = this.selectedUsers
        .map((x) => x.KullaniciAdi)
        .join(",")

      this.todo.YapilacakOncelik = this.selectedPriority.oncelik
      this.todo.CustomYapilacak = this.__stringCharacterChange(
        this.todo.Yapilacak,
      )

      this.todoStore.setTodoUpdate(this.todo)
    },

    saveProcess() {
      if (this.todoStore.getTodoButtonStatus) {
        this.save()
      } else {
        this.update()
      }
    },

    deleteForm() {
      this.todoStore.setTodoDelete(this.todo.ID)
      this.$emit("todo_form_dialog", false)
    },
  },
}
</script>

<!--
  components/sales/TodoForm.vue   (Nuxt 2: components/sales/todo/form.vue)

  Etiket adi <SalesTodoForm>. Nuxt 2'de ad `<todoForm>` idi
  (plugins/components.js:238, ELLE kayit).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] AutoComplete: field="KullaniciAdi" -> optionLabel="KullaniciAdi"
      PrimeVue 4'un AutoComplete'inde `field` prop'u YOK -- paket
      kaynaginda o ad hic gecmiyor, yalnizca optionLabel var. `field`
      birakilsa oneri listesi "[object Object]" olarak render edilirdi:
      hata vermez, liste okunamaz hale gelir. Pilotun geri kalani da
      optionLabel kullaniyor (orn. orderDetail/Form.vue).

  [x] <span class="p-float-label"> -> <FloatLabel>
      p-float-label SINIFI PrimeVue 4'te tamamen kaldirildi; stilsiz bir
      span olarak render edilip <label> input'un uzerine yuzmek yerine
      akista kaliyordu. (Ayrinti: tools/codemods/codemod-float-label.mjs)

  [x] <Dropdown> -> <Select>
      PrimeVue 4'te bilesenin adi Select; pilot genelinde de Select
      kullaniliyor (36 kullanim / 10 Dropdown).

  [x] class="p-button-success w-100" -> severity="success" class="w-100"
      PrimeVue 4'te p-button-<severity> siniflari kaldirildi.

  [x] mapGetters(["getTodoButtonStatus"]) -> todoStore
      this.$store.dispatch("setTodoUpdate"/"setTodoDelete") -> todoStore.*

  DUZELTILDI -- NUXT 2'DE SESSIZCE BOZUK OLAN:

  [x] 4'ten fazla atanan sessizce kayboluyordu (gerekcesi update()
      icinde).

  [x] class="p-button-delete" -> severity="danger"
      `p-button-delete` DIYE BIR SINIF YOK: ne PrimeVue'da ne de bu
      deponun hicbir css dosyasinda tanimli. Yani Delete dugmesi bugune
      kadar VARSAYILAN (mavi) gorunuyordu, Save ile ayni renkte. Adi
      "delete" oldugu icin niyet acik; severity="danger" verildi.
      GORUNUR DEGISIKLIK: dugme artik kirmizi. Istenmiyorsa severity
      satirini silmek yeterli.

  [x] save() artik sessiz degil -- console.warn basiyor (gerekcesi
      metodun basinda). DAVRANIS AYNI: hala istek gondermiyor.

  KALDIRILDI -- OLU KOD:
  [x] data.selectedRepresentative ve data.representative (4 kisilik
      sabit liste) -- sablonda HIC GECMIYOR, hicbir metot okumuyor.

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:
      update() ve deleteForm(), `todoDetail` PROP'UNUN alanlarini
      YERINDE degistiriyor (this.todo bir computed, prop'u geri
      donduruyor). Vue 3 nesne prop'larinin IC alanlarina yazmayi
      engellemez ve uyarmaz, ama bu ebeveynin verisini degistirmek
      demek. Tasarim olarak yanlis; davranis degistirmemek icin
      birakildi. (tools/codemods/find-prop-mutations.mjs bu sinifi
      taramak icin var.)
-->
