import axios from "axios";
import { GroupSerivceAPI } from "@/types/apis/Group.api";
import { BASE_URL } from "../constants/BackendBaseURL";

export const GroupService: GroupSerivceAPI = {
    get: async (groupId:string,query?:any) => {
        const response = await axios.get(`${BASE_URL}/api/groups/${groupId}`,{
            params: query
        })

        return response;
    },

    getAllAsCreator: async (accountId:string,query?:any) => {
        const response = await axios.get(`${BASE_URL}/api/accounts/${accountId}/groups`,{
            params: query,
        })

        return response;
    },

    create: async (accountId,request) => {
        const response = await axios.post(`${BASE_URL}/api/accounts/${accountId}/groups`,request)

        return response;
    },

    update: async (groupId,request) => {
        const response = await axios.put(`${BASE_URL}/api/groups/${groupId}`,request)

        return response;
    },

    delete: async (groupId) => {
        const response = await axios.delete(`${BASE_URL}/api/groups/${groupId}`)

        return response;
    },

    updateMembers: async (groupId,accountIds) => {
        const response = await axios.put(`${BASE_URL}/api/groups/${groupId}/members/update`,{
            account_ids: accountIds
        })

        return response;
    },

    addMembers: async (groupId,accountIds) => {
        const response = await axios.put(`${BASE_URL}/api/groups/${groupId}/members/add`,{
            account_ids: accountIds
        })

        return response;
    }
}