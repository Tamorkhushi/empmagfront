import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

////////////// auth //////////////////
const authStore = (set) => ({
  token: "",
  setToken: (newToken) => set({ token: newToken }),
  removeToken: () => set({ token: null }),
});

const useAuthStore = create(
  devtools(
    persist(authStore, {
      name: "token",
      getStorage: () => localStorage,
    })
  )
);

const loaderStore = (set)=>({
  loading: false,
  setLoading: (bool) => { set({ loading: bool }) },
})

const useLoaderStore = create(
  devtools(loaderStore)
)

export { useAuthStore,useLoaderStore }
