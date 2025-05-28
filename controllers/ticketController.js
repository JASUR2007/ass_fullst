const { Ticket, User } = require('../models');

exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      include:
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email', 'phone_number'],
        },

    });
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении заявок', error: err.message });
  }
};

exports.getIdTickets = async (req, res) => {
  const userId = req.query.user_id;
  try {
    const tickets = await Ticket.findAll({
      where: { user_id: userId },
    });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const {
      user_id,
      issue_type,
      description,
      computer_model,
      status,
      scheduled_date,
      estimate_price
    } = req.body;

    const newTicket = await Ticket.create({
      user_id,
      issue_type,
      description,
      computer_model,
      status,
      scheduled_date,
      estimate_price
    });

    res.status(201).json(newTicket);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при создании заявки', error: err.message });
  }
};

exports.deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    await ticket.destroy();
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete ticket', message: err.message });
  }
};

exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const {
    issue_type,
    description,
    computer_model,
    status,
    scheduled_date,
    estimate_price,
  } = req.body;
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    await ticket.update({
      issue_type,
      description,
      computer_model,
      status,
      scheduled_date,
      estimate_price
    });

    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update ticket', message: err.message });
  }
};
