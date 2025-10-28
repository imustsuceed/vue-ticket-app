<template>
  <section class="landing">
    <!-- Hero Section -->
    <div class="hero-section">
      <h1 class="hero-title">🎫 TicketFlow</h1>
      <p class="hero-text">
        Simplify your workflow — create, manage, and track support tickets efficiently.
      </p>

      <div class="hero-buttons">
        <router-link to="/login" class="btn btn-primary">Login</router-link>
        <router-link to="/signup" class="btn btn-secondary">Get Started</router-link>
      </div>

      <!-- Decorative Circles -->
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>

      <!-- Wavy Divider -->
      <svg class="wave" viewBox="0 0 1440 320">
        <path
          fill="#ffffff"
          fill-opacity="1"
          d="M0,256L48,224C96,192,192,128,288,122.7C384,117,480,171,576,192C672,213,768,203,864,197.3C960,192,1056,192,1152,186.7C1248,181,1344,171,1392,165.3L1440,160V320H0Z"
        ></path>
      </svg>
    </div>

    <!-- Features Section -->
    <div class="features">
      <div class="feature-card">
        <h3>📋 Easy Ticket Creation</h3>
        <p>Create and organize support tickets with just a few clicks.</p>
      </div>
      <div class="feature-card">
        <h3>📊 Smart Dashboard</h3>
        <p>View all your tickets at a glance with live status tracking.</p>
      </div>
      <div class="feature-card">
        <h3>🔔 Real-Time Updates</h3>
        <p>Stay informed with instant updates and progress tracking.</p>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </section>
</template>

<script setup>
import Footer from "../components/Footer.vue";
</script>

<style scoped>
.landing {
  font-family: "Inter", sans-serif;
  text-align: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section {
  padding: 6rem 1.5rem;
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
  z-index: 2; /* ✅ ensure hero content is above SVG */
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.hero-buttons .btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  margin: 0 0.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  z-index: 3; /* ✅ make sure buttons stay clickable */
}

.btn-primary {
  background-color: #ffffff;
  color: #4f46e5;
}

.btn-primary:hover {
  background-color: #e5e7eb;
}

.btn-secondary {
  background-color: #4f46e5;
  color: #ffffff;
}

.btn-secondary:hover {
  background-color: #3730a3;
}

/* Decorative Circles */
.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(30px);
  z-index: 1; /* ✅ lower than content */
}

.circle-1 {
  width: 8rem;
  height: 8rem;
  top: 2rem;
  right: 8rem;
}

.circle-2 {
  width: 5rem;
  height: 5rem;
  bottom: 3rem;
  left: 6rem;
}

/* Wavy SVG */
svg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: block;
  z-index: 0; /* ✅ move it below everything else */
  pointer-events: none; /* ✅ allows clicks through it */
}
</style>