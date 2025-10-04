<template>
  <!-- Filter -->
  <div class="filters">
    <select v-model="filters.status">
      <option value="">All Status</option>
      <option value="pending">Pending</option>
      <option value="done">Done</option>
      <option value="in progress">In Progress</option>
    </select>

    <input type="text" v-model="filters.search" placeholder="Search title or description..." />
  </div>

  <!-- Button create -->
  <div style="margin:12px 0">
    <button @click="showCreate = true" v-if="!showCreate && !editing">+ New Task</button>
  </div>

  <!-- Form -->
  <div v-if="showCreate || editing" style="margin-top:16px;border:1px solid #ddd;padding:12px;border-radius:8px">
    <TaskForm :initial="editing" @saved="onSaved" @cancel="onCancel" />
  </div>

  <!-- Table -->
  <div class="table-responsive">
    <table>
      <thead>
        <tr>
          <th @click="changeSort('title')" class="sortable">
            Title
            <span v-if="filters.sort.startsWith('title:')">
              {{ filters.sort.endsWith('asc') ? '▲' : '▼' }}
            </span>
            <span v-else class="inactive">⇅</span>
          </th>
          <th @click="changeSort('status')" class="sortable">
            Status
            <span v-if="filters.sort.startsWith('status:')">
              {{ filters.sort.endsWith('asc') ? '▲' : '▼' }}
            </span>
            <span v-else class="inactive">⇅</span>
          </th>
          <th>Description</th>
          <th @click="changeSort('created_at')" class="sortable">
            Created At
            <span v-if="filters.sort.startsWith('created_at:')">
              {{ filters.sort.endsWith('asc') ? '▲' : '▼' }}
            </span>
            <span v-else class="inactive">⇅</span>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in tasks" :key="t.id">
          <td>{{ t.title }}</td>
          <td>{{ t.status }}</td>
          <td>{{ t.description }}</td>
          <td>{{ formatDate(t.created_at) }}</td>
          <td>
            <button @click="editTask(t)" style="margin-right: 8px;background-color: aquamarine;">Edit</button>
            <button @click="deleteTask(t.id)" style="margin-right: 8px;background-color: tomato;">Delete</button>
          </td>
        </tr>
        <tr v-if="!tasks.length">
          <td colspan="5">No tasks found</td>
        </tr>
      </tbody>
    </table>
  </div>


  <!-- Pagination -->
  <div class="pagination-wrapper">
    <div class="pagination-info">
      <p>Page {{ pagination.page }} of {{ meta.totalPages }} • Showing {{ meta.count }} of {{ meta.total }} entries
      </p>
    </div>
    <div class="pagination-button">
      <!-- Prev -->
      <button :disabled="pagination.page <= 1" @click="goPage(pagination.page - 1)">
        < </button>

          <!-- Page numbers -->
          <button v-for="n in meta.totalPages" :key="n" @click="goPage(n)" :class="{ active: n === pagination.page }">
            {{ n }}
          </button>

          <!-- Next -->
          <button :disabled="pagination.page >= meta.totalPages" @click="goPage(pagination.page + 1)">></button>
    </div>
  </div>
</template>

<script>
import api from '../api';
import { ref, onMounted, watch } from 'vue';
import TaskForm from '../components/TaskForm.vue';

export default {
  components: { TaskForm },
  setup() {
    const tasks = ref([]);
    const meta = ref({ total: 0 });
    const loading = ref(false);
    const showCreate = ref(false);
    const editing = ref(null);

    // filters
    const filters = ref({
      status: '',
      search: '',
      sort: 'created_at:desc'
    });
    const pagination = ref({ page: 1, limit: 10 });

    const changeSort = (field) => {
      const [currentField, currentOrder] = filters.value.sort.split(":");
      if (currentField === field) {
        filters.value.sort = `${field}:${currentOrder === "asc" ? "desc" : "asc"}`;
      } else {
        filters.value.sort = `${field}:asc`;
      }
    };


    const fetchTasks = async () => {
      loading.value = true;
      try {
        const res = await api.get('/tasks', {
          params: {
            status: filters.value.status,
            search: filters.value.search,
            sort: filters.value.sort,
            page: pagination.value.page,
            limit: pagination.value.limit
          }
        });
        tasks.value = res.data.data;
        meta.value = res.data.meta;
      } catch (err) {
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchTasks);

    watch(filters, () => {
      pagination.value.page = 1;
      fetchTasks();
    }, { deep: true });

    watch(() => pagination.value.page, () => {
      fetchTasks();
    });

    const onSaved = async (payload) => {
      try {
        if (editing.value) {
          await api.put(`/tasks/${editing.value.id}`, payload);
          editing.value = null;
        } else {
          await api.post('/tasks', payload);
          showCreate.value = false;
        }
        fetchTasks();
      } catch (err) {
        console.error('API error:', err.response?.data || err.message);
      }
    };

    const editTask = (t) => { editing.value = t };
    const onCancel = () => { showCreate.value = false; editing.value = null };
    const deleteTask = async (id) => {
      if (!confirm('Delete task?')) return;
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    };
    const goPage = (p) => { pagination.value.page = p };
    const formatDate = (d) => {
      const date = new Date(d);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    };

    return {
      tasks, meta, loading, showCreate, editing,
      filters, pagination, onSaved, editTask,
      onCancel, deleteTask, goPage, formatDate, changeSort
    };
  }
};
</script>

<style scoped>
.filters {
  display: flex;
  gap: 10px;
  margin: 12px 0;
}

.filters select,
.filters input {
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 6px;
  border-radius: 4px;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 12px;
  text-align: left;
}

th {
  background: #f5f5f5;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #e9e9e9;
}

tr:hover {
  background-color: #f0f0f0;
}

.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-family: Arial, sans-serif;
  flex-wrap: wrap;
  gap: 8px;
}

.pagination-info {
  font-size: 14px;
  color: #555;
}

.pagination-button {
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
}

.pagination-button button {
  border: 1px solid #ddd;
  background: white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 36px;
}

.pagination-button button:hover:not(:disabled) {
  border-color: #28334b;
  color: #6d6d6d;
}

.pagination-button button.active {
  background: #0f172a;
  color: white;
  border-color: #0f172a;
  font-weight: bold;
}

.pagination-button button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sortable {
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.sortable span {
  margin-left: 4px;
  font-size: 12px;
}

.sortable .inactive {
  color: #bbb;
}

@media (max-width: 768px) {
  table {
    font-size: 12px;
  }

  th,
  td {
    padding: 6px 8px;
  }
}

@media (max-width: 480px) {
  .filters {
    flex-direction: column;
  }

  .pagination-wrapper {
    flex-direction: column;
    gap: 8px;
  }
}

@media (max-width: 600px) {
  .pagination-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
