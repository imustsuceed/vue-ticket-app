import { defineStore } from 'pinia';

export const useTicketsStore = defineStore('tickets', {
  state: () => ({
    tickets: []
  }),
  actions: {
    createTicket(ticket) {
      this.tickets.push(ticket);
    },
    updateTicket(updatedTicket) {
      const index = this.tickets.findIndex(t => t.id === updatedTicket.id);
      if (index !== -1) this.tickets[index] = updatedTicket;
    },
    deleteTicket(id) {
      this.tickets = this.tickets.filter(t => t.id !== id);
    }
  }
});
