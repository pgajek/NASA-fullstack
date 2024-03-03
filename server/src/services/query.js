const DEFAULT_PAGE_LIMIT = 0; // mongo will return all the documentsi n the collection

function getPagination(query) {
  const limit = Math.abs(query.limit);
  const page = Math.abs(query.page);

  const skip = (page - 1) * limit;

  return { limit, skip };
}

module.exports = {
  getPagination,
};
