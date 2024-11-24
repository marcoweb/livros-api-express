import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const generoData: Prisma.GeneroCreateInput[] = [
    {
        id: 'aventura',
        nome: 'Ficção Fantástica'
    },
    {
        id: 'policial',
        nome: 'Policial'
    },
    {
        id: 'terror',
        nome: 'Terror'
    },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const g of generoData) {
        // create genero if not exists
        const genero = await prisma.genero.upsert({
            where: { id: g.id },
            create: g,
            update: {},
        });
        console.log(`Upserted Genero with id: ${genero.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });