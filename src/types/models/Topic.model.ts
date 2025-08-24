import { CollectionModel, CollectionPopulateCollectionProblemPopulateProblemModel, CollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel, CollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupModel } from "./Collection.model"
import { TopicGroupPermissionPopulateGroupModel } from "./Group.model"

export type TopicModel = {
    topic_id: string
    creator: string
    name: string
    description: string | null
    image_url: string | null
    is_active: boolean
    is_private: boolean
    created_date: string
    updated_date: string
    // TODO: Change to TopicCollectionModel[]
    collections?: TopicCollectionPopulateCollectionModel[]
}

export type TopicSecureModel = {
    topic_id: string
    creator: string
    name: string
    description: string | null
    image_url: string | null
    created_date: string
    updated_date: string
}

export type TopicCollectionModel = {
    topic: TopicModel;
    collection: CollectionModel[]
}

export type TopicCollectionPopulateCollectionModel = {
    id: string;
    collection: CollectionModel;
    order: number;
    topic: number;
}

export type TopicPopulateTopicCollectionPopulateCollectionModel = TopicModel & {
    collections: TopicCollectionPopulateCollectionModel[]
}

export type TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel = {
    id: string;
    collection: CollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel;
    order: number;
    topic: number;
}

// export type TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel = TopicSecureModel & {
//     collections: TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel[]
// }

export type TopicPopulateTopicCollectionPopulateCollectionAndTopicGroupPermissionPopulateGroupModel = TopicModel & {
    collections: TopicCollectionPopulateCollectionModel[]
    group_permissions: TopicGroupPermissionPopulateGroupModel[]
}

export type TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemModel = TopicCollectionPopulateCollectionModel & {
    collection: CollectionPopulateCollectionProblemPopulateProblemModel
}

export type TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemAndTopicGroupPermissionPopulateGroupModel = TopicModel & {
    collections: TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemModel[]
    group_permissions: TopicGroupPermissionPopulateGroupModel[]
}

export type TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemAndCollectionGroupPermissionsPopulateGroupModel = {
    id: string;
    collection: CollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupModel;
    order: number;
    topic: number;
}

export type TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupAndTopicGroupPermissionPopulateGroupModel = TopicModel & {
    collections: TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemAndCollectionGroupPermissionsPopulateGroupModel[]
    group_permissions: TopicGroupPermissionPopulateGroupModel[]
}