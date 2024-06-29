import { db } from '@/app/api/core/db/db';
import { NAMEPLAN } from '@prisma/client';
import { DateTime } from 'next-auth/providers/kakao';

class ClassRoomRepository {

    static async deleteMyClass(payload: { classRoomId: string }, userId: string) {
        const myClass = await db.classRom.findUnique({
            where: {
                id: payload.classRoomId,
                MemberClass: {
                    some: {
                        isTeacher: true,
                        userId: userId
                    }
                }
            }
        });
        if (!myClass) {
            throw new Error("your class was deleted ||  this class not yours");
        };

        await db.classRom.deleteMany({
            where: {
                id: myClass.id
            }
        });
        return "class deleted successfully";

    }
    static async deleteUserFromMyClass(payload: { classRoomId: string, userIds: string[] }, userId: string) {

        const myClass = await db.classRom.findUnique({
            where: {
                id: payload.classRoomId,
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


        for (const studentId of payload.userIds) {
            await db.memberClass.deleteMany({
                where: {
                    classRomId: payload.classRoomId,
                    userId: studentId,
                    isTeacher: false
                }
            });
        }
        return "users deleted successfully "
    }
    // static async getAllFeedbackInRoom(payload: {
    //     RomId: string,
    //     pageSize: number,
    //     page: number
    // }, userId: string) {

    //     const myClass = await db.classRom.findFirst({
    //         where: {
    //             AND: [
    //                 {
    //                     Rom: {
    //                         some: {
    //                             id: myRoom.id
    //                         }
    //                     }
    //                 },
    //                 {
    //                     MemberClass: {
    //                         some: {
    //                             userId: userId
    //                         }
    //                     }
    //                 }
    //             ]
    //         }
    //     });

    //     if (!myClass) {
    //         throw new Error('No class found');
    //     }

    //     const feedbacks = await db.feedbackProjct.findMany({
    //         where:{}
    //     })
    // }

    static async getAllClassRooms(
        payload: { page: number; pageSize: number; searchWord?: string },
    ) {
        const skip = (payload.page - 1) * payload.pageSize;
        let args = {};

        if (payload.searchWord) {
            args = {
                name: { contains: payload.searchWord, mode: 'insensitive' }
            };
        }
        const classRoom = await db.classRom.findMany({
            take: payload.pageSize,
            skip: skip,
            include: {
                MemberClass: {
                    where: {
                        isTeacher: true,
                    },
                    include: {
                        user: true
                    }
                }
            },
            where: {
                ...args
            }
        });

        const classRoomsWithCounts = await Promise.all(
            classRoom.map(async classRoom => {

                const memberCount = await db.memberClass.count({
                    where: { classRomId: classRoom.id }
                });
                const roomCount = await db.rom.count({
                    where: { classRomId: classRoom.id }
                });

                return {
                    ...classRoom,
                    memberCount,
                    roomCount
                };
            })
        );

        const totalCount = await db.classRom.count({
            where: {
                ...args
            }
        });

        return {
            classRooms: classRoomsWithCounts,
            totalCount: totalCount
        };
    }
    static async addFeedbackInForClassProjectInRom(
        payload: {
            labId: string;
            feedback: string;
        },
        userId: string
    ) {
        // Check if the lab exists
        const hasLab = await db.lab.findUnique({
            where: {
                id: payload.labId
            }
        });

        if (!hasLab) {
            throw new Error('no lab found');
        }

        // Check if the class project associated with the lab exists
        const myClassProject = await db.classProject.findFirst({
            where: {
                labId: payload.labId
            }
        });

        if (!myClassProject) {
            throw new Error('no class project found');
        }

        // Check if the room associated with the class project exists
        const myRoom = await db.rom.findFirst({
            where: {
                ClassProject: {
                    some: {
                        id: myClassProject.id
                    }
                }
            }
        });

        if (!myRoom) {
            throw new Error('no room found');
        }

        // Check if the user is a member of the class in the given room
        const myClass = await db.classRom.findFirst({
            where: {
                AND: [
                    {
                        Rom: {
                            some: {
                                id: myRoom.id
                            }
                        }
                    },
                    {
                        MemberClass: {
                            some: {
                                userId: userId
                            }
                        }
                    }
                ]
            }
        });

        if (!myClass) {
            throw new Error('No class found');
        }

        const memberClass = await db.memberClass.findFirst({
            where: {
                AND: [
                    {
                        userId: userId
                    },
                    {
                        classRomId: myClass.id
                    },
                    {
                        OR: [{ isTeacher: true }]
                    }
                ]
            }
        });

        if (!memberClass) {
            throw new Error('MemberClass not found');
        }

        const newFeedback = await db.feedbackProjct.create({
            data: {
                feedback: payload.feedback,
                classProjectId: myClassProject.id,
                memberClassId: memberClass.id
            }
        });

        return newFeedback;
    }

    static async submitLabsInRoom(
        payload: {
            romId: string;
            jsonFile: string;
        },
        userId: string
    ) {
        // Check if the user is a member of the class in the given ROM
        const myClass = await db.classRom.findFirst({
            where: {
                AND: [
                    {
                        Rom: {
                            some: {
                                id: payload.romId
                            }
                        }
                    },
                    {
                        MemberClass: {
                            some: {
                                userId: userId
                            }
                        }
                    }
                ]
            }
        });

        if (!myClass) {
            throw new Error('No class found');
        }

        // Check if the user is a member of the class

        const memberClass = await db.memberClass.findFirst({
            where: {
                userId: userId,
                classRomId: myClass.id
            }
        });

        if (!memberClass) {
            throw new Error('MemberClass not found');
        }

        // Check if the user already has a class project in the room
        const hasClassProject = await db.classProject.findFirst({
            where: {
                memberClassId: memberClass.id,
                romId: payload.romId
            }
        });

        let newLab;
        let newClassProject;

        if (hasClassProject) {
            // Create a new lab if the project already exists
            newLab = await db.lab.updateMany({
                where: {
                    ClassProject: {
                        id: hasClassProject.id
                    }
                },
                data: {
                    jsonFile: payload.jsonFile,
                }
            });
        } else {
            // Create a new class project and then create the lab

            newLab = await db.lab.create({
                data: {
                    jsonFile: payload.jsonFile,
                }
            });
            newClassProject = await db.classProject.create({
                data: {
                    romId: payload.romId,
                    memberClassId: memberClass.id,
                    labId: newLab.id
                }
            });


        }

        return { lab: newLab, classProject: newClassProject || hasClassProject };
    }

    static async getAllUserAndSearch(payload: {
        page: number;
        pageSize: number;
        searchWord: string;
    }) {
        const userSkip = (payload.page - 1) * payload.pageSize;
        const users = await db.user.findMany({
            take: payload.pageSize,
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
            endAt: DateTime;
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
                    endAt: payload.endAt,
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
        const myClass = await db.classRom.findUnique({
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

        if (availableSlots <= 0 && studentLimit != -1) {
            throw new Error('Student limit reached for this class.');
        }

        if (payload.userIds.length > availableSlots && studentLimit != -1) {
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

    static async getRoomAndTeacherDetails(
        payload: {
            romId: string;
        },
        userId: string
    ) {
        const myClass = await db.classRom.findFirst({
            where: {
                AND: [
                    {
                        Rom: {
                            some: {
                                id: payload.romId
                            }
                        }
                    },
                    {
                        MemberClass: {
                            some: {
                                userId: userId
                            }
                        }
                    }
                ]
            }
        });

        if (!myClass) {
            throw new Error('No class found');
        }

        const myRom = await db.rom.findUnique({
            where: {
                id: payload.romId
            },
            include: {
                classRom: {
                    include: {
                        MemberClass: {
                            where: {
                                isTeacher: true
                            },
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        });
        if (!myRom) {
            throw new Error('No room found with the specified ID');
        }

        return myRom;
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
            take: payload.userPageSize,
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
            take: payload.romPageSize,
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
                        userId: userId,
                        isTeacher: false
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
                        isTeacher: false
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

    static async getClassRomStatistics(
        payload: {
            classRomId: string;
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

        const romCountInClassRom = await db.rom.count({
            where: {
                classRomId: myClass.id
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

        const studentsFeaturePlan = userPlan.plan.FeaturePlan.find(
            featurePlan => featurePlan.name === NAMEPLAN.studentsInClass
        );

        if (!studentsFeaturePlan || typeof studentsFeaturePlan.value !== 'number') {
            throw new Error('Invalid plan or plan does not support adding students.');
        }

        const romsFeaturePlan = userPlan.plan.FeaturePlan.find(
            featurePlan => featurePlan.name === NAMEPLAN.romsInClass
        );

        if (!romsFeaturePlan || typeof romsFeaturePlan.value !== 'number') {
            throw new Error('Invalid plan or plan does not support adding ROMs.');
        }

        const studentLimit = studentsFeaturePlan.value;
        const romLimit = romsFeaturePlan.value;

        const countMyStudentsInClassRoom = await db.memberClass.count({
            where: {
                classRomId: payload.classRomId
            }
        });

        const availableStudentSlots = studentLimit - countMyStudentsInClassRoom;
        const availableRomSlots = romLimit - romCountInClassRom;

        return {
            numberOfStudents: countMyStudentsInClassRoom,
            numberOfRoms: romCountInClassRom,
            remainingStudentSlots: availableStudentSlots,
            remainingRomSlots: availableRomSlots,
            totalRoms: romLimit,
            totalStudents: studentLimit
        };
    }

    static async getRomById(
        payload: {
            romId: string;
        },
        userId: string
    ) {
        const myClass = await db.classRom.findFirst({
            where: {
                AND: [
                    {
                        Rom: {
                            some: {
                                id: payload.romId
                            }
                        }
                    },
                    {
                        MemberClass: {
                            some: {
                                userId: userId,
                                isTeacher: true
                            }
                        }
                    }
                ]
            }
        });

        if (!myClass) {
            throw new Error('No class found');
        }

        const myRom = await db.rom.findUnique({
            where: {
                id: payload.romId
            },
            include: {
                ClassProject: {
                    include: {
                        lab: true,
                        memberClass: {
                            include: {
                                user: true
                            }
                        }
                    },

                }
            }
        });
        if (!myRom) {
            throw new Error('No room found with the specified ID');
        }

        return myRom;
    }

    static async getStudentsStatisticsSubmitted(
        payload: { page: number; pageSize: number; romId: string },
        userId: string
    ) {
        const myClass = await db.classRom.findFirst({
            where: {
                AND: [
                    {
                        Rom: {
                            some: {
                                id: payload.romId
                            }
                        }
                    },
                    {
                        MemberClass: {
                            some: {
                                userId: userId,
                            }
                        }
                    }
                ]
            }
        });

        if (!myClass) {
            throw new Error('No class found');
        }

        const userSkip = (payload.page - 1) * payload.pageSize;

        const totalStudentsInClass = await db.memberClass.count({
            where: {
                classRomId: myClass.id
            }
        });
        const usersWithLabs = await db.user.findMany({
            where: {
                MemberClass: {
                    some: {
                        classRomId: myClass.id,
                    }
                }
            },
            include: {
                MemberClass: {
                    where: {
                        classRomId: myClass.id

                    },
                    include: {
                        ClassProject: {
                            where: {
                                romId: payload.romId
                            },
                            include: {
                                lab: true
                            }
                        }
                    }
                }
            },
            take: payload.pageSize,
            skip: userSkip
        });

        const countUsersWithLabs = await db.user.count({
            where: {
                AND: [
                    {
                        MemberClass: {
                            some: {
                                classRomId: myClass.id
                            }
                        }
                    },
                    {
                        MemberClass: {
                            some: {
                                ClassProject: {
                                    some: {
                                        romId: payload.romId,
                                        lab: {
                                            ClassProject: {
                                                romId: payload.romId
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        });
        return {
            Statistics: {
                countUsersWithLabs: countUsersWithLabs,
                totalStudentsInClass: totalStudentsInClass
            },
            usersWithLabs,
            totalStudentsInClass
        };
    }

    static async getLabsSubmittedInRom(
        payload: {
            romId: string;
            pageSize: number;
            page: number;
        },
        userId: string
    ) {
        const myClass = await db.classRom.findFirst({
            where: {
                AND: [
                    {
                        Rom: {
                            some: {
                                id: payload.romId
                            }
                        }
                    },
                    {
                        MemberClass: {
                            some: {
                                userId: userId,
                                isTeacher: true
                            }
                        }
                    }
                ]
            }
        });

        if (!myClass) {
            throw new Error('No class found');
        }
        const userSkip = (payload.page - 1) * payload.pageSize;

        const labs = await db.lab.findMany({
            where: {
                ClassProject: {
                    romId: payload.romId
                }
            },
            include: {
                ClassProject: {
                    include: {
                        memberClass: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            },
            take: payload.pageSize,
            skip: userSkip
        });
        const totalCountLabs = await db.lab.count({
            where: {
                ClassProject: {
                    romId: payload.romId
                }
            }
        });
        return { labs, totalCountLabs };
    }
}

export default ClassRoomRepository;
