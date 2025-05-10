
// This file defines common types used throughout the application as JSDoc comments
// which can provide some type checking in JavaScript via IDE tooling

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {('seeds'|'fertilizers'|'pesticides'|'insecticides'|'other')} category
 * @property {string} imageUrl
 * @property {number} stock
 * @property {string} [seller]
 * @property {number} [rating]
 * @property {number} [reviews]
 */

/**
 * @typedef {Object} CartItem
 * @property {Product} product
 * @property {number} quantity
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [phone]
 * @property {string} [address]
 * @property {Product[]} [listedProducts]
 */

/**
 * @typedef {Object} CropListing
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} quantity
 * @property {number} price
 * @property {string} category
 * @property {Date} harvestDate
 * @property {string} quality
 * @property {string[]} photos
 * @property {string} sellerId
 * @property {string} sellerName
 * @property {string} location
 * @property {Date} dateAdded
 * @property {number} [soldUnits]
 * @property {number} [revenue]
 * @property {('active'|'sold'|'expired')} [status]
 */

export {};
