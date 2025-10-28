<template>
  <div class="tickets-page">
    <!-- ===== Header Section ===== -->
    <section class="tickets-header">
      <h1>Your Support Tickets</h1>
      <p>Track and manage your tickets efficiently.</p>

      <!-- Create New Ticket -->
      <form class="ticket-form" @submit.prevent="addTicket">
        <input v-model="newTitle" type="text" placeholder="Ticket Title" required />
        <textarea
          v-model="newDescription"
          placeholder="Ticket Description"
          rows="2"
          required
        ></textarea>
        <select v-model="newStatus">
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <button type="submit">Add Ticket</button>
      </form>
    </section>

    <!-- ===== Ticket Filter Buttons ===== -->
    <div class="filter-buttons">
      <button
        v-for="filter in filters"
        :key="filter"
        :class="{ active: activeFilter === filter }"
        @click="activeFilter = filter"
      >
        {{ capitalize(filter) }}
      </button>
    </div>

    <!-- ===== Ticket Grid ===== -->
    <section class="tickets-grid">
      <div
        v-for="ticket in filteredTickets"
        :key="ticket.id"
        class="ticket-card"
        :class="ticket.status"
      >
        <h2>{{ ticket.title }}</h2>
        <p class="desc">{{ ticket.description }}</p>
        <p class="meta">
          <span>{{ formatStatus(ticket.status) }}</span> •
          <small>{{ formatDate(ticket.createdAt) }}</small>
        </p>
        <div class="actions">
          <button class="delete" @click="deleteTicket(ticket.id)">Delete</button>
        </div>
      </div>

      <p v-if="filteredTickets.length === 0" class="no-tickets">
        No tickets found for this category.
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTicketsStore } from "../stores/tickets";
import { useToast } from "vue-toastification";

const ticketsStore = useTicketsStore();
const toast = useToast();

const newTitle = ref("");
const newDescription = ref("");
const newStatus = ref("open");
const activeFilter = ref("all");
const filters = ["all", "open", "in_progress", "closed"];

// Add ticket
function addTicket() {
  if (!newTitle.value || !newDescription.value) {
    toast.error("Please fill in all fields!");
    return;
  }

  ticketsStore.createTicket({
    title: newTitle.value,
    description: newDescription.value,
    status: newStatus.value,
  });

  toast.success("Ticket created successfully!");
  newTitle.value = "";
  newDescription.value = "";
  newStatus.value = "open";
}

// Delete ticket
function deleteTicket(id) {
  ticketsStore.deleteTicket(id);
  toast.info("Ticket deleted.");
}

// Filter tickets dynamically
const filteredTickets = computed(() => {
  if (activeFilter.value === "all") return ticketsStore.tickets;
  return ticketsStore.tickets.filter(
    (t) => t.status === activeFilter.value
  );
});

// Utilities
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatStatus(status) {
  const map = {
    open: "Open",
    in_progress: "In Progress",
    closed: "Closed",
  };
  return map[status] || "Open";
}

function capitalize(word) {
  return word.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
</script>

<style scoped>
/* ===============================
   Tickets Page Styling
   =============================== */
.tickets-page {
  font-family: "Inter", sans-serif;
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9fafb;
}

/* Header section */
.tickets-header {
  text-align: center;
  margin-bottom: 3rem;
}

.tickets-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
}

.tickets-header p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

/* Create Ticket Form */
.ticket-form {
  display: grid;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.ticket-form input,
.ticket-form textarea,
.ticket-form select {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 1rem;
}

.ticket-form button {
  background: #4f46e5;
  color: #fff;
  border: none;
  padding: 0.8rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.ticket-form button:hover {
  background: #3730a3;
}

/* Filter buttons */
.filter-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.filter-buttons button {
  border: 1px solid #d1d5db;
  background: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.filter-buttons button.active {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

/* Tickets grid */
.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.ticket-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.ticket-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.ticket-card h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.ticket-card .desc {
  color: #4b5563;
  margin-bottom: 1rem;
}

.ticket-card .meta {
  font-size: 0.9rem;
  color: #6b7280;
}

.ticket-card.open {
  border-left: 5px solid #16a34a;
}
.ticket-card.in_progress {
  border-left: 5px solid #facc15;
}
.ticket-card.closed {
  border-left: 5px solid #9ca3af;
}

.actions {
  margin-top: 1rem;
}

.actions .delete {
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 0.5rem 0.9rem;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.actions .delete:hover {
  background: #dc2626;
}

.no-tickets {
  text-align: center;
  color: #6b7280;
  font-size: 1rem;
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .ticket-form {
    width: 100%;
  }
  .tickets-header h1 {
    font-size: 1.5rem;
  }
}
</style>