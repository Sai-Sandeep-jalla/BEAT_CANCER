import 'dotenv/config'; // Load variables from .env

export default {
  dialect: "postgresql",
  schema: "./src/utils/schema.jsx",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL,
    connectionString: process.env.NEON_DATABASE_URL,
  },
};
