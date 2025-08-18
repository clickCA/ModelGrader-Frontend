import { handleDeprecatedDescription } from "@/utilities/HandleDeprecatedDescription";
import { CreateCollectionRequestForm } from "../forms/CreateCollectionRequestForm";
import { CollectionHashedTable, CollectionPopulateCollectionProblemPopulateProblemModel, CollectionPopulateCollectionProblemsPopulateProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupAndCollectionGroupPermissionsPopulateGroupModel } from "../models/Collection.model";

export function transformCollectionPopulateProblemSecureModel2CollectionHashedTable(collections: CollectionPopulateCollectionProblemPopulateProblemModel[] ): CollectionHashedTable {
    let result:CollectionHashedTable = {};
    for (const collection of collections) {
        result[collection.collection_id] = collection;
    }
    return result;
}

export function transformCollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupModel2CreateCollectionRequest(collection: CollectionPopulateCollectionProblemsPopulateProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupAndCollectionGroupPermissionsPopulateGroupModel): CreateCollectionRequestForm {

    return {
        title: collection.name,
        description: JSON.parse(handleDeprecatedDescription(String(collection.description))),
        problemsInterface: collection.problems.map((cp) => ({
            id: cp.problem.problem_id,
            name: cp.problem.title,
            problem: cp.problem,
            groupPermissions: cp.problem.group_permissions.map((pgp) => ({
                groupId: pgp.group.group_id,
                group: pgp.group,
                manageProblems: pgp.permission_manage_problems,
                viewProblems: pgp.permission_view_problems,
            })),
        })),
        groupPermissions: collection.group_permissions.map((cgp) => ({
            group_id: cgp.group.group_id,
            group: cgp.group,
            manageCollections: cgp.permission_manage_collections,
            viewCollections: cgp.permission_view_collections,
        })),
        collection: collection,
    }
}