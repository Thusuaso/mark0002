<template>
  <div class="mt-4">
    <span class="p-float-label">
      <Textarea v-model="model.Yapilacak" rows="5" class="w-100" />
      <label>Todo</label>
    </span>
    <div class="row mt-3">
      <div class="col">
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedUsers"
            inputId="users"
            :suggestions="filteredUsers"
            @complete="searchUsers($event)"
            field="KullaniciAdi"
            :multiple="true"
          />
          <label for="users">Görev Sahipleri</label>
        </span>
      </div>
      <div class="col">
        <div class="p-float-label">
          <Dropdown
            v-model="selectedPriority"
            inputId="priority"
            :options="priorities"
            optionLabel="priority"
            class="w-full md:w-14rem"
            @change="priorityChanged($event)"
          />
          <label for="priority">Öncelik</label>
        </div>
      </div>
      <div class="col">
        <div class="flex align-items-center">
          <Checkbox v-model="model.Acil" inputId="ingredient1" :binary="true" />
          <label for="ingredient1" class="ml-2"> Acil </label>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Kaydet"
          @click="process"
        />
      </div>
      <div class="col" v-if="!status">
        <Button
          type="button"
          class="p-button-danger w-100"
          label="Sil"
          @click="$emit('deleteProcess', model)"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    model: {
      type: Array,
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
  data() {
    return {
      selectedUsers: [],
      filteredUsers: null,
      priorities: [{ priority: "A" }, { priority: "B" }, { priority: "C" }],
      selectedPriority: null,
    };
  },
  created() {
    if (!this.status) {
      this.createdProcess();
    }
  },
  methods: {
    createdProcess() {
      this.selectedPriority = this.priorities.find(
        (x) => x.priority == this.model.YapilacakOncelik
      );
      const users = this.model.OrtakGorev.split(",");
      users.forEach((x) => {
        const user = this.users.find((y) => y.KullaniciAdi == x);
        this.selectedUsers.push(user);
      });
    },
    process() {
      this.model.OrtakGorev = "";
      if (this.selectedUsers.length == 1) {
        this.model.OrtakGorev += this.selectedUsers[0].KullaniciAdi;
      } else if (this.selectedUsers.length == 2) {
        this.model.OrtakGorev +=
          this.selectedUsers[0].KullaniciAdi + "," + this.selectedUsers[1].KullaniciAdi;
      } else if (this.selectedUsers.length == 3) {
        this.model.OrtakGorev +=
          this.selectedUsers[0].KullaniciAdi +
          "," +
          this.selectedUsers[1].KullaniciAdi +
          "," +
          this.selectedUsers[2].KullaniciAdi;
      } else if (this.selectedUsers.length == 4) {
        this.model.OrtakGorev +=
          this.selectedUsers[0].KullaniciAdi +
          "," +
          this.selectedUsers[1].KullaniciAdi +
          "," +
          this.selectedUsers[2].KullaniciAdi +
          "," +
          this.selectedUsers[3].KullaniciAdi;
      }

      this.$emit("process", this.model);
    },
    priorityChanged(event) {
      this.model.YapilacakOncelik = event.value.priority;
    },
    searchUsers(event) {
      let results;
      if (event.query.length === 0) {
        results = this.users;
      } else {
        results = this.users.filter((x) => {
          return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredUsers = results;
    },
  },
};
</script>
