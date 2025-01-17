import { defineConfig } from "drizzle-kit";
const POSTGRES_URL=process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL
export default defineConfig({
    dialect: "postgresql", // Use "pg" instead of "postgresql"
    schema: "./utils/schema.js",
    dbCredentials: {
        url: POSTGRES_URL
    },
});
