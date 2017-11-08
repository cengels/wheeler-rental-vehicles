const dbClient = require('../../db/initialize');
const getWhereConditions = require('../where-conditions');

module.exports = (req, res, table) => {
    const whereConditions = getWhereConditions(req.params, req.query);

    dbClient.query(`SELECT * FROM ${table} ${whereConditions}`, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result.rows);
        }
    });
};