# Inventory Management System

A Node.js and Express API for user registration and approval, authentication, and basic product management. MongoDB is accessed through Mongoose.

## Technologies

- Node.js (20.6 or newer; the run scripts use Node's `--env-file` option)
- Express 5
- MongoDB and Mongoose
- JavaScript ES modules
- Zod for request validation
- bcryptjs for password hashing
- jsonwebtoken for authentication tokens

## Project structure

```text
.
├── .gitignore
├── package.json
├── package-lock.json
└── src
    ├── app.controller.js
    ├── index.js
    ├── DB
    │   ├── DB.connection.js
    │   └── models
    │       ├── movement.model.js
    │       ├── products.model.js
    │       └── user.model.js
    ├── middlewares
    │   ├── authentication.middleware.js
    │   ├── authorization.middleware.js
    │   └── validation.middleware.js
    ├── modules
    │   ├── auth
    │   │   ├── auth.controller.js
    │   │   ├── auth.service.js
    │   │   └── auth.validation.schema.js
    │   └── products
    │       ├── products.controller.js
    │       ├── products.service.js
    │       └── products.validation.schema.js
    └── security
        └── hash.security.js
```

## Setup

1. Install Node.js 20.6 or newer and have a MongoDB instance available.
2. Install dependencies:

   ```sh
   npm ci
   ```

3. Set the following names in your local `.env` file. Do not commit that file. The environment variable names used by the application are:

   - Required: `DB_URI`, `JWT_SECRET`, `SALT`
   - Optional: `PORT`, `NODE_ENV`

   `SALT` must be a valid bcrypt cost value. `PORT` defaults to 3000 in the application. Keep real credentials only in your local `.env`; no `.env.example` file is included.

4. Start the application:

   ```sh
   npm start
   ```

   For development with Node's watch mode:

   ```sh
   npm run dev
   ```

The API connects to MongoDB before registering routes and listening for requests. The current connection handler does not stop startup on a connection failure; see the development notes below.

## API endpoints

All endpoints are mounted under the prefixes shown.

### Authentication and user approval

| Method | Path | Access | Behavior |
|---|---|---|---|
| `POST` | `/auth/signup` | Public | Registers a staff account in the pending state. |
| `POST` | `/auth/login` | Public | Checks credentials and returns a JWT for an eligible account. |
| `GET` | `/auth/profile` | Authenticated | Returns the current user's profile. |
| `GET` | `/auth/pendingUsers` | Admin | Lists pending users. Accepts `page` and `limit` query parameters. |
| `PATCH` | `/auth/approveUser/:userId` | Admin | Approves a user registration. |
| `PATCH` | `/auth/rejectUser/:userId` | Admin | Rejects a user registration. |

### Products

| Method | Path | Access | Behavior |
|---|---|---|---|
| `POST` | `/products/product` | Admin | Creates a product. |
| `GET` | `/products/product` | Public | Lists products. Accepts `page`, `limit`, and `category` query parameters. |
| `GET` | `/products/product/:productId` | Staff or admin | Gets a product by ID. |
| `PATCH` | `/products/product/:productId` | Admin | Updates the accepted product fields: name, description, note, price, and category. |
| `DELETE` | `/products/product/:productId` | Admin | Marks a product as deleted and unavailable. |
| `DELETE` | `/products/product/freeze/:productId` | Admin | Permanently removes a product that has already been marked deleted. |

The product list currently returns `404` when it has no results. Also, product list and detail queries do not currently filter out products marked deleted, so those records may still be returned.

## Authentication and authorization

Login returns a JWT that expires after one hour. Send it as a bearer token in the `Authorization` header for protected endpoints. New public registrations are created as staff with pending approval; admin-only endpoints manage pending registrations and product changes.

There is no API endpoint for creating the first admin account; an initial admin must currently be provisioned outside the public signup flow.

## Implemented

- Signup and login with password hashing
- JWT authentication and role-based route checks
- Zod validation for auth and product request inputs
- Admin approval and rejection of staff registrations
- Product creation, listing, category filtering, retrieval, updates, soft deletion, and permanent deletion of soft-deleted products
- Mongoose schemas for users, products, and stock movements
- Basic page/limit pagination for product and pending-user lists

## Under development / known limitations

- **Security blocker:** the application contains a hardcoded JWT fallback if `JWT_SECRET` is absent. The code does not currently enforce that the environment variable is set. Do not deploy this application or publish it for public review until the fallback is removed and a strong secret is configured.
- The database connection handler logs a generic failure but allows startup to continue.
- Soft-deleted products are not excluded from product list and detail queries.
- The stock movement model exists, but no API workflow records movements or updates stock through movement operations.
- Pagination responses do not include total counts or next-page metadata.
- There is no automated test script or test suite configured yet.

## Repository hygiene

`.gitignore` excludes environment files, dependencies, logs, and common temporary files, while allowing an optional `.env.example` to be committed if one is added later. Never commit real environment values, database credentials, tokens, or signing secrets.
