import axios from "axios";
import { BASE_URL } from "../constants/BackendBaseURL";
import { CollectionServiceAPI, GetCollectionByAccountResponse } from "@/types/apis/Collection.api";
import { CollectionModel, CollectionPopulateCollectionProblemsPopulateProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupAndCollectionGroupPermissionsPopulateGroupModel } from "@/types/models/Collection.model";

export const CollectionService: CollectionServiceAPI = {
    create: (accountId,request) => {
        return axios.post<CollectionModel>(`${BASE_URL}/api/accounts/${accountId}/collections`,request);
    },

    get: (collectionId,accountId) => {
        return axios.get<CollectionPopulateCollectionProblemsPopulateProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupAndCollectionGroupPermissionsPopulateGroupModel>(`${BASE_URL}/api/accounts/${accountId}/collections/${collectionId}`);
    },

    getAllAsCreator: (accountId) => {
        return axios.get<GetCollectionByAccountResponse>(`${BASE_URL}/api/accounts/${accountId}/collections`);
    },

    update: (collectionId,accountId,request) => {
        return axios.put<CollectionModel>(`${BASE_URL}/api/accounts/${accountId}/collections/${collectionId}`,request);
    },

    delete: (collectionId,accountId) => {
        return axios.delete<null>(`${BASE_URL}/api/accounts/${accountId}/collections/${collectionId}`);
    },

    addProblem: (collectionId,problemIds) => {
        return axios.put<CollectionModel>(`${BASE_URL}/api/collections/${collectionId}/problems/add`,{problemIds});
    },

    removeProblem: (collectionId,problemIds) => {
        return axios.put(`${BASE_URL}/api/collections/${collectionId}/problems/remove`,{data:{problemIds}});
    },

    updateProblem: (collectionId,problemIds) => {
        return axios.put<CollectionModel>(`${BASE_URL}/api/collections/${collectionId}/problems/update`,{problem_ids: problemIds});
    },

    updateGroupPermissions: (collectionId,accountId,groups) => {
        return axios.put<CollectionModel>(`${BASE_URL}/api/accounts/${accountId}/collections/${collectionId}/groups`,{groups});
    }
    
}