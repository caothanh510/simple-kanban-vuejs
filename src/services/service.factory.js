import TicketService from "./ticket.service"

const repositories = {
  ticket: TicketService,
}

export const ServiceFactory = {
  get: name => repositories[name],
}
