const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const supportRoutes = require('./routes/supportRoutes');
const jobScheduleRoutes = require('./routes/jobScheduleRoutes');
const sparePartRoutes = require('./routes/sparePartRoutes');
const knowledgeBaseRoutes = require('./routes/knowledgeBaseRoutes');
const userRoutes = require('./routes/userRoutes');
const TicketRoutes = require('./routes/ticketRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const wareHouse = require('./routes/wareHouse');
const testUnitRoutes = require('./routes/testunit');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static('uploads'));

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api', supportRoutes);
app.use('/api', jobScheduleRoutes);
app.use('/api', sparePartRoutes);
app.use('/api', knowledgeBaseRoutes);
app.use('/api', userRoutes);
app.use('/api/tickets', TicketRoutes);
app.use('/api', analyticsRoutes);
app.use('/api/warehouse', wareHouse);
app.use('/api/testunits', testUnitRoutes);
app.get('/hello', (req, res) => res.send('Hello from Express on Vercel'));
// sequelize.sync({ alter: true }).then(() => {
//   console.log('Таблицы синхронизированы');
//   app.listen(5000, () => {
//     console.log('Server running on port 5000');
//   });
// }).catch((err) => {
//   console.error('Error syncing database: ', err);
// });


module.exports.handler = serverless(app);