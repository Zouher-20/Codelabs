// prisma/seed.ts

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const plansCount = await prisma.plan.count();

    if (plansCount === 0) {
        await prisma.plan.create({
            data: {
                name: 'free',
                price: -1,
                duration: '1 month',
                subtitle: 'Basic subscription plan',
                FeaturePlan: {
                    create: [
                        { name: 'labs', value: 5 },
                        { name: 'classes', value: 10 },
                        { name: 'studentsInClass', value: 30 },
                        { name: 'romsInClass', value: 5 },
                        { name: 'challenge', value: 1 },
                        { name: 'blogs', value: 3 }
                    ]
                }
            }
        });
        console.log('Seed data has been added to the database.');
    } else {
        console.log('Database already contains data, no seed needed.');
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
