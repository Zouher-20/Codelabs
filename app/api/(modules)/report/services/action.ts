
"user server";
import { getSession } from '../../auth/service/actions';
import ReportRepository from '../repository/report-repository';
import { AddReportInput } from '../type';


export const addReport = async (
    payload: AddReportInput
) => {
    const session = await getSession();
    const userId = session?.id;
    return ReportRepository.addReport(payload, userId);
};


