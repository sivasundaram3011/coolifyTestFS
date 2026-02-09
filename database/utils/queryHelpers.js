/**
 * Database Utilities
 * Helper functions for common database operations
 */

/**
 * Pagination helper
 * @param {Model} model - Mongoose model
 * @param {Object} query - Query conditions
 * @param {Object} options - Pagination options
 * @returns {Promise<Object>} Paginated results
 */
export const paginate = async (model, query = {}, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
    select = '',
    populate = '',
  } = options;

  const skip = (page - 1) * limit;

  const [results, total] = await Promise.all([
    model
      .find(query)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate(populate)
      .lean(),
    model.countDocuments(query),
  ]);

  return {
    data: results,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  };
};

/**
 * Bulk create with error handling
 * @param {Model} model - Mongoose model
 * @param {Array} documents - Array of documents to create
 * @param {Object} options - Insert options
 * @returns {Promise<Object>} Creation results
 */
export const bulkCreate = async (model, documents, options = {}) => {
  try {
    const result = await model.insertMany(documents, {
      ordered: false,
      ...options,
    });
    
    return {
      success: true,
      inserted: result.length,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      inserted: error.insertedDocs?.length || 0,
      failed: documents.length - (error.insertedDocs?.length || 0),
      errors: error.writeErrors || [],
    };
  }
};

/**
 * Search with text index
 * @param {Model} model - Mongoose model
 * @param {String} searchText - Text to search
 * @param {Object} additionalQuery - Additional query conditions
 * @returns {Promise<Array>} Search results
 */
export const textSearch = async (model, searchText, additionalQuery = {}) => {
  return await model.find({
    $text: { $search: searchText },
    ...additionalQuery,
  })
  .select({ score: { $meta: 'textScore' } })
  .sort({ score: { $meta: 'textScore' } })
  .lean();
};

/**
 * Aggregate with common patterns
 * @param {Model} model - Mongoose model
 * @param {Array} pipeline - Aggregation pipeline
 * @returns {Promise<Array>} Aggregation results
 */
export const aggregate = async (model, pipeline) => {
  return await model.aggregate(pipeline);
};

/**
 * Check if document exists
 * @param {Model} model - Mongoose model
 * @param {Object} query - Query conditions
 * @returns {Promise<Boolean>}
 */
export const exists = async (model, query) => {
  const count = await model.countDocuments(query).limit(1);
  return count > 0;
};

/**
 * Upsert helper
 * @param {Model} model - Mongoose model
 * @param {Object} filter - Filter to find document
 * @param {Object} update - Update data
 * @returns {Promise<Object>}
 */
export const upsert = async (model, filter, update) => {
  return await model.findOneAndUpdate(
    filter,
    update,
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );
};

/**
 * Soft delete helper
 * @param {Model} model - Mongoose model
 * @param {Object} query - Query conditions
 * @returns {Promise<Object>}
 */
export const softDelete = async (model, query) => {
  return await model.updateMany(
    query,
    { $set: { isDeleted: true, deletedAt: new Date() } }
  );
};

/**
 * Restore soft deleted documents
 * @param {Model} model - Mongoose model
 * @param {Object} query - Query conditions
 * @returns {Promise<Object>}
 */
export const restore = async (model, query) => {
  return await model.updateMany(
    query,
    { $set: { isDeleted: false }, $unset: { deletedAt: 1 } }
  );
};

export default {
  paginate,
  bulkCreate,
  textSearch,
  aggregate,
  exists,
  upsert,
  softDelete,
  restore,
};
