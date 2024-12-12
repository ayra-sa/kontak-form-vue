<script setup>
import { onMounted, ref } from "vue";
import http from "../http-common";
import Swal from "sweetalert2";
import moment from "moment"

const thClass = "py-3"
const thData = ['Id', 'Name', 'Email', 'Message', 'Created', 'Action']

const contacts = ref([]);
const loading = ref(false)

const fetchContacts = async () => {
  try {
    loading.value = true
    const res = await http.get("/contact");
    contacts.value = res.data;
  } catch (error) {
    console.error(error);
    contacts.value = []
  } finally {
    loading.value = false
  }
};

const handleDelete = async (id) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure want to delete this?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    })

    if (!result.isConfirmed) return
    await http.delete(`/contact/${id}`)
    Swal.fire("Deleted", "Your contact has been deleted.", "success")
    fetchContacts()
  } catch (error) {
    Swal.fire("Ooops..", 'Failed to delete this contact. Please try again', 'error')
    console.error(error)
  }
}

onMounted(() => {
  fetchContacts();
});
</script>

<template>
  <section>
    <div class="container">
      <h2 class="mt-10 text-2xl font-bold">List Contacts</h2>

      <table class="table-auto mt-10 w-full">
        <thead class="border-b border-b-slate-200">
          <tr>
            <th v-for="(item, index) in thData" :key="index" :class="thClass">{{ item }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading">
            <tr>
              <td colspan="6" class="text-center py-4">
                <span>Loading..</span>
              </td>
            </tr>
          </template>
          <template v-else-if="contacts.length === 0">
            <tr>
              <td colspan="6" class="font-semibold text-center py-4">Data not found</td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="(item, index) in contacts" :key="index">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.message }}</td>
              <td>{{ moment(item.createdAt).startOf('day').fromNow() }}</td>
              <td>
                <button class="text-red-500 font-semibold text-sm underline" @click="handleDelete(item.id)">Delete</button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </section>
</template>
