const User = require('./user');
const Ticket = require('./ticket');
const TestUnit = require('./testunit');

const models = { User, Ticket, TestUnit };

Object.values(models).forEach(model => {
    if (typeof model.associate === 'function') {
        model.associate(models);
    }
});

module.exports = models;
