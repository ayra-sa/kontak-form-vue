<script setup>
import { ref } from "vue";
import InputField from "./InputField.vue";
import http from "../http-common";
import { useRouter } from "vue-router";

const formData = ref({
  username: "",
  password: "",
});

const router = useRouter();

const handleSubmitForm = async () => {
  try {
    const res = await http.post("/login", formData.value);
    localStorage.setItem("contact_token", res.data.token);
    router.push("/admin");
} catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <section class="flex flex-col place-content-center items-center h-screen">
    <div class="w-1/2 xl:w-1/3">
      <h2 class="text-center font-semibold text-3xl mb-10">Login</h2>

      <form @submit.prevent="handleSubmitForm" class="space-y-3">
        <InputField
          id="username"
          type="text"
          label="Username"
          v-model="formData.username"
        />
        <InputField
          id="password"
          type="password"
          label="Password"
          v-model="formData.password"
        />

        <button
          type="submit"
          class="bg-blue-500 !mt-8 text-white font-semibold px-10 py-2 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  </section>
</template>
