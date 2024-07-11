import { db } from "@/app/api/core/db/db";
import { NAMEPLAN } from "@prisma/client";

class AdminClassRoomRepository {


    //class rom by id 
    //student 


    static async getRoomAndTeacherDetailsForAdmin(
        payload: {
            romId: string;
        },
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
    static async getClassRomStatisticsForAdmin(
        payload: {
            classRomId: string;
        },
    ) {

        const teacher = await db.memberClass.findFirst({
            where: {
                classRomId: payload.classRomId,
                isTeacher: true
            }
        });

        const myClass = await db.classRom.findFirst({
            where: {
                id: payload.classRomId,
                MemberClass: {
                    some: {
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
                userId: teacher?.id
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
    static async getAllClassRooms(payload: {
        page: number;
        pageSize: number;
        searchWord?: string;
    }) {
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
    static async getUserInClassForAdmin(
        payload: { userPage: number; userPageSize: number; classRomId: string },
    ) {
        const userSkip = (payload.userPage - 1) * payload.userPageSize;
        const myClassRom = await db.classRom.findUnique({
            where: {
                id: payload.classRomId
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

    static async getRomInClassForAdmin(
        payload: {
            romePage: number;
            romPageSize: number;
            classRomId: string;
        },
    ) {
        const romSkip = (payload.romePage - 1) * payload.romPageSize;
        const myClassRom = await db.classRom.findUnique({
            where: {
                id: payload.classRomId,
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






}
export default AdminClassRoomRepository;