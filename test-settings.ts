import { prisma } from './src/lib/prisma';

async function main() {
    const s = await prisma.siteSettings.findFirst();
    console.log(JSON.stringify(s, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
