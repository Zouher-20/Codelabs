"use server";
import LabRepository from "../repository/lab-repository";
import { SaveCodeLabInput } from "../type";

export const saveCodeLab = async (payload: SaveCodeLabInput) => {

    return LabRepository.saveCodeLab(payload);
};