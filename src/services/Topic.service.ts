import axios from "axios";
import { BASE_URL } from "../constants/BackendBaseURL";
import { GetAllTopicsByAccountResponse, TopicSerivceAPI } from "../types/apis/Topic.api";
import { TopicModel, TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupAndTopicGroupPermissionPopulateGroupModel } from "../types/models/Topic.model";

export const TopicService: TopicSerivceAPI = {
    create: async (accountId, request) => {
        const response = await axios.post<TopicModel>(`${BASE_URL}/api/accounts/${accountId}/topics`, request);
        return response;
    },

    get: async (accountId,topicId) => {
        const response = await axios.get<TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupAndTopicGroupPermissionPopulateGroupModel>(`${BASE_URL}/api/accounts/${accountId}/topics/${topicId}`);
        return response;
    },

    getAllAccessibleByAccount: async (accountId) => {
        const response = await axios.get<GetAllTopicsByAccountResponse>(`${BASE_URL}/api/accounts/${accountId}/access/topics`);
        return response;
    },

    update: async (topicId,accountId, request) => {
        const response = await axios.put<TopicModel>(`${BASE_URL}/api/accounts/${accountId}/topics/${topicId}`, request);
        return response;
    },

    delete: async (topicId,accountId) => {
        const response = await axios.delete<null>(`${BASE_URL}/api/accounts/${accountId}/topics/${topicId}`);
        return response;
    },

    getAllAsCreator: async (accountId) => {
        const response = await axios.get<GetAllTopicsByAccountResponse>(`${BASE_URL}/api/accounts/${accountId}/topics`);
        return response;
    },

    updateCollections: async (topicId, collectionIds) => {
        const response = await axios.put<TopicModel>(`${BASE_URL}/api/topics/${topicId}/collections/update`, {
            collection_ids: collectionIds
        });
        return response;
    },

    getPublicByAccount: async (accountId,topicId) => {
        const response = await axios.get<TopicModel>(`${BASE_URL}/api/topics/${topicId}?account_id=${accountId}`);
        return response;
    },

    updateGroupPermissions: async (topicId,accountId, groups) => {
        const response = await axios.put<TopicModel>(`${BASE_URL}/api/accounts/${accountId}/topics/${topicId}/groups`, {
            groups: groups
        });
        return response;
    }
}