import axios from "axios";
import { BASE_URL } from "../constants/BackendBaseURL";
import { GetAllProblemsByAccountResponse, GetAllProblemsResponse, ProblemServiceAPI, ValidateProgramResponse } from "@/types/apis/Problem.api";
import { ProblemModel, ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel, ProblemPopulateCreatorSecureModel } from "@/types/models/Problem.model";

export const ProblemService: ProblemServiceAPI = {
    create: async (accountId,request) => {
        return axios.post<ProblemModel>(`${BASE_URL}/api/accounts/${accountId}/problems`, request);
    },

    getAll: async (query) => {
        return axios.get<GetAllProblemsResponse>(`${BASE_URL}/api/problems`,{params:query});
    },

    getAllAsCreator: async (accountId,query) => {
        return axios.get<GetAllProblemsByAccountResponse>(`${BASE_URL}/api/accounts/${accountId}/problems`,{params:query});
    },

    get: async (accountId,problemId) => {
        return axios.get<ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel>(`${BASE_URL}/api/accounts/${accountId}/problems/${problemId}`);
    },

    update: async (problemId,accountId,request) => {
        return axios.put<ProblemModel>(`${BASE_URL}/api/accounts/${accountId}/problems/${problemId}`, request);
    },

    delete: async (problemId,accountId) => {
        return axios.delete<null>(`${BASE_URL}/api/accounts/${accountId}/problems/${problemId}`);
    },

    // deleteMultiple: async (problemIds) => {
    //     return axios.delete<null>(`${BASE_URL}/api/problems/`, {problem: problemIds});
    // },

    updateGroupPermissions: async (problemId, accountId,groups) => {
        return axios.put<ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel>(`${BASE_URL}/api/accounts/${accountId}/problems/${problemId}/groups`, {groups});
    },

    validateProgram: async (request) => {
        return axios.post<ValidateProgramResponse>(`${BASE_URL}/api/problems/validate`, request);
    },

    getPublic: async (problemId) => {
        return axios.get<ProblemPopulateCreatorSecureModel>(`${BASE_URL}/api/problems/${problemId}`);
    },
}