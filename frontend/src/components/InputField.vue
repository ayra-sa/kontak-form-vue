<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String],
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const onInput = (event) => {
  const target = event.target;
  emit("update:modelValue", target.value);
};

const onChange = (event) => {
  const target = event.target;
  emit("change", target.value);
};
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <label :for="id">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      :value="modelValue"
      @change="onChange"
      @input="onInput"
      class="border border-slate-100 rounded-sm px-3 py-2"
    />
  </div>
</template>
