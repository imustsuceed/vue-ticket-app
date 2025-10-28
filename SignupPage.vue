<template>
  <section class="auth-page">
    <div class="auth-card">
      <h2>Create Account</h2>

      <form @submit.prevent="handleSignup">
        <input v-model="name" type="text" placeholder="Full Name" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />

        <button type="submit">Sign Up</button>
      </form>

      <p class="switch-link">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();
const auth = useAuthStore();

function handleSignup() {
  if (!name.value || !email.value || !password.value) {
    alert("Please fill in all fields!");
    return;
  }

  const success = auth.signup(email.value, password.value);
  if (success) {
    alert("Account created successfully!");
    router.push("/dashboard");
  } else {
    alert("Signup failed. Try again!");
  }
}
</script>


<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  padding: 1rem;
}

.auth-card {
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: fadeIn 0.8s ease-in-out;
}

.auth-card h2 {
  font-size: 1.75rem;
  color: #4f46e5;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  outline: none;
}

button {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 0.9rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

button:hover {
  background: #3730a3;
  transform: translateY(-2px);
}

.auth-link {
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #555;
}

.auth-link a {
  color: #4f46e5;
  font-weight: 600;
  text-decoration: none;
}

.auth-link a:hover {
  text-decoration: underline;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .auth-card {
    padding: 2rem 1.5rem;
  }
}
</style>
