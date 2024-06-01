import { db } from '@/app/api/core/db/db';
import { NAMEPLAN } from '@prisma/client';

class ClassRoomRepository {
    static async getAllUserAndSearch(payload: {
        page: number;
        pageSize: number;
        searchWord: string;
    }) {
        const userSkip = (payload.page - 1) * payload.pageSize;
        const users = await db.user.findMany({
            take: payload.page,
            skip: userSkip,
            where: {
                username: { contains: payload.searchWord }
            }
        });
        const userCount = await db.user.count({
            where: {
                username: { contains: payload.searchWord }
            }
        });
        return {
            usres: users,
            userCount: userCount
        };
    }

    static async addRomInClass(
        payload: {
            classRomId: string;
            description?: string;
            name?: string;
            type?: string;
        },
        userId: string
    ) {
        const myClass = await db.classRom.findFirst({
            where: {
                MemberClass: {
                    some: {
                        userId: userId,
                        isTeacher: true
                    }
                }
            }
        });

        if (!myClass) {
            throw new Error('No class found');
        }

        const userPlan = await db.planSubscription.findUnique({
            where: {
                userId: userId
            },
            include: {
                plan: {
                    include: {
                        FeaturePlan: true
                    }
                }
            }
        });
        const countMyRomInClassRoom = await db.rom.count({
            where: {
                classRomId: payload.classRomId
            }
        });

        if (!userPlan) {
            throw new Error('User does not have a plan subscription.');
        }

        const hasLabsPlan = userPlan.plan.FeaturePlan.some(
            featurePlan => featurePlan.name === NAMEPLAN.romsInClass
        );

        if (hasLabsPlan && countMyRomInClassRoom < userPlan.plan.FeaturePlan[0].value) {
            await db.rom.create({
                data: {
                    classRomId: payload.classRomId,
                    type: payload.type ?? '',
                    name: payload.name ?? '',
                    description: payload.description ?? ''
                }
            });

            return { message: 'Rom added to class successfully' };
        } else {
            throw new Error('Rom limit reached for this class.');
        }
    }

    static async addUsersInClass(
        payload: {
            classRomId: string;
            userIds: string[];
        },
        userId: string
    ) {
        const myClass = await db.classRom.findFirst({
            where: {
                MemberClass: {
                    some: {
                        userId: userId,
                        isTeacher: true
                    }
                }
            }
        });

        if (!myClass) {
            throw new Error('No class found');
        }

        const userPlan = await db.planSubscription.findUnique({
            where: {
                userId: userId
            },
            include: {
                plan: {
                    include: {
                        FeaturePlan: true
                    }
                }
            }
        });

        if (!userPlan) {
            throw new Error('User does not have a plan subscription.');
        }

        const featurePlan = userPlan.plan.FeaturePlan.find(
            featurePlan => featurePlan.name === NAMEPLAN.studentsInClass
        );

        if (!featurePlan || typeof featurePlan.value !== 'number') {
            throw new Error('Invalid plan or plan does not support adding students.');
        }

        const studentLimit = featurePlan.value;

        const countMyStudentsInClassRoom = await db.memberClass.count({
            where: {
                classRomId: payload.classRomId
            }
        });

        const availableSlots = studentLimit - countMyStudentsInClassRoom;

        if (availableSlots <= 0) {
            throw new Error('Student limit reached for this class.');
        }

        if (payload.userIds.length > availableSlots) {
            throw new Error('Not enough available slots to add all users.');
        }

        // Add each user in the userIds list to the class
        for (const studentId of payload.userIds) {
            await db.memberClass.create({
                data: {
                    classRomId: payload.classRomId,
                    userId: studentId,
                    isTeacher: false
                }
            });
        }

        return { message: 'Users added to class successfully' };
    }

    // if Iam student
    static async getClassRomForStudentsById(
        payload: {
            classRomId: string;
        },
        userId: string
    ) {
        const myClassRom = await db.classRom.findUnique({
            where: {
                id: payload.classRomId,
                MemberClass: {
                    some: {
                        userId: userId
                    }
                }
            }
        });

        if (!myClassRom) {
            throw new Error('class Rom not found');
        }

        return {
            myClassRom
        };
    }

    // if Iam creation
    static async getClassRomById(
        payload: {
            classRomId: string;
        },
        userId: string
    ) {
        const myClassRom = await db.classRom.findUnique({
            where: {
                id: payload.classRomId,
                MemberClass: {
                    some: {
                        userId: userId,
                        isTeacher: true
                    }
                }
            }
        });

        if (!myClassRom) {
            throw new Error('class Rom not found');
        }

        return {
            myClassRom
        };
    }

