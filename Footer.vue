<template>
  <footer class="app-footer">
    <div class="footer-container">
      <p>&copy; 2025 TicketFlow. All rights reserved.</p>
      <div class="social-icons">
        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        <a href="#" aria-label="GitHub"><i class="fab fa-github"></i></a>
        <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.app-footer {
  background-color: #4f46e5;
  color: white;
  padding: 2rem 1.5rem;
  margin-top: 3rem;
}

.footer-container {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.footer-container p {
  margin: 0;
}

.social-icons a {
  margin: 0 0.5rem;
  color: white;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: #d1d5db;
}

/* Responsive behavior */
@media (min-width: 768px) {
  .footer-container {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}
</style>