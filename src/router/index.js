import { createRouter, createWebHistory } from "vue-router";

// Views
import AuthView from "@/views/AuthView.vue";
import HomeView from "@/views/HomeView.vue";
import RechargeView from "@/views/RechargeView.vue";
import ShareView from "@/views/ShareView.vue";
import TeamView from "@/views/TeamView.vue";
import ProfileView from "@/views/ProfileView.vue";
import AdminLogin from "@/views/AdminLogin.vue";
import AdminDashboard from "@/views/AdminDashboard.vue";

const routes = [
  {
    path: "/",
    name: "Auth",
    component: AuthView
  },
  {
    path: "/home",
    name: "Home",
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: "/recharge",
    name: "Recharge",
    component: RechargeView,
    meta: { requiresAuth: true }
  },
  {
    path: "/share",
    name: "Share",
    component: ShareView,
    meta: { requiresAuth: true }
  },
  {
    path: "/team",
    name: "Team",
    component: TeamView,
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin
  },

  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAdmin: true }
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

// router.beforeEach((to, from, next) => {

//   const token = localStorage.getItem("token");

//   // Not logged in
//   if (to.meta.requiresAuth && !token) {
//     return next("/");
//   }

//   // Already logged in
//   if (to.path === "/" && token) {
//     return next("/home");
//   }

//   next();
// });
router.beforeEach((to) => {

    const userToken = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");
    const role = localStorage.getItem("role");

    // Admin routes
    if (to.path.startsWith("/admin")) {

        // Allow admin login page without token
        if (to.path === "/admin/login") {
            return true;
        }

        // Dashboard requires admin login
        // Only protect admin routes that require admin authentication
    if (
        to.meta.requiresAdmin &&
        (!adminToken || role !== "ADMIN")
    ) {
        return "/admin/login";
    }

        return true;
    }

    // User routes
    if (to.meta.requiresAuth && !userToken) {
        return "/";
    }

    // Already logged in user
    if (to.path === "/" && userToken) {
        return "/home";
    }

    return true;

});
export default router;