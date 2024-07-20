
"use server";
import { ROLE } from '@prisma/client';
import { getSession } from '../../auth/service/actions';
import ReportRepository from '../repository/report-repository';
import { AddReportInput, DeleteAnyReportInput, GetReportedInput } from '../type';


export const addReport = async (
    payload: AddReportInput
) => {
    const session = await getSession();
    const userId = session?.id;
    return ReportRepository.addReport(payload, userId);
};



export const deleteAnyReport = async (
    payload: DeleteAnyReportInput
) => {
    const session = await getSession();
    const role = session?.role;
    if (role === ROLE.ADMIN) {
        return ReportRepository.deleteAnyReport(payload);

    }
    else {
        throw new Error(" you are not admin");
    }

};


export const getReport = async (
    payload: GetReportedInput
) => {
    const session = await getSession();
    const role = session?.role;
    if (role === ROLE.ADMIN) {
        return ReportRepository.getReport(payload);

    }
    else {
        throw new Error(" you are not admin");
    }

};
