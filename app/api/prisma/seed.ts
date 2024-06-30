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
        console.log('Seed plan data has been added to the database.');
    } else {
        console.log('Database already contains plan data, no seed needed.');
    }

    const usersCount = await prisma.user.count();
    if (usersCount === 0) {
        const plan = await prisma.plan.findFirst();
        if (!plan) {
            throw new Error('No plans found in the database.');
        }

        for (let i = 1; i <= 20; i++) {
            await prisma.user.create({
                data: {
                    email: `user${i}@example.com`,
                    username: `user${i}`,
                    password: 'password123',
                    role: 'USER',
                    position: ' software rng',
                    bio: 'this this this this this this this',
                    typeUser: 'basic',
                    userImage: `https://example.com/user${i}.png`,
                    planEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                    inActive: false,
                    verifiedAt: new Date(),
                    PlanSubscription: {
                        create: { planId: plan.id }
                    }
                }
            });
        }
        console.log('20 users with plan subscription have been added to the database.');
    } else {
        console.log('Database already contains users, no users added.');
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
