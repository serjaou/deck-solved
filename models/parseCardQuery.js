const parseSearchField = {
  name(queryValue) {
    return new RegExp(queryValue, 'i');
  }
};

function parseCardQuery(queryObject) {
  return Object.assign(
    ...Object.keys(queryObject).map(field => {
      if (!(field in parseCardQuery)) {
        throw new Error(`bad request - ${field} not defined on 'parseSearchField'`);
      }
      return { [field]: parseSearchField[field](queryObject[field]) };
    })
  );
}

module.exports = parseCardQuery;
