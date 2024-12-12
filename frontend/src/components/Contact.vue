<script setup>
import http from "../http-common"
import InputField from "../components/InputField.vue";
import { ref } from "vue";
import Swal from "sweetalert2";

const initial = {
  name: "",
  email: "",
  message: "",
}

const form = ref({...initial});


const handleSendForm = async () => {
  try {
    await http.post("/contact", form.value)
    Swal.fire("Success", "Contact created successfully", 'success')
    form.value = {...initial}
  } catch (error) {
    Swal.fire("Ooops..", "Failed to add contact. Please try again!", 'error')
    console.error(error)
  }
}
</script>

<template>
  <section class="flex flex-col place-content-center items-center h-screen">
    <div class="w-1/2 xl:w-1/3 border border-slate-100 rounded-md p-5 shadow-sm">
      <h2 class="text-xl font-bold mb-10 text-center">Contact Me</h2>
  
      <form @submit.prevent="handleSendForm">
        <div class="mb-10 space-y-4">
          <InputField id="name" type="text" label="Name" v-model="form.name" />
          <InputField
            id="email"
            type="email"
            label="Email"
            v-model="form.email"
          />
          <div>
            <label for="msg">Message</label>
            <textarea class="mt-2 border border-slate-100 rounded-sm px-3 py-2 w-full" name="msg" id="msg" v-model="form.message"></textarea>
          </div>
        </div>
  
        <button
          type="submit"
          class="w-full bg-blue-500 font-semibold text-white rounded-sm p-3 text-lg"
        >
          Send
        </button>
      </form>
    </div>
  </section>
</template>
