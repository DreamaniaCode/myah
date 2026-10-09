const { Client } = require('pg');

async function inspect(connStr) {
    if (!connStr) {
        console.error('DATABASE_URL environment variable is not set.');
        process.exit(1);
    }
    console.log('\n=== Checking Database Connection ===');
    const client = new Client({ connectionString: connStr });
    try {
        await client.connect();
        const tablesRes = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name;
        `);
        console.log('Tables found:', tablesRes.rows.map(r => r.table_name));

        for (const row of tablesRes.rows) {
            const countRes = await client.query(`SELECT COUNT(*) FROM "${row.table_name}"`);
            console.log(`- ${row.table_name}: ${countRes.rows[0].count} rows`);
        }
    } catch (err) {
        console.error('Error connecting to database:', err.message);
    } finally {
        await client.end().catch(() => {});
    }
}

async function main() {
    require('dotenv').config();
    const url = process.env.DATABASE_URL;
    await inspect(url);
}

main();
