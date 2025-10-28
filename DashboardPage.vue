<template>
  <div class="dashboard">
     <button @click="handleLogout" class="logout-btn">Logout</button>

    <!-- ===== Hero Section ===== -->
    <section class="hero-section" aria-labelledby="dashboard-hero-title">
      <h1 id="dashboard-hero-title">Welcome to Your Ticket Dashboard</h1>
      <p>
        Manage, track, and resolve tickets efficiently with real-time insights.
      </p>

      <!-- Wavy SVG background (same as your React version) -->
      <svg
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill="#ffffff"
          fill-opacity="1"
          d="M0,256L48,224C96,192,192,128,288,122.7C384,117,480,171,576,192C672,213,768,203,864,197.3C960,192,1056,192,1152,186.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </section>

    <!-- ===== Stats Section ===== -->
    <section class="stats-section" aria-label="ticket statistics">
      <div class="stat-card open" tabindex="0">
        <h2>Open Tickets</h2>
        <p>{{ counts.open }}</p>
      </div>

      <div class="stat-card in-progress" tabindex="0">
        <h2>In Progress</h2>
        <p>{{ counts.in_progress }}</p>
      </div>

      <div class="stat-card closed" tabindex="0">
        <h2>Closed</h2>
        <p>{{ counts.closed }}</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useTicketsStore } from "../stores/tickets";

/*
  This component reads tickets from your Pinia tickets store and computes:
   - open
   - in_progress
   - closed

  It normalizes common status variants (e.g. "In Progress", "in_progress", "pending")
  so counts will reflect tickets regardless of small status naming differences.
*/

const auth = useAuthStore();
const ticketsStore = useTicketsStore();
const router = useRouter();

// ensure tickets exist (ticketsStore.tickets should be reactive array)
const tickets = computed(() => ticketsStore.tickets || []);

// helper to normalize status to one of: open, in_progress, closed
function normalizeStatus(raw) {
  if (!raw) return "open";
  const s = String(raw).trim().toLowerCase();
  if (s === "open") return "open";
  if (s === "in_progress" || s === "in progress" || s === "inprogress") return "in_progress";
  if (s === "pending") return "in_progress"; // treat pending as in_progress
  if (s === "resolved" || s === "closed" || s === "done") return "closed";
  // fallback: consider non-empty as open
  return "open";
}

const counts = computed(() => {
  const result = { open: 0, in_progress: 0, closed: 0 };
  for (const t of tickets.value) {
    const s = normalizeStatus(t.status);
    if (s === "open") result.open++;
    else if (s === "in_progress") result.in_progress++;
    else if (s === "closed") result.closed++;
  }
  return result;
});

// optional: if you want a logout flow available from this page
const handleLogout = () => {
  auth.logout();
  router.push("/"); // ✅ Send user to Landing Page
};
</script>

<style scoped>
/* ===============================
   Dashboard Layout and Hero Styling
   =============================== */

.dashboard {
  font-family: "Inter", sans-serif;
  color: #333;
  background-color: #f9fafb;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ========== HERO SECTION ========== */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  color: white;
  text-align: center;
  padding: 6rem 1.5rem;
  overflow: hidden;
}

/* Decorative Circle */
.hero-section::before {
  content: "";
  position: absolute;
  top: 2rem;
  right: 8rem;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(30px);
  z-index: 1;
}

/* Secondary Circle */
.hero-section::after {
  content: "";
  position: absolute;
  bottom: 3rem;
  left: 6rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(20px);
  z-index: 1;
}

/* Hero text */
.hero-section h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  z-index: 2;
  position: relative;
}

.hero-section p {
  font-size: 1.125rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* Wave SVG */
.hero-section svg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: block;
  z-index: 0;
}

/* ========== STATS SECTION ========== */
.stats-section {
  max-width: 1440px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

/* Card Boxes */
.stat-card {
  background: #ffffff;
  border-radius: 1.5rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.stat-card:hover,
.stat-card:focus {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.stat-card h2 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.stat-card p {
  font-size: 2rem;
  font-weight: 700;
}

/* Status Colors */
.stat-card.open {
  background-color: #dcfce7;
  color: #166534;
}

.stat-card.in-progress {
  background-color: #fef9c3;
  color: #92400e;
}

.stat-card.closed {
  background-color: #f3f4f6;
  color: #374151;
}

/* ========== RESPONSIVE BEHAVIOR ========== */
@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 1rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .hero-section p {
    font-size: 1rem;
  }

  .stats-section {
    padding: 2.5rem 1rem;
  }
}

/* Focus state for accessibility */
button:focus,
a:focus,
div:focus {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}
.logout-btn {
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  float: right;
  margin: 1rem;
  transition: background 0.2s ease;
}

.logout-btn:hover {
  background: #dc2626;
}
</style>