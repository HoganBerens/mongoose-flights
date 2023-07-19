const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

function newFlight(req, res) {
  res.render('flights/new', { error: '' });
}

async function create(req, res) {
  try {
    await Flight.create(req.body);
    res.redirect('/flights');
  } catch (err) {
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}

async function show(req, res) {
  try {
    const flight = await Flight.findById(req.params.id).populate('tickets');

    if (flight) {
      const tickets = await Ticket.find({ _id: { $nin: flight.ticket } }).sort(
        'name'
      );
      flight.tickets.push(tickets);
      res.render('flights/show', { title: 'Flight Detail', flight, tickets });
    }
  } catch (err) {
    console.log('Error in flightsShowFunction', err);
  }
}

async function index(req, res) {
  res.render('flights/index', {
    flights: await Flight.find(),
  });
}

module.exports = {
  new: newFlight,
  create,
  index,
  show,
};
