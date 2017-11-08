const dbClient = require('../../db/initialize');
const getWhereConditions = require('../where-conditions');

module.exports = (req, res, table) => {
    const whereConditions = getWhereConditions(req.params, req.query);

    dbClient.query(`DELETE FROM ${table} ${whereConditions}`)
        .then(() => res.send('DELETE operation succeeded.'))
        .catch((err) => res.send('DELETE operation failed.' + err.stack));
};