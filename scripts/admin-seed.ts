const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const username = 'admin';
    const password = 'admin123';
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.admin.upsert({
        where: { username },
        update: { passwordHash },
        create: {
            username,
            passwordHash,
        },
    });

    console.log(`Admin user '${user.username}' created/updated successfully.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
