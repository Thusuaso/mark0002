import { defineStore } from 'pinia';

//#region app/stores/socket.ts
var socket = null;
var useSocketStore = defineStore("socket", {
	state: () => ({
		consumers: 0,
		connected: false,
		socketId: null
	}),
	getters: {
		getSocket: () => socket,
		isConnected: (state) => state.connected
	},
	actions: {
		connect() {},
		disconnect() {},
		emit(event, ...args) {
			console.warn(`[socket] "${event}" yayilamadi: baglanti yok`);
		}
	}
});

export { useSocketStore as u };
//# sourceMappingURL=socket-AbqLYDWT.mjs.map
