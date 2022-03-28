import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddSmoothie from "../components/AddSmoothie.vue";
import EditSmoothie from "../components/EditSmoothie.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/add-smoothie",
      name: "AddSmoothie",
      component: AddSmoothie,
    },
    {
      path: "/edit-smoothie/:smoothie_slug",
      name: "EditSmoothie",
      component: EditSmoothie,
    },
  ],
});

export default router;
