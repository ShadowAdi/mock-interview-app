import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql", // Use "pg" instead of "postgresql"
    schema: "./utils/schema.js",
    dbCredentials: {
        url: 'postgresql://AiGenerator_owner:5EIjFc1PorLK@ep-plain-leaf-a5izesz2.us-east-2.aws.neon.tech/ai-mockup-interview?sslmode=require',
    },
});
