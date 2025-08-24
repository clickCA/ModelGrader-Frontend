import { ItemInterface } from "react-sortablejs";
import { PlateEditorValueType } from "../PlateEditorValueType";
import { CollectionModel, CollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupModel } from "../models/Collection.model";
import { GroupModel } from "../models/Group.model";
import { TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupAndTopicGroupPermissionPopulateGroupModel } from "../models/Topic.model";
import { CollectionGroupPermissionRequestForm } from "./CreateCollectionRequestForm";
import { CoursePermissionRequestForm } from "./CreateGroupRequestForm";

export type CourseGroupPermissionRequestForm = {
    group_id: string;
    group: GroupModel;
} & CoursePermissionRequestForm

export type CourseCollectionsGroupPermissionRequestForm = {
    collection_id: string;
    collection: CollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupModel;
    groupPermissions: CollectionGroupPermissionRequestForm[];
}

export type CollectionItemInterface = ItemInterface & {
    collection: CollectionModel;
    groupPermissions: CollectionGroupPermissionRequestForm[];
}

export type CreateCourseRequestForm = {
    title: string;
    description: PlateEditorValueType;
    image?: File | string | null;
    isPrivate?: boolean;
    collectionsInterface: CollectionItemInterface[] //ItemInterface[];
    groupPermissions: CourseGroupPermissionRequestForm[];
    course: null | TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupAndTopicGroupPermissionPopulateGroupModel //| TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemAndTopicGroupPermissionPopulateGroupModel | TopicPopulateTopicCollectionPopulateCollectionAndTopicGroupPermissionPopulateGroupModel | null;
    // collectionGroupPermissions: CourseCollectionsGroupPermissionRequestForm[];
}
