// src/stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    users: JSON.parse(localStorage.getItem("users")) || [],
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  }),

  actions: {
    // ✅ Sign up new user
    signup(email, password) {
      const exists = this.users.find((u) => u.email === email);
      if (exists) {
        alert("User already exists!");
        return false;
      }

      const newUser = { email, password };
      this.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(this.users));
      this.currentUser = newUser;
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      return true;
    },

    // ✅ Log in user
    login(email, password) {
      const user = this.users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        this.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        return true;
      } else {
        return false;
      }
    },

    // ✅ Log out user
    logout() {
      this.currentUser = null;
      localStorage.removeItem("currentUser");
    },

    // ✅ Check authentication
    isAuthenticated() {
      return !!this.currentUser;
    },
  },
});