    // if Iam creation or Iam student
    static async getUserInClass(
        payload: { userPage: number; userPageSize: number; classRomId: string },
        userId: string
    ) {
        const userSkip = (payload.userPage - 1) * payload.userPageSize;
        const myClassRom = await db.classRom.findUnique({
            where: {
                id: payload.classRomId,
                MemberClass: {
                    some: {
                        userId: userId
                    }
                }
            }
        });

        if (!myClassRom) {
            throw new Error('class Rom not found');
        }

        const memberClassInClassRom = await db.memberClass.findMany({
            where: {
                classRomId: myClassRom.id
            },
            take: payload.userPage,
            skip: userSkip,
            include: {
                user: true
            }
        });
        const countMemberClassInClassRom = await db.memberClass.count({
            where: {
                classRomId: myClassRom.id
            }
        });

        return {
            memberClassInClassRom: memberClassInClassRom,
            countMemberClassInClassRom: countMemberClassInClassRom
        };
    }

    // if Iam  creation or Iam student
    static async getRomInClass(
        payload: {
            romePage: number;
            romPageSize: number;
            classRomId: string;
        },
        userId: string
    ) {
        const romSkip = (payload.romePage - 1) * payload.romPageSize;
        const myClassRom = await db.classRom.findUnique({
            where: {
                id: payload.classRomId,
                MemberClass: {
                    some: {
                        userId: userId
                    }
                }
            }
        });

        if (!myClassRom) {
            throw new Error('class Rom not found');
        }

        const RomInClassRom = await db.rom.findMany({
            where: {
                classRomId: myClassRom.id
            },
            take: payload.romePage,
            skip: romSkip
        });
        const romCountInClassRom = await db.rom.count({
            where: {
                classRomId: myClassRom.id
            }
        });

        return {
            RomInClassRom: RomInClassRom,
            romCountInClassRom: romCountInClassRom
        };
    }
    static async getClassCreateByMe(
        payload: {
            page: number;
            pageSize: number;
            searchWord?: string;
        },
        userId: string
    ) {
        if (payload.page < 1 || payload.pageSize < 1) {
            throw new Error('Invalid page or pageSize');
        }

        const classesAsTeacher = await db.classRom.findMany({
            where: {
                MemberClass: {
                    some: {
                        userId: userId,
                        isTeacher: true
                    }
                },
                ...(payload.searchWord && {
                    name: { contains: payload.searchWord, mode: 'insensitive' }
                })
            },
            skip: (payload.page - 1) * payload.pageSize,
            take: payload.pageSize,
            include: {
                MemberClass: true
            }
        });

        const totalClassesCount = await db.classRom.count({
            where: {
                MemberClass: {
                    some: {
                        userId: userId,
                        isTeacher: true
                    }
                },
                ...(payload.searchWord && {
                    name: { contains: payload.searchWord, mode: 'insensitive' }
                })
            }
        });

        return {
            classes: classesAsTeacher,
            total: totalClassesCount
        };
    }

    static async getMyClass(
        payload: {
            page: number;
            pageSize: number;
            searchWord?: string;
        },
        userId: string
    ) {
        if (payload.page < 1 || payload.pageSize < 1) {
            throw new Error('Invalid page or pageSize');
        }

        const classesAsTeacher = await db.classRom.findMany({
            where: {
                MemberClass: {
                    some: {
                        userId: userId
                    }
                },
                ...(payload.searchWord && {
                    name: { contains: payload.searchWord, mode: 'insensitive' }
                })
            },
            skip: (payload.page - 1) * payload.pageSize,
            take: payload.pageSize,
            include: {
                MemberClass: true
            }
        });

        const totalClassesCount = await db.classRom.count({
            where: {
                MemberClass: {
                    some: {
                        userId: userId
                    }
                },
                ...(payload.searchWord && {
                    name: { contains: payload.searchWord, mode: 'insensitive' }
                })
            }
        });

        return {
            classes: classesAsTeacher,
            total: totalClassesCount
        };
    }

    static async addClassRoom(
        payload: {
            name?: string;
            description?: string;
            type?: string;
        },
        userId: string
    ) {
        // Check if the user has a plan subscription
        const countMyClassRoom = await db.classRom.count({
            where: {
                MemberClass: {
                    some: {
                        userId: userId
                    }
                }
            }
        });

        const userPlan = await db.planSubscription.findUnique({
            where: {
                userId: userId
            },
            include: {
                plan: {
                    include: {
                        FeaturePlan: true
                    }
                }
            }
        });

        if (!userPlan) {
            throw new Error('User does not have a plan subscription.');
        }

        const hasLabsPlan = userPlan.plan.FeaturePlan.some(
            featurePlan => featurePlan.name === NAMEPLAN.classes
        );

        if (hasLabsPlan && countMyClassRoom < userPlan.plan.FeaturePlan[0].value) {
            const newClassRoom = await db.classRom.create({
                data: {
                    name: payload.name ?? '',
                    description: payload.description ?? '',
                    type: payload.type ?? '',
                    MemberClass: {
                        create: {
                            userId: userId,
                            isTeacher: true
                        }
                    }
                }
            });
            return newClassRoom;
        } else {
            throw new Error('User does not have access to create more classRoom.');
        }
    }
}
export default ClassRoomRepository;
