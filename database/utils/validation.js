/**
 * Validation Utilities
 * Common validation functions for database operations
 */

import mongoose from 'mongoose';

/**
 * Check if string is a valid MongoDB ObjectId
 * @param {string} id - ID to validate
 * @returns {boolean}
 */
export const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Validate required fields
 * @param {Object} data - Data object to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} Validation result
 */
export const validateRequiredFields = (data, requiredFields) => {
  const missing = [];
  
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      missing.push(field);
    }
  }
  
  return {
    isValid: missing.length === 0,
    missingFields: missing,
    message: missing.length > 0 
      ? `Missing required fields: ${missing.join(', ')}`
      : 'All required fields present',
  };
};

/**
 * Sanitize data by removing undefined values
 * @param {Object} data - Data to sanitize
 * @returns {Object} Sanitized data
 */
export const sanitizeData = (data) => {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate date range
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Object} Validation result
 */
export const validateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return {
      isValid: false,
      message: 'Invalid date format',
    };
  }
  
  if (start > end) {
    return {
      isValid: false,
      message: 'Start date must be before end date',
    };
  }
  
  return {
    isValid: true,
    message: 'Valid date range',
  };
};

export default {
  isValidObjectId,
  validateRequiredFields,
  sanitizeData,
  isValidEmail,
  validateDateRange,
};
