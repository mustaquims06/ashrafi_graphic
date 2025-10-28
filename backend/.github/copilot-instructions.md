# Copilot Instructions for ashrafi_graphic Backend

## Project Overview
This is a Node.js backend project using Express and Mongoose. It connects to a local MongoDB instance with authentication. The main entry point is likely `index.js` (not present in context, but referenced in `package.json`).

## Architecture & Data Flow
- **Database:** MongoDB, accessed via Mongoose. Connection string is in `db.js`.
- **Framework:** Express is listed as a dependency, but no routes/controllers are present in the current context.
- **Service Boundaries:** All backend logic is expected to reside in this folder. Look for additional `.js` files for models, routes, or controllers.

## Developer Workflows
- **Install dependencies:**
  ```powershell
  npm install
  ```
- **Start server:**
  If `index.js` exists, use:
  ```powershell
  node index.js
  ```
- **Testing:**
  No tests are defined. The default `npm test` script will error.
- **Debugging:**
  Use standard Node.js debugging tools. No custom debug scripts are present.

## Conventions & Patterns
- **Database Connection:**
  - Connection string is hardcoded in `db.js`.
  - Uses Mongoose for ODM.
- **Authentication:**
  - MongoDB connection uses username/password authentication.
- **File Organization:**
  - All backend code is in the root of the `backend` folder.
  - No subfolders for models, routes, or controllers yet.

## Integration Points
- **External Dependencies:**
  - `express` for HTTP server
  - `mongoose` for MongoDB access
- **Environment Variables:**
  - No `.env` file or environment variable usage detected. Credentials are hardcoded.

## Key Files
- `db.js`: MongoDB connection setup
- `package.json`: Project metadata and dependencies

## Example Patterns
- **MongoDB Connection (from `db.js`):**
  ```js
  const mongoose = require('mongoose');
  const mongoURI = 'mongodb://username:password@localhost:27017/dbname?authSource=dbname';
  // ...existing code...
  ```

## Recommendations for AI Agents
- If adding new models, routes, or controllers, follow standard Express/Mongoose patterns.
- If introducing environment variables, refactor hardcoded credentials in `db.js`.
- Document any new workflows or conventions in this file for future agents.

---
_Last updated: September 28, 2025_
