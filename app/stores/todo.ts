import { defineStore } from "pinia"

/*
 * Vuex store/modules/todo.js karsiligi + models.js'ten todoModel parcasi.
 *
 * Orijinalde todoModel ve setToDoModel, 1425 satirlik models.js icinde
 * diger ~20 modelle birlikte duruyordu. Pinia'da store'lar alan bazli
 * oldugu icin todo'ya ait olan buraya alindi -- models.js'in tamami tek
 * bir dev store'a cevrilmeyecek.
 *
 * Orijinalde her action Cookies.get("username") cagiriyordu; burada
 * useCookie ile bir kez okunuyor.
 */

export interface Todo {
  ID: number
  Yapilacak: string
  Yapildi: number
  GorevVerenID: string | number
  GorevVerenAdi: string
  GirisTarihi: string
  YapildiTarihi: string
  YapilacakOncelik: string | number
  Acil: number
  Sira: number
  OrtakGorev: string
}

function emptyTodo(): Todo {
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
    OrtakGorev: "",
  }
}

/*
 * GET /sales/todos/list bir DIZI DEGIL, iki listeli bir NESNE donduruyor
 * (api/index.js:1417):
 *     { listA: [...], listMail: [...] }
 *
 * DUZELTILDI: burada tip `Todo[]` ve baslangic degeri `[]` idi, ayrica
 * setTodos hata dalinda `this.todos = []` yaziyordu. Oysa sablon
 * `todos.listA` / `todos.listMail` diye NESNE alani okuyor -- dizide o
 * alanlar yok, yani veri gelene kadar VE her hatadan sonra iki alt
 * bilesen de `:todoList="undefined"` aliyordu. Tip hatasi vermedigi icin
 * fark edilmemis (ayni sinif hata home store'unda da vardi).
 */
export interface SalesTodoLists {
  listA: Todo[]
  listMail: Todo[]
}

