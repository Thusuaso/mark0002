<template>
  <div class="mt-4">
    <FloatLabel>
      <Textarea v-model="model.Yapilacak" rows="5" class="w-full" />
      <label>Assignment</label>
    </FloatLabel>

    <div class="row mt-3">
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
        <FloatLabel>
          <Select
            v-model="selectedPriority"
            inputId="priority"
            :options="priorities"
            optionLabel="priority"
            class="w-full md:w-14rem"
            @change="priorityChanged($event)"
          />
          <label for="priority">Priority</label>
        </FloatLabel>
      </div>

      <div class="col">
        <div class="flex align-items-center">
          <Checkbox v-model="model.Acil" inputId="urgent" :binary="true" />
          <label for="urgent" class="ml-2"> Urgent </label>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <Button
          type="button"
          severity="success"
          class="w-full"
          label="Save"
          @click="process"
        />
      </div>
      <div class="col" v-if="!status">
        <Button
          type="button"
          severity="danger"
          class="w-full"
          label="Delete"
          @click="confirmedDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // ORIJINALDE HATA: type: Array idi ama gelen deger bir OBJE
    // (models.js'teki todoModel). Vue 3 bunu konsola uyari olarak basar.
    model: {
      type: Object,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["process", "deleteProcess"],
  data() {
    return {
      selectedUsers: [],
      filteredUsers: null,
      priorities: [{ priority: "A" }, { priority: "B" }, { priority: "C" }],
      selectedPriority: null,
    }
  },
  created() {
    if (!this.status) {
      this.createdProcess()
    }
  },
  methods: {
    /*
     * Dugme ONCE dogrudan $emit cagiriyordu. Onay sablondan
     * sorulamiyor: Options API sablonu yalnizca bilesen ornegini
     * gorur, Nuxt'un otomatik import ettigi confirmAction'i DEGIL.
     * Davranis ayni, yalnizca onaydan sonra yayiliyor.
     */
    confirmedDelete() {
      if (!confirmAction()) return
      this.$emit("deleteProcess", this.model)
    },

    createdProcess() {
      this.selectedPriority = this.priorities.find(
        (x) => x.priority == this.model.YapilacakOncelik,
      )

      // OrtakGorev bos/null olabiliyor -- orijinal kod dogrudan .split
      // cagirdigi icin o durumda patliyordu.
      const names = String(this.model.OrtakGorev ?? "")
        .split(",")
        .filter(Boolean)

      for (const name of names) {
        const user = this.users.find((y) => y.KullaniciAdi == name)
        if (user) this.selectedUsers.push(user)
      }
    },

    __stringCharacterChange(event) {
      const data = String(event ?? "").split("'")
      let value = ""

      data.forEach((x) => {
        value += x + "''"
      })

      return value.substring(0, value.length - 2)
    },

    process() {
      /*
       * Orijinalde burada 1/2/3/4 kullanici icin dort ayri if/else blogu
       * vardi ve 4'ten FAZLA secimde OrtakGorev bos kaliyordu (sessiz veri
       * kaybi). join(",") hem ayni sonucu veriyor hem o siniri kaldiriyor.
       */
      this.model.OrtakGorev = this.selectedUsers
        .filter(Boolean)
        .map((u) => u.KullaniciAdi)
        .join(",")

      this.model.CustomYapilacak = this.__stringCharacterChange(
        this.model.Yapilacak,
      )

      this.$emit("process", this.model)
    },

    priorityChanged(event) {
      this.model.YapilacakOncelik = event.value.priority
    },

    searchUsers(event) {
      const query = event.query ?? ""

      this.filteredUsers =
        query.length === 0
          ? this.users
          : this.users.filter((x) =>
              x.KullaniciAdi.toLowerCase().startsWith(query.toLowerCase()),
            )
    },
  },
}
</script>

<!--
  components/todo/form.vue -> app/components/todoByUsername/Form.vue

  Dosya yolu, navbar'daki <todoByUsernameForm> etiketiyle auto-import
  adinin uyusmasi icin secildi (List.vue'daki aciklamanin aynisi).

  ZORUNLU degisiklikler:
  [1] <span class="p-float-label"> -> <FloatLabel>  (3 yer)
  [2] <Dropdown> -> <Select>        (PrimeVue 4'te yeniden adlandirildi)
  [3] AutoComplete field="..." -> optionLabel="..."  (prop adi degisti)
      SESSIZ: field artik taninmayan bir prop; oneriler [object Object]
      olarak gorunurdu.
  [4] class="p-button-success/danger" -> severity="success/danger"
  [5] class="w-100" (bootstrap) -> "w-full" (primeflex) -- primeflex
      yuklendigi icin tutarli olan bu
  [6] emits dizisi eklendi
  [7] deleteForm(id) {} bos metod kaldirildi (olu kod)

  DUZELTILEN MEVCUT HATALAR:
  [A] props.model type: Array -> Object. Gelen deger todoModel objesi;
      Vue 3 bunu uyari olarak basiyor.
  [B] OrtakGorev null/bos oldugunda .split patliyordu -> guard eklendi.
  [C] process() 1-4 kullanici icin dort ayri blok yaziyordu ve 4'ten
      FAZLA secimde OrtakGorev BOS kaliyordu (sessiz veri kaybi).
      join(",") ile ayni sonuc, sinir yok.
-->
