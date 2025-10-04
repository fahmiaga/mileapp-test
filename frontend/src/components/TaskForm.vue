<template>
  <div class="task-form">
    <h3>{{ editMode ? 'Edit Task' : 'New Task' }}</h3>
    <form @submit.prevent="onSubmit">
      <input v-model="dto.title" placeholder="Title" required />
      <textarea v-model="dto.description" placeholder="Description" required></textarea>
      <select v-model="dto.status" required>
        <option value="pending">Pending</option>
        <option value="done">Done</option>
        <option value="In Progress">In Progress</option>
      </select>
      <div style="margin-top:8px">
        <button type="submit">{{ editMode ? 'Save' : 'Create' }}</button>
        <button type="button" @click="$emit('cancel')" style="margin-left:8px">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: { initial: { type: Object, default: null } },
  emits: ['saved', 'cancel'],
  setup(props, { emit }) {
    const editMode = ref(!!props.initial);
    const dto = ref({ title: '', description: '', status: 'pending' });

    watch(
      () => props.initial,
      (v) => {
        if (v) dto.value = { title: v.title, description: v.description, status: v.status };
        editMode.value = !!v;
      },
      { immediate: true }
    );

    const onSubmit = () => emit('saved', { ...dto.value });
    return { dto, onSubmit, editMode };
  },
};
</script>

<style>
.task-form input,
.task-form textarea,
.task-form select {
  width: 100%;
  padding: 8px;
  margin-top: 6px;
}
</style>