function emptySalesTodoLists(): SalesTodoLists {
  return { listA: [], listMail: [] }
}

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: emptySalesTodoLists() as SalesTodoLists,
    todoButtonStatus: false,
    toDoMainListByUsername: [] as Todo[],
    todoMainListByUsernameButtonStatus: false,
    todosMainList: [] as Todo[],
    todoModel: emptyTodo(),
  }),

  getters: {
    getTodos: (state) => state.todos,
    getTodoButtonStatus: (state) => state.todoButtonStatus,
    getToDoMainListByUsername: (state) => state.toDoMainListByUsername,
    // Vuex'te ayri bir state alaniydi; turetilmis olmasi daha dogru
    getToDoMainListByUsernameLenght: (state) =>
      state.toDoMainListByUsername.length,
    getTodoMainListByUsernameButtonStatus: (state) =>
      state.todoMainListByUsernameButtonStatus,
    getTodosMainList: (state) => state.todosMainList,
    getTodoModel: (state) => state.todoModel,
  },

  actions: {
    currentUsername(): string {
      return useCookie<string | null>("username").value ?? ""
    },

    setTodoButtonStatus(status: boolean) {
      this.todoButtonStatus = status
    },

    setTodoMainListByUsernameButtonStatus(status: boolean) {
      this.todoMainListByUsernameButtonStatus = status
    },

    /*
     * MUT_ oneki ZORUNLU -- bu dosyada tek ornegi.
     *
     * Vuex'te `setTodosMainList` IKI AYRI SEYDI: bir ACTION (API'den
     * kullanici adina gore liste ceker) ve bir MUTATION (verilen diziyi
     * dogrudan state'e yazar). Ayri isim uzaylarinda oldugu icin
     * cakismiyorlardi.
     *
     * Pinia'da ikisi de action olacagi icin mutation MUT_ onekini aldi
     * (reports.ts / finance.ts'teki ayni kural).
     *
     * BU NEDEN ONEMLI: components/todo/MainList.vue satirlari surukleyip
     * birakinca `commit("setTodosMainList", data)` cagiriyordu -- yani
     * MUTATION'i. Duz bir cevrim bunu ACTION'a baglardi ve action
     * argumani KULLANICI ADI sanip API'den listeyi YENIDEN CEKERDI:
     * kullanicinin yeni siralamasi aninda cope gider, tablo eski haline
     * donerdi. Hata vermez, sadece "surukleme calismiyor" olarak gorunur.
     */
    MUT_setTodosMainList(payload: Todo[]) {
      this.todosMainList = payload
    },

    // Vuex: setToDoModel -- modeli bos haline dondurur
    setToDoModel() {
      this.todoModel = emptyTodo()
    },

    async setToDoListByUsername(username?: string) {
      const user = username ?? this.currentUsername()

      /*
       * Kullanici adi yoksa istek atmak anlamsiz: uc adi yola gomuyor
       * (/todo/main/list/by/username/:username) ve bos adla LIKE sorgusu
       * TUM kayitlari dondurur.
       *
       * AMA sessizce donmek teshisi imkansiz kiliyordu: liste bos
       * geliyor, konsolda hicbir iz yok, kullanici "veriler gelmiyor"
       * diyor ve bakilacak bir yer olmuyor. Bu yuzden uyari basiliyor.
       *
       * Cerez girişte yaziliyor (app/stores/auth.ts verifyOtp ->
       * username = res.username). Bu uyariyi goruyorsaniz sebep cerezin
       * okunamamasidir, istegin basarisiz olmasi degil.
       */
      if (!user) {
        console.warn(
          "setToDoListByUsername: username cerezi bos, istek atlandi.",
        )
        return
      }

      try {
        const api = useApi()
        const res = await api<{ list: Todo[] }>(
          `/todo/main/list/by/username/${user}`,
        )
        this.toDoMainListByUsername = res.list ?? []
      } catch (err) {
        console.error("setToDoListByUsername basarisiz:", err)
        this.toDoMainListByUsername = []
      }
    },

    async setTodosMainList(username?: string) {
      const user = username ?? this.currentUsername()
      if (!user) return

      try {
        const api = useApi()
        const res = await api<{ list: Todo[] }>(`/sales/todos/main/list/${user}`)
        this.todosMainList = res.list ?? []
      } catch (err) {
        console.error("setTodosMainList basarisiz:", err)
        this.todosMainList = []
      }
    },

    async setTodos() {
      try {
        const api = useApi()
        const res = await api<SalesTodoLists>("/sales/todos/list")
        /* Uc yalnizca birini donderse digeri undefined kalmasin. */
        this.todos = {
          listA: res?.listA ?? [],
          listMail: res?.listMail ?? [],
        }
      } catch (err) {
        console.error("setTodos basarisiz:", err)
        this.todos = emptySalesTodoLists()
      }
    },

    /*
     * Asagidaki action'lar YAZMA islemi yapiyor.
     *
     * NOT GUNCELLENDI: bu blokta eskiden "pilot salt-okunur modda
     * calistigi icin bunlar 403 alacak" yaziyordu. Salt-okunur kilidi
     * (server/middleware/0.readonly-guard.ts) kullanicinin talebiyle
     * KALDIRILDI. Artik bu cagrilar uretim veritabanina GERCEKTEN
     * yaziyor -- 403 beklenmiyor, basarisizlik gercek bir hata demek.
     */

    async setTodoSave(todo: Todo) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>("/todo/by/username/save", {
          method: "POST",
          body: todo,
        })
        if (res.status) {
          toast.success("Yeni Görev Hayırlı Olsun.")
          await this.setToDoListByUsername(todo.GorevVerenAdi)
          await this.setTodosMainList()
        } else {
          toast.error("Bi Görevi Bile Ekleyemiyor musun?")
        }
      } catch (err) {
        console.error("setTodoSave basarisiz:", err)
        toast.error("Bi Görevi Bile Ekleyemiyor musun?")
      }
    },

    async setTodoDone(todo: Todo) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>("/todo/by/username/done", {
          method: "POST",
          body: todo,
        })
        if (res.status) {
          toast.success("Görev Tamamlandı.")
          await this.setToDoListByUsername(todo.GorevVerenAdi)
        } else {
          toast.error("Görev Tamamlanamadı.")
        }
      } catch (err) {
        console.error("setTodoDone basarisiz:", err)
        toast.error("Görev Tamamlanamadı.")
      }
    },

    async setTodoUpdate(todo: Todo) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>("/sales/todos/update", {
          method: "PUT",
          body: todo,
        })
        if (res.status) {
          toast.success("Başarıyla Güncellendi")
          await this.setTodos()
          await this.setTodosMainList()
          await this.setToDoListByUsername()
        } else {
          toast.error("Güncelleme Başarısız")
        }
      } catch (err) {
        console.error("setTodoUpdate basarisiz:", err)
        toast.error("Güncelleme Başarısız")
      }
    },

    async setTodoDelete(id: number) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>(
          `/sales/todos/delete/${id}`,
          { method: "DELETE" },
        )
        if (res.status) {
          toast.success("Başarıyla Silindi")
          await this.setTodos()
          await this.setTodosMainList()
          await this.setToDoListByUsername()
        } else {
          toast.error("Silme Başarısız")
        }
      } catch (err) {
        console.error("setTodoDelete basarisiz:", err)
        toast.error("Silme Başarısız")
      }
    },

    /*
     * ---------------------------------------------------------------------
     * ASAGIDAKI BES EYLEM: pages/sales/todo.vue + pages/sales/maintodo.vue
     * icin tasindi; pilota daha once alinmamislardi.
     * ---------------------------------------------------------------------
     *
     * DIKKAT -- UCU DURUM DEGISTIRDIGI HALDE GET KULLANIYOR:
     *
     *   GET /todo/main/list/change/done/:id
     *   GET /todo/main/list/change/seen/:id
     *   GET /todo/main/list/change/not/seen/:id
     *
     * Legacy API'nin tasarimi boyle; yol ve metot BIREBIR korundu, cunku
     * degistirmek api/index.js'i de degistirmek demek.
     *
     * Bunun pratik bir sonucu vardi: salt-okunur kilidi yururluktekiyken
     * bu uc islem ENGELLENMIYORDU (kilit yalnizca GET DISINDAKI metotlari
     * durduruyordu). Kullanicinin "done/delete/update basarisiz"
     * sikayetinde ana listedeki done calisiyor, sidebar'daki done ise
     * POST /todo/by/username/done oldugu icin 403 aliyordu -- ayni dugme
     * adi, iki ayri yol, iki ayri sonuc.
     */

    /* GET ile durum degistiriyor (yukaridaki nota bakin). */
    async setSalesTodoMainDone(id: number) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>(
          `/todo/main/list/change/done/${id}`,
        )
        if (res.status) {
          toast.success("Görev Tamamlandı.")
          await this.setTodosMainList()
        } else {
          toast.error("Görev Tamamlanamadı.")
        }
      } catch (err) {
        console.error("setSalesTodoMainDone basarisiz:", err)
        toast.error("Görev Tamamlanamadı.")
      }
    },

    /* GET ile durum degistiriyor (yukaridaki nota bakin). */
    async setSalesTodoMainSeen(id: number) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>(
          `/todo/main/list/change/seen/${id}`,
        )
        if (res.status) {
          toast.success("Görüldü Olarak Değiştirildi.")
          await this.setTodosMainList()
        } else {
          toast.error("Değiştirme Başarısız")
        }
      } catch (err) {
        console.error("setSalesTodoMainSeen basarisiz:", err)
        toast.error("Değiştirme Başarısız")
      }
    },

    /*
     * DUZELTILDI -- BASARISIZLIKTA YESIL TOAST GOSTERILIYORDU.
     *
     * Nuxt 2'deki hali:
     *     } else {
     *       this.$toast.success("Sıra Değiştirme Başarısız.");
     *     }
     *
     * Basarisizlik dalinda success() cagriliyordu, yani kullanici
     * "Başarısız" yazan YESIL bir toast goruyordu: mesaj olumsuz, renk
     * olumlu. error() oldu.
     */
    async setSalesTodoMainChangeQueue(todos: Todo[]) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>("/todo/main/change/queue", {
          method: "POST",
          body: todos,
        })
        if (res.status) {
          toast.success("Sıra Başarıyla Değiştirildi.")
        } else {
          toast.error("Sıra Değiştirme Başarısız.")
        }
      } catch (err) {
        console.error("setSalesTodoMainChangeQueue basarisiz:", err)
        toast.error("Sıra Değiştirme Başarısız.")
      }
    },

    /*
     * GET ile durum degistiriyor (yukaridaki nota bakin).
     *
     * IKI SEY DUZELTILDI:
     *
     * [1] Basarisizlik dalinda success() cagriliyordu -- ayni hata
     *     setSalesTodoMainChangeQueue'dekiyle ayni. error() oldu.
     *
     * [2] LISTE YENILENMIYORDU. Kardes eylem setSalesTodoMainSeen
     *     basarinin ardindan setTodosMainList() cagiriyor, bu
     *     CAGIRMIYORDU. Yani "görülmedi" yapildiginda toast cikiyor ama
     *     satir ekranda ESKI HALIYLE kaliyordu; kullanici islemin
     *     olmadigini dusunup tekrar tikliyordu. Yenileme eklendi.
     */
    async setTodoNotSeen(id: number) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>(
          `/todo/main/list/change/not/seen/${id}`,
        )
        if (res.status) {
          toast.success("Başarıyla Değiştirildi.")
          await this.setTodosMainList()
        } else {
          toast.error("Değiştirme Başarısız.")
        }
      } catch (err) {
        console.error("setTodoNotSeen basarisiz:", err)
        toast.error("Değiştirme Başarısız.")
      }
    },

    async setTodoStatusChange(id: number) {
      const toast = useAppToast()
      try {
        const api = useApi()
        const res = await api<{ status: boolean }>(
          `/sales/todos/change/status/${id}`,
          { method: "PUT" },
        )
        if (res.status) {
          toast.success("Başarıyla Güncellendi")
          await this.setTodos()
        } else {
          toast.error("Güncelleme Başarısız")
        }
      } catch (err) {
        console.error("setTodoStatusChange basarisiz:", err)
        toast.error("Güncelleme Başarısız")
      }
    },
  },
})
