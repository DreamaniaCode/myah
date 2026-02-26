import { prisma } from './src/lib/prisma';

async function main() {
    const post = await prisma.blogPost.findFirst();
    console.log(JSON.stringify(post, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
