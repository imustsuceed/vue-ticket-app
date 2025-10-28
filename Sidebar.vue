<template>
  <aside class="sidebar">
    <h2>TicketFlow</h2>
    <nav>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/tickets">Tickets</router-link>
      <button @click="logout">Logout</button>
    </nav>
  </aside>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();

function logout() {
  auth.logout();
  router.push("/login");
}
</script>

<style scoped>
.sidebar {
  background: #1e1b4b;
  color: white;
  min-width: 220px;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar h2 {
  font-size: 1.3rem;
  font-weight: 700;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

a {
  color: #c7d2fe;
  text-decoration: none;
  font-weight: 500;
}

a.router-link-exact-active {
  color: white;
  font-weight: 700;
}

button {
  background: #ef4444;
  border: none;
  padding: 0.6rem 1rem;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
}
button:hover {
  background: #dc2626;
}
</style>
