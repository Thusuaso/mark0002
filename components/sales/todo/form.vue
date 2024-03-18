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
        <span class="p-float-label">
          <AutoComplete
            v-model="selectedUsers"
            inputId="users"
            :suggestions="filteredUsers"
            @complete="searchUsers($event)"
            field="KullaniciAdi"
            :multiple="true"
          />
          <label for="users">Assignee</label>
        </span>
      </div>
      <div class="col">
        <Dropdown
          v-model="selectedPriority"
          :options="priorities"
          optionLabel="oncelik"
          placeholder="Priority"
        />
      </div>
      <div class="col"><Checkbox v-model="todo.Acil" :binary="true" /> Urgent</div>
    </div>
    <div class="row">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="Save"
          @click="saveProcess"
        />
      </div>
      <div class="col" v-if="!getTodoButtonStatus">
        <Button
          type="button"
          class="p-button-delete w-100"
          label="Delete"
          @click="deleteForm"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    todoDetail: {
      type: Object,
      required: false,
    },
    users: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["getTodoButtonStatus"]),
    todo() {
      return this.todoDetail;
    },
  },
  data() {
    return {
      filteredUsers: null,
      selectedUsers: [],
      selectedRepresentative: null,
      representative: [
        { id: 10, name: "Gizem" },
        { id: 19, name: "Ozlem" },
        { id: 44, name: "Hakan" },
        { id: 47, name: "Semih" },
      ],
      selectedPriority: null,
      priorities: [{ oncelik: "A" }, { oncelik: "B" }, { oncelik: "C" }],
    };
  },
  created() {
    if (!this.getTodoButtonStatus) {
      this.createdProcess();
    }
  },
  methods: {
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
    createdProcess() {
      const users = this.todo.OrtakGorev.split(",");
      users.forEach((x) => {
        const user = this.users.find((y) => y.KullaniciAdi == x);
        this.selectedUsers.push(user);
      });
      this.selectedPriority = this.priorities.find(
        (x) => x.oncelik == this.todo.YapilacakOncelik
      );
    },
    save() {},
    __stringCharacterChange(event) {
      const data = event.split("'");
      let value = "";

      data.forEach((x) => {
        value += x + "''";
      });
      const value2 = value.substring(0, value.length - 2);
      return value2;
    },
    update() {
      this.todo.OrtakGorev = "";
      if (this.selectedUsers.length == 1) {
        this.todo.OrtakGorev += this.selectedUsers[0].KullaniciAdi;
      } else if (this.selectedUsers.length == 2) {
        this.todo.OrtakGorev +=
          this.selectedUsers[0].KullaniciAdi + "," + this.selectedUsers[1].KullaniciAdi;
      } else if (this.selectedUsers.length == 3) {
        this.todo.OrtakGorev +=
          this.selectedUsers[0].KullaniciAdi +
          "," +
          this.selectedUsers[1].KullaniciAdi +
          "," +
          this.selectedUsers[2].KullaniciAdi;
      } else if (this.selectedUsers.length == 4) {
        this.todo.OrtakGorev +=
          this.selectedUsers[0].KullaniciAdi +
          "," +
          this.selectedUsers[1].KullaniciAdi +
          "," +
          this.selectedUsers[2].KullaniciAdi +
          "," +
          this.selectedUsers[3].KullaniciAdi;
      }
      this.todo.YapilacakOncelik = this.selectedPriority.oncelik;
      this.todo.CustomYapilacak = this.__stringCharacterChange(this.todo.Yapilacak);

      this.$store.dispatch("setTodoUpdate", this.todo);
    },
    saveProcess() {
      if (this.getTodoButtonStatus) {
        this.save();
      } else {
        this.update();
      }
    },
    deleteForm() {
      this.$store.dispatch("setTodoDelete", this.todo.ID);
      this.$emit("todo_form_dialog", false);
    },
  },
};
</script>
