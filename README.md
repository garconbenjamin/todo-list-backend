# TodoList Backend

**Overview:**

The TodoList Backend is the server-side component of the TodoList application, managing tasks and user data through a GraphQL API. It leverages technologies like Apollo Server, TypeScript, and Docker for a robust and scalable architecture.

**Prerequisites:**

* Docker Compose (installed and running)

**Installation:**

1. Clone the repository:

```bash
git clone https://github.com/garconbenjamin/todo-list-backend.git
```

2. Navigate to the project directory:

```bash
cd todo-list-backend
```

3. Install dependencies:

```bash
yarn
```

**Setting Up Docker:**

1. Start the Docker containers:

```bash
yarn run docker:up
```

2. Create a `.env` file in the root directory and paste the configuration attached:

```
touch .env
```

**Usage:**

1. Start the TodoList Backend:

- For regular functionality:

```bash
yarn start
```

- For GraphQL Playground (interactive API documentation):

```bash
yarn start:dev
```

**Accessing the App:**

* **Main app:** http://localhost:3000 
* **GraphQL Playground:** http://localhost:3000/graphql (accessible only when running `yarn start:dev`)


**License:**

This project is open-source under the MIT License.
