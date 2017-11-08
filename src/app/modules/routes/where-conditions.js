module.exports = (params, query) => {
    if (Object.keys(params).length > 0 || Object.keys(query).length > 0) {
        const keys = Object.keys(params).concat(Object.keys(query));
        const values = Object.values(params).concat(Object.values(query));
        return 'WHERE ' + keys.map((key, i) => `${key} = ${values[i]}`).join(' AND ');
    }

    return '';
};