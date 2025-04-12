# Grocery Management System

## Description
A Node.js-based application for managing groceries, orders, and users. This application is built using **TypeScript**, **Express**, and **Sequelize** with a **PostgreSQL** database. It supports user authentication, role-based access control, and order management.

## Features
- User authentication with JWT
- Grocery item management
- Order processing
- Docker support for easy deployment

## Tech Stack
- **Backend Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JSON Web Tokens (JWT) and Bcrypt for password hashing
- **Development**: TypeScript

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd grocerymanagement
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration
- Create a `.env` file in the root directory and add the following variables:
  ```
  PORT=2606
  DB_NAME=grocery_management
  DB_USER=your_db_user
  DB_PASSWORD=your_db_password
  DB_HOST=localhost
  DB_PORT=5432
  JWT_SECRET=your_secret_key
  ```

## API Documentation
- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Login an existing user
- **GET /api/grocery**: Retrieve all grocery items
- **POST /api/grocery**: Add a new grocery item
- **GET /api/orders**: Retrieve all orders
- **POST /api/orders**: Create a new order

## Running the Project
To start the application, run:
```bash
npm start
```

## Deployment
To deploy the application using Docker, run:
```bash
docker-compose up --build
```

## Environment Variables
Make sure to set the following environment variables in your `.env` file:
- `PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`
- `JWT_SECRET`

## Project Structure
```
grocerymanagement/
├── src/
│   ├── config/
│   │   └── db.config.ts       # Database configuration
│   ├── controllers/
│   │   ├── auth.controller.ts # Authentication endpoints
│   │   ├── grocery.controller.ts # Grocery management
│   │   └── order.controller.ts # Order processing
│   ├── middlewares/
│   │   ├── auth.middleware.ts # Authentication middleware
│   │   ├── errorHandler.ts    # Error handling
│   │   └── response.handler.ts # Response formatting
│   ├── models/
│   │   ├── grocery.model.ts   # Grocery item model
│   │   ├── order.items.model.ts # Order items model
│   │   ├── order.model.ts     # Order model
│   │   └── user.model.ts      # User model
│   ├── routes/
│   │   ├── auth.routes.ts     # Authentication routes
│   │   ├── grocery.routes.ts  # Grocery routes
│   │   └── order.routes.ts    # Order routes
│   ├── services/
│   │   ├── auth.services.ts   # Authentication services
│   │   ├── grocery.services.ts # Grocery services
│   │   ├── order.services.ts  # Order services
│   │   └── user.services.ts   # User services
│   └── utils/                 # Utility functions
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── index.ts                   # Application entry point
├── package.json
├── package-lock.json
└── tsconfig.json
```

## License
This project is licensed under the ISC License.
