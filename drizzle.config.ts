import {defineConfig} from 'drizzle-kit'

export default defineConfig({
    schema: './drizzle/db/schema.ts',
    out: './drizzle/migrations',
    dialect:'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!
    },
    verbose: true,
    strict: true,
    migrations: {
        table: 'my-migrations-table', // `__drizzle_migrations` by default
        schema: 'public', // used in PostgreSQL only, `drizzle` by default
    },
})