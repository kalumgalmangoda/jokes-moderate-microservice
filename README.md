
---

### 3. **Moderate Jokes Microservice (Express.js)**

**Filename**: `README.md`

# Moderate Jokes Microservice

This microservice allows a moderator to authenticate, fetch submitted jokes from the Submit Jokes Microservice, edit, and then submit them to the Deliver Jokes Microservice.

## Technologies Used

- Node.js
- Express.js
- Axios

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

## Installation

1. Clone the repository:

  ```bash
  git clone <repository_url>
  cd jokes-moderate-microservice
  ```

2. Install dependencies:

  ```bash
  npm install
  ```

3. Set up environment variables:

Create a .env file in the root directory with the following variables:

  ```bash
  PORT=3002
  FRONTEND_APP_URL=http://localhost:3000
  ADMIN_EMAIL=admin@admin.com
  ADMIN_PASSWORD=admin123
  SECRET_KEY=supersecret
  SUBMIT_JOKES_URL=http://localhost:3001
  DELIVER_JOKES_URL=http://localhost:3003
  ```

## Running the Application

Start the Express.js application:

  ```bash
  npm run start
  ```
The microservice will run at http://localhost:3002.

## API Endpoints

- POST /auth/login: Sign in to the Moderate Jokes Microservice.
- GET /jokes: Fetch a new random joke from the Submit Jokes Microservice.
- PUT /jokes/:id: Update a joke from the Submit Jokes Microservice.
- DELETE /jokes/:id: Delete a joke from the Submit Jokes Microservice.
- POST /jokes/deliver: Submit a new joke to the Deliver Jokes Microservice.
- GET /jokes/types: Fetch all joke types from the Deliver Jokes Microservice.

## Authentication

- Default credentials:
  - Email: admin@admin.com
  - Password: admin123

## Testing

To test the endpoints, use Postman or cURL.

## Deployment

Deploy the microservice on your preferred cloud service or container platform.

---
