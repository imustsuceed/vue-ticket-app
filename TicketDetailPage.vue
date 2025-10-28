<template>
  <section class="tickets-page">
    <h1>Support Tickets</h1>

    <!-- New Ticket Button -->
    <div class="ticket-actions">
      <button class="btn-new" @click="createNewTicket">New Ticket</button>
      <input v-model="searchQuery" placeholder="Search tickets..." />
    </div>

    <!-- Filter Section -->
    <div class="filters">
      <select v-model="filterStatus">
        <option value="">All Status</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <select v-model="filterPriority">
        <option value="">All Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>

    <!-- Tickets Grid -->
    <div class="tickets-grid">
      <div
        v-for="ticket in filteredTickets"
        :key="ticket.id"
        class="ticket-card"
        @click="openTicket(ticket.id)"
        tabindex="0"
      >
        <h2>{{ ticket.title }}</h2>
        <p>{{ ticket.description.substring(0, 50) }}...</p>
        <div class="badges">
          <span :class="['status', ticket.status]">{{ formatStatus(ticket.status) }}</span>
          <span :class="['priority', ticket.priority]">{{ ticket.priority }}</span>
        </div>
        <p class="created">Created: {{ formatDate(ticket.createdAt) }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTicketsStore } from '../stores/tickets';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { v4 as uuidv4 } from 'uuid';

const router = useRouter();
const ticketsStore = useTicketsStore();
const toast = useToast();

const searchQuery = ref('');
const filterStatus = ref('');
const filterPriority = ref('');

// Computed filtered tickets
const filteredTickets = computed(() => {
  return ticketsStore.tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus = filterStatus.value ? ticket.status === filterStatus.value : true;
    const matchesPriority = filterPriority.value ? ticket.priority === filterPriority.value : true;
    return matchesSearch && matchesStatus && matchesPriority;
  });
});

// Helper functions
const formatStatus = (status) => {
  if (status === 'open') return 'Open';
  if (status === 'in_progress') return 'In Progress';
  return 'Closed';
};
const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

// Actions
const openTicket = (id) => router.push(`/tickets/${id}`);
const createNewTicket = () => {
  const title = prompt('Enter ticket title:');
  if (!title) return toast.error('Title is required');
  const description = prompt('Enter description:');
  const priority = prompt('Priority (High, Medium, Low):', 'Medium');
  const status = 'open';

  ticketsStore.createTicket({
    id: uuidv4(),
    title,
    description,
    status,
    priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  toast.success('Ticket created successfully!');
};
</script>

<style scoped>
.tickets-page {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: 'Inter', sans-serif;
}

.ticket-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

.btn-new {
  background-color: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
}

input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

select {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
}

.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.ticket-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.ticket-card:hover,
.ticket-card:focus {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.ticket-card h2 {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.badges {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.status.open { background-color: #dcfce7; color: #166534; padding: 0.25rem 0.5rem; border-radius: 0.5rem; }
.status.in_progress { background-color: #fef9c3; color: #92400e; padding: 0.25rem 0.5rem; border-radius: 0.5rem; }
.status.closed { background-color: #f3f4f6; color: #374151; padding: 0.25rem 0.5rem; border-radius: 0.5rem; }

.priority.High { background-color: #f87171; color: white; padding: 0.25rem 0.5rem; border-radius: 0.5rem; }
.priority.Medium { background-color: #fbbf24; color: white; padding: 0.25rem 0.5rem; border-radius: 0.5rem; }
.priority.Low { background-color: #34d399; color: white; padding: 0.25rem 0.5rem; border-radius: 0.5rem; }

.created {
  font-size: 0.875rem;
  opacity: 0.7;
}
</style>