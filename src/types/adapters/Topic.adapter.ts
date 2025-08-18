import { handleDeprecatedDescription } from "@/utilities/HandleDeprecatedDescription";
import { CreateCourseRequestForm } from "../forms/CreateCourseRequestForm";
import { TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupAndTopicGroupPermissionPopulateGroupModel } from "../models/Topic.model";

export function transformTopicPopulateTopicCollectionPopulateCollectionAndTopicGroupPermissionPopulateGroupModel2CreateCourseRequest(topic:TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupAndTopicGroupPermissionPopulateGroupModel): CreateCourseRequestForm {
    return {
        title: topic.name,
        description: JSON.parse(handleDeprecatedDescription(String(topic.description))),
        image: topic.image_url,
        isPrivate: topic.is_private,
        collectionsInterface: topic.collections.map((tc) => ({
            id: tc.collection.collection_id,
            name: tc.collection.name,
            collection: tc.collection,
            groupPermissions: tc.collection.group_permissions.map((gp) => ({
                group_id: gp.group.group_id,
                group: gp.group,
                manageCollections: gp.permission_manage_collections,
                viewCollections: gp.permission_view_collections,
            })),
        })),
        groupPermissions: topic.group_permissions.map((gp) => ({
            group_id: gp.group.group_id,
            group: gp.group,
            manageCourses: gp.permission_manage_topics,
            viewCourses: gp.permission_view_topics,
            viewCourseLogs: gp.permission_view_topics_log,
        })),
        course: topic,
        // collectionGroupPermissions: topic.collections.map((tc) => ({
        //     collection_id: tc.collection.collection_id,
        //     collection: tc.collection,
        //     groupPermissions: tc.collection.group_permissions.map((gp) => ({
        //         group_id: gp.group.group_id,
        //         group: gp.group,
        //         manageCollections: gp.permission_manage_collections,
        //         viewCollections: gp.permission_view_collections,
        //     }))
        // }))
    }
}