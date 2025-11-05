import { defineStore } from 'pinia'
import { userStoreState, userStoreType } from './types'


const useUserStore = defineStore('user', {
  state: (): userStoreState => ({
    user: null,
  }),

  getters: {
    getUser: (state) => state.user,

    getToken: (state) => state.user?.token ?? '',

    getPermissions: (state) => [state.user?.role ?? ''] ?? [],
  },


  actions: {
    updateUser(user: userStoreType) {
      this.user = user;
    },

    clearUser() {
      this.user = null;
    },
  },
});


export default useUserStore;
