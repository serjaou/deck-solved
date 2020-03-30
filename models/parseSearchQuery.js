// define the parse functions for each field in a valid Card search-query.
const parseQueryField = {
  name(nameValue) {
    return new RegExp(nameValue, 'i');
  },
  layout(layout) {
    return layout;
  }
};

/**
 * @param {Object} queryObject
 * parseSearchQuery.- parses a Card search-query (object) into a valid
 * mongoDB selector using **parseQueryField**.
 */
function parseSearchQuery(queryObject) {
  return Object.assign(
    ...Object.keys(queryObject).map(field => {
      if (!(field in parseQueryField)) {
        throw new Error(`bad request - "${field}" is not defined in 'parseQueryField'`);
      }
      return { [field]: parseQueryField[field](queryObject[field]) };
    })
  );
}

module.exports = parseSearchQuery;
