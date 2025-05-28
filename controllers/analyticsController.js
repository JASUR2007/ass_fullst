const { User, Ticket } = require('../models');

const getAnalytics = async (req, res) => {
    try {
        // Берём всех пользователей, вместе с их тикетами
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'company_name', 'account', 'createdAt'],
            include: [{
                model: Ticket,
                as: 'tickets',
                attributes: ['status', 'estimate_price'],
            }],
        });

        const analytics = users.map(user => {
            const tickets = user.tickets || [];

            // Разделяем тикеты на законченные и незаконченные
            const completedTickets = tickets.filter(t => t.status === 'completed');
            const incompleteTickets = tickets.filter(t => t.status !== 'completed');

            // Считаем суммы estimate_price (учитываем, что estimate_price может быть null)
            const completedSum = completedTickets.reduce(
                (sum, t) => sum + parseFloat(t.estimate_price || 0), 0
            );
            const incompleteSum = incompleteTickets.reduce(
                (sum, t) => sum + parseFloat(t.estimate_price || 0), 0
            );

            return {
                userId: user.id,
                name: user.name,
                email: user.email,
                company_name: user.company_name,
                createdAt: user.createdAt,
                account: user.account,
                totalTickets: tickets.length,
                completedTicketsCount: completedTickets.length,
                incompleteTicketsCount: incompleteTickets.length,
                completedEarnings: completedSum.toFixed(2),
                incompleteEarnings: incompleteSum.toFixed(  2),
            };
        });

        res.json({ analytics });

    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAnalytics };
