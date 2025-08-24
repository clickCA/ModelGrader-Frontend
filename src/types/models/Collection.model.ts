import { GroupModel } from "./Group.model";
import {
	ProblemModel,
	ProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel,
	ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel,
	ProblemSecureModel,
} from "./Problem.model";

export type CollectionModel = {
	collection_id: string;
	creator: string;
	name: string;
	description: string | null;
	is_active: boolean;
	is_private: boolean;
	created_date: string;
	updated_date: string;
	group_permissions: CollectionGroupPermissionModel[]
	// TODO: Change to CollectionProblemModel[]
	problems?: CollectionProblemPopulateProblemModel[]
};

export type CollectionPopulateProblemSecureModel = CollectionModel & {
	problems: ProblemSecureModel[];
};

export type CollectionProblemModel = CollectionModel & {
	problems: CollectionProblemPopulateProblemSecureModel[];
};

export type CollectionCreateRequest = {
	name: string;
	description?: string;
};

export type CollectionUpdateRequest = {
	name?: string;
	description?: string;
};

export type CollectionProblemPopulateProblemModel = {
	id: string;
	problem: ProblemModel;
	order: number;
	collection: number;
};

export type CollectionProblemPopulateProblemSecureModel = {
	id: string;
	problem: ProblemSecureModel;
	order: number;
	collection: number;
};

export type CollectionHashedTable = {
	[
		collection_id: string
	]: CollectionPopulateCollectionProblemPopulateProblemModel;
};

export type CollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel =
	{
		id: string;
		problem: ProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel;
		order: number;
		collection: number;
	};

export type CollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel =
	CollectionModel & {
		problems: CollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel[];
	};

export type CollectionPopulateCollectionProblemPopulateProblemModel =
	CollectionModel & {
		problems: CollectionProblemPopulateProblemModel[];
	};

export type CollectionGroupPermissionModel = {
	collection_group_permission_id: string;
	group: GroupModel;
	permission_manage_collections: boolean;
	permission_view_collections: boolean;
	collection: string;
};

export type CollectionGroupPermissionPopulateGroupModel =
	CollectionGroupPermissionModel & {
		group: GroupModel;
	};

export type CollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupModel =
	CollectionModel & {
		problems: CollectionProblemPopulateProblemModel[];
		group_permissions: CollectionGroupPermissionPopulateGroupModel[];
	};

export type CollectionProblemsPopulateProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel =
	CollectionProblemModel & {
		problem: ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel;
	};

export type CollectionPopulateCollectionProblemsPopulateProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupAndCollectionGroupPermissionsPopulateGroupModel =
	CollectionModel & {
		group_permissions: CollectionGroupPermissionPopulateGroupModel[];
		problems: CollectionProblemsPopulateProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel[];
	};
