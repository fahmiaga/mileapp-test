/**
 * db/indexes.js
 * 
 * MongoDB Index Script
 * --------------------
 * This file defines the MongoDB indexes that would be created
 * if we were using a real MongoDB database for the Task module.
 *
 * The indexes are designed to optimize:
 *  - Filtering tasks by status
 *  - Sorting tasks by creation date
 *  - Searching tasks by title or description
 */

db.tasks.createIndex({ status: 1 })
/**
 * Improves query performance for filtering tasks
 * such as: { status: "pending" } or { status: "done" }
 */

db.tasks.createIndex({ created_at: -1 })
/**
 * Speeds up sorting by latest/oldest tasks:
 * e.g., db.tasks.find().sort({ created_at: -1 })
 */

db.tasks.createIndex({ title: "text", description: "text" })
/**
 * Enables full-text search in title and description fields:
 * e.g., db.tasks.find({ $text: { $search: "login" } })
 */

db.tasks.createIndex({ status: 1, created_at: -1 })
/**
 * Compound index for queries that filter by status
 * and sort by creation date at the same time.
 */

db.tasks.createIndex({ id: 1 }, { unique: true })
/**
 * Ensures each task has a unique `id`.
 */
