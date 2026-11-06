import { u as useCookie, a as useAppToast } from '../virtual/entry.mjs';
import { u as useApi } from './useApi-CGFzrxZs.mjs';
import { defineStore } from 'pinia';

//#region app/stores/todo.ts
function emptyTodo() {
	return {
		ID: 0,
		Yapilacak: "",
		Yapildi: 0,
		GorevVerenID: "",
		GorevVerenAdi: "",
		GirisTarihi: "",
		YapildiTarihi: "",
		YapilacakOncelik: "",
		Acil: 0,
		Sira: 0,
		OrtakGorev: ""
	};
}
function emptySalesTodoLists() {
	return {
		listA: [],
		listMail: []
	};
}
var useTodoStore = defineStore("todo", {
	state: () => ({
		todos: emptySalesTodoLists(),
		todoButtonStatus: false,
		toDoMainListByUsername: [],
		todoMainListByUsernameButtonStatus: false,
		todosMainList: [],
		todoModel: emptyTodo()
	}),
	getters: {
		getTodos: (state) => state.todos,
		getTodoButtonStatus: (state) => state.todoButtonStatus,
		getToDoMainListByUsername: (state) => state.toDoMainListByUsername,
		getToDoMainListByUsernameLenght: (state) => state.toDoMainListByUsername.length,
		getTodoMainListByUsernameButtonStatus: (state) => state.todoMainListByUsernameButtonStatus,
		getTodosMainList: (state) => state.todosMainList,
		getTodoModel: (state) => state.todoModel
	},
	actions: {
		currentUsername() {
			return useCookie("username").value ?? "";
		},
		setTodoButtonStatus(status) {
			this.todoButtonStatus = status;
		},
		setTodoMainListByUsernameButtonStatus(status) {
			this.todoMainListByUsernameButtonStatus = status;
		},
		MUT_setTodosMainList(payload) {
			this.todosMainList = payload;
		},
		setToDoModel() {
			this.todoModel = emptyTodo();
		},
		async setToDoListByUsername(username) {
			const user = username ?? this.currentUsername();
			if (!user) {
				console.warn("setToDoListByUsername: username cerezi bos, istek atlandi.");
				return;
			}
			try {
				const res = await useApi()(`/todo/main/list/by/username/${user}`);
				this.toDoMainListByUsername = res.list ?? [];
			} catch (err) {
				console.error("setToDoListByUsername basarisiz:", err);
				this.toDoMainListByUsername = [];
			}
		},
		async setTodosMainList(username) {
			const user = username ?? this.currentUsername();
			if (!user) return;
			try {
				const res = await useApi()(`/sales/todos/main/list/${user}`);
				this.todosMainList = res.list ?? [];
			} catch (err) {
				console.error("setTodosMainList basarisiz:", err);
				this.todosMainList = [];
			}
		},
		async setTodos() {
			try {
				const res = await useApi()("/sales/todos/list");
				this.todos = {
					listA: res?.listA ?? [],
					listMail: res?.listMail ?? []
				};
			} catch (err) {
				console.error("setTodos basarisiz:", err);
				this.todos = emptySalesTodoLists();
			}
		},
		async setTodoSave(todo) {
			const toast = useAppToast();
			try {
				if ((await useApi()("/todo/by/username/save", {
					method: "POST",
					body: todo
				})).status) {
					toast.success("Yeni Görev Hayırlı Olsun.");
					await this.setToDoListByUsername(todo.GorevVerenAdi);
					await this.setTodosMainList();
				} else toast.error("Bi Görevi Bile Ekleyemiyor musun?");
			} catch (err) {
				console.error("setTodoSave basarisiz:", err);
				toast.error("Bi Görevi Bile Ekleyemiyor musun?");
			}
		},
		async setTodoDone(todo) {
			const toast = useAppToast();
			try {
				if ((await useApi()("/todo/by/username/done", {
					method: "POST",
					body: todo
				})).status) {
					toast.success("Görev Tamamlandı.");
					await this.setToDoListByUsername(todo.GorevVerenAdi);
				} else toast.error("Görev Tamamlanamadı.");
			} catch (err) {
				console.error("setTodoDone basarisiz:", err);
				toast.error("Görev Tamamlanamadı.");
			}
		},
		async setTodoUpdate(todo) {
			const toast = useAppToast();
			try {
				if ((await useApi()("/sales/todos/update", {
					method: "PUT",
					body: todo
				})).status) {
					toast.success("Başarıyla Güncellendi");
					await this.setTodos();
					await this.setTodosMainList();
					await this.setToDoListByUsername();
				} else toast.error("Güncelleme Başarısız");
			} catch (err) {
				console.error("setTodoUpdate basarisiz:", err);
				toast.error("Güncelleme Başarısız");
			}
		},
		async setTodoDelete(id) {
			const toast = useAppToast();
			try {
				if ((await useApi()(`/sales/todos/delete/${id}`, { method: "DELETE" })).status) {
					toast.success("Başarıyla Silindi");
					await this.setTodos();
					await this.setTodosMainList();
					await this.setToDoListByUsername();
				} else toast.error("Silme Başarısız");
			} catch (err) {
				console.error("setTodoDelete basarisiz:", err);
				toast.error("Silme Başarısız");
			}
		},
		async setSalesTodoMainDone(id) {
			const toast = useAppToast();
			try {
				if ((await useApi()(`/todo/main/list/change/done/${id}`)).status) {
					toast.success("Görev Tamamlandı.");
					await this.setTodosMainList();
				} else toast.error("Görev Tamamlanamadı.");
			} catch (err) {
				console.error("setSalesTodoMainDone basarisiz:", err);
				toast.error("Görev Tamamlanamadı.");
			}
		},
		async setSalesTodoMainSeen(id) {
			const toast = useAppToast();
			try {
				if ((await useApi()(`/todo/main/list/change/seen/${id}`)).status) {
					toast.success("Görüldü Olarak Değiştirildi.");
					await this.setTodosMainList();
				} else toast.error("Değiştirme Başarısız");
			} catch (err) {
				console.error("setSalesTodoMainSeen basarisiz:", err);
				toast.error("Değiştirme Başarısız");
			}
		},
		async setSalesTodoMainChangeQueue(todos) {
			const toast = useAppToast();
			try {
				if ((await useApi()("/todo/main/change/queue", {
					method: "POST",
					body: todos
				})).status) toast.success("Sıra Başarıyla Değiştirildi.");
				else toast.error("Sıra Değiştirme Başarısız.");
			} catch (err) {
				console.error("setSalesTodoMainChangeQueue basarisiz:", err);
				toast.error("Sıra Değiştirme Başarısız.");
			}
		},
		async setTodoNotSeen(id) {
			const toast = useAppToast();
			try {
				if ((await useApi()(`/todo/main/list/change/not/seen/${id}`)).status) {
					toast.success("Başarıyla Değiştirildi.");
					await this.setTodosMainList();
				} else toast.error("Değiştirme Başarısız.");
			} catch (err) {
				console.error("setTodoNotSeen basarisiz:", err);
				toast.error("Değiştirme Başarısız.");
			}
		},
		async setTodoStatusChange(id) {
			const toast = useAppToast();
			try {
				if ((await useApi()(`/sales/todos/change/status/${id}`, { method: "PUT" })).status) {
					toast.success("Başarıyla Güncellendi");
					await this.setTodos();
				} else toast.error("Güncelleme Başarısız");
			} catch (err) {
				console.error("setTodoStatusChange basarisiz:", err);
				toast.error("Güncelleme Başarısız");
			}
		}
	}
});

export { useTodoStore as u };
//# sourceMappingURL=todo-CBOtxBPz.mjs.map
