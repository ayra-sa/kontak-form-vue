<script setup>
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const isLoggedIn = ref(false);
const router = useRouter();

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem("contact_token");
});

const handleLogout = async () => {
  const result = await Swal.fire({
    title: "Are you sure want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes!",
  });
  if (!result.isConfirmed) return
  Swal.fire("Logout", "Logout successfully", "success");
  localStorage.removeItem("contact_token");
  isLoggedIn.value = false;

  router.push("/login");
};
</script>

<template>
  <header class="py-5 w-full border-b border-b-slate-200">
    <nav>
      <div class="container">
        <div class="flex items-center justify-between">
          <a href="/">Kontak App</a>

          <RouterLink v-if="!isLoggedIn" to="/login">
            <button
              class="bg-blue-500 font-semibold text-white rounded-md px-5 py-2"
            >
              Login
            </button>
          </RouterLink>
          <div v-else class="flex items-center gap-x-3">
            <RouterLink to="/admin">
              <button
                class="bg-blue-500 font-semibold text-white rounded-md px-5 py-2"
              >
                Admin
              </button>
            </RouterLink>
            <button
              @click="handleLogout"
              class="bg-transparent border border-blue-500 font-semibold text-blue-500 rounded-md px-5 py-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
