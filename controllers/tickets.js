const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

async function create(req, res) {
  const flight = await Flight.findById(req.params.id);
  try {
    await Ticket.create({
      flight: req.params.id,
      ...req.body,
    });
    flight.tickets.push({
      flight: req.params.id,
      ...req.body,
    });
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
  } catch (err) {
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}

async function newTicket(req, res) {
  res.render('tickets/new', {
    title: 'Add Ticket',
    Ticket,
    flightID: req.params.id,
  });
}

module.exports = {
  create,
  new: newTicket,
};
