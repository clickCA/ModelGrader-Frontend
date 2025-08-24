import { AxiosResponse } from "axios";
import { TopicModel, TopicPopulateTopicCollectionPopulateCollectionModel, TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupAndTopicGroupPermissionPopulateGroupModel } from "../models/Topic.model";

export type GetAllTopicsByAccountResponse = {
    topics: TopicPopulateTopicCollectionPopulateCollectionModel[];
    manageable_topics: TopicPopulateTopicCollectionPopulateCollectionModel[];
}

export type GetAllTopicsByAccessibleAccountResponse = {
    topics: TopicModel[];
}

export type CourseGroupPermissionCreateRequest = {
    group_id: string;
    permission_manage_topics?: boolean
    permission_view_topics?: boolean
    permission_view_topics_log?: boolean
}

export type TopicSerivceAPI = {
    create: (accountid: string,request: FormData) => Promise<AxiosResponse<TopicModel>>;
    get: (accountId: string,courseId:string) => Promise<AxiosResponse<TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupAndTopicGroupPermissionPopulateGroupModel>>;
    getAllAsCreator: (accountId:string) => Promise<AxiosResponse<GetAllTopicsByAccountResponse>>;
    getAllAccessibleByAccount: (accountId:string) => Promise<AxiosResponse<GetAllTopicsByAccessibleAccountResponse>>;
    getPublicByAccount: (accountId:string,courseId:string) => Promise<AxiosResponse<TopicModel>>;
    update: (courseId:string,accountId:string,request: FormData) => Promise<AxiosResponse<TopicModel>>;
    delete: (courseId:string,accountId:string) => Promise<AxiosResponse<null>>;
    updateCollections: (topicId:string,collectionIds:string[]) => Promise<AxiosResponse<TopicModel>>;
    updateGroupPermissions: (topicId:string,accountId:string,groups:CourseGroupPermissionCreateRequest[]) => Promise<AxiosResponse<TopicModel>>;
}