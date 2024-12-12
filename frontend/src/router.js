import { createRouter, createWebHistory } from "vue-router";
import Contact from "./components/Contact.vue";
import Admin from "./components/Admin.vue";
import Login from "./components/Login.vue";

const routes = [
  {
    path: "/",
    name: "Contact",
    component: Contact,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("contact_token")
  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else if (to.name === "Login" && token) {
    next("/admin");
  } else {
    next();
  }
});

export default router;
