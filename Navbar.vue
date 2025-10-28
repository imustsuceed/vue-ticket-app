<template>
  <header class="navbar">
    <h3>Dashboard</h3>
    <div class="profile">{{ userEmail }}</div>
  </header>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
const userEmail = auth.user?.email || "User";
</script>

<style scoped>
.navbar {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
}
.profile {
  font-weight: 600;
  color: #4f46e5;
}
</style>