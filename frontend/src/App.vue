<template>
  <div id="app">
    <header class="header">
      <h1 @click="goHome" style="cursor:pointer">MileApp Tasks</h1>
      <div v-if="token">
        <button @click="logout">Logout</button>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>


<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';


export default {
  setup() {
    const router = useRouter();
    const token = computed(() => localStorage.getItem('token'));
    const logout = () => {
      localStorage.removeItem('token');
      router.push('/login');
    };
    const goHome = () => router.push('/tasks');


    return { token, logout, goHome };
  }
};
</script>


<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #0f172a;
  color: #fff
}

.header h1 {
  margin: 0;
  font-size: 18px
}

main {
  padding: 20px
}

button {
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer
}
</style>