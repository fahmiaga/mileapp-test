<template>
  <div class="login-page">
    <h2>Login</h2>
    <form @submit.prevent="doLogin">
      <div>
        <label>Email</label>
        <input v-model="email" type="email" style="margin-top: 4px;" required />
      </div>
      <div style="margin-top: 16px;">
        <label>Password</label>
        <input v-model="password" type="password" style="margin-top: 4px;" required />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? "Loading..." : "Login" }}
      </button>
    </form>

    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "../api";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const error = ref("");
    const router = useRouter();

    const doLogin = async () => {
      loading.value = true;
      error.value = "";
      try {
        // Kirim ke backend
        const res = await api.post("/login", { email: email.value, password: password.value });

        // Simpan token
        localStorage.setItem("token", res.data.token);

        // Redirect
        router.push("/tasks");
      } catch (err) {
        error.value = err.response?.data?.error || "Login failed";
      } finally {
        loading.value = false;
      }
    };

    return { email, password, loading, error, doLogin };
  }
};
</script>

<style>
.login-page {
  max-width: 300px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  width: 100%;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

button {
  margin-top: 12px;
  padding: 8px;
  border-radius: 6px;
}
</style>
