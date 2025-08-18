import React, { useEffect, useState } from "react";
import {
	CollectionGroupPermissionRequestForm,
	CreateCollectionRequestForm,
} from "@/types/forms/CreateCollectionRequestForm";
import GroupAndPermissionManager, {
	GroupAndPermissionManagerOnAddGroupsCallback,
	GroupAndPermissionManagerOnRemoveGroupCallback,
} from "../GroupAndPermissionManager";
import CollectionPermissionSwitchGroup from "../PermissionSwitchGroups/CollectionPermissionSwitchGroup";
import { GroupModel } from "@/types/models/Group.model";
import { GroupService } from "@/services/Group.service";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/Tabs";
import PermissionSwitchScrollArea from "../../Permissions/PermissionSwitchScrollArea";
import MyProblemMiniCard2 from "../../Cards/ProblemCards/MyProblemMiniCard2";
import { Switch } from "@/components/shadcn/Switch";

const ManageGroups = ({
	createRequest,
	setCreateRequest,
}: {
	createRequest: CreateCollectionRequestForm;
	setCreateRequest: React.Dispatch<
		React.SetStateAction<CreateCollectionRequestForm>
	>;
}) => {
	const accountId = String(localStorage.getItem("account_id"));

	const [groupPermission, setGroupPermission] =
		useState<CollectionGroupPermissionRequestForm>();

	const [selectedIndex, setSelectedIndex] = useState<number>(-1);
	const [currentGroupId, setCurrentGroupId] = useState<string>("");

	const handleAddGroups = ({
		addingGroups,
	}: GroupAndPermissionManagerOnAddGroupsCallback) => {
		const newGroupPermissions = addingGroups.map((group) => ({
			group_id: group.group_id,
			group,
			manageCollections: group.permission_manage_collections,
			viewCollections: group.permission_view_collections,
		}));

		setCreateRequest({
			...createRequest,
			groupPermissions: [
				...createRequest.groupPermissions,
				...newGroupPermissions,
			],
		});
	};

	const handleRemoveGroup = ({
		index,
	}: GroupAndPermissionManagerOnRemoveGroupCallback) => {
		setCreateRequest({
			...createRequest,
			groupPermissions: createRequest.groupPermissions.filter(
				(_, i) => i !== index
			),
		});
	};

	useEffect(() => {
		if (
			selectedIndex >= 0 &&
			selectedIndex < createRequest.groupPermissions.length
		) {
			setGroupPermission(createRequest.groupPermissions[selectedIndex]);
			setCurrentGroupId(
				createRequest.groupPermissions[selectedIndex].group_id
			);
		}
	}, [selectedIndex]);

	useEffect(() => {
		if (groupPermission) {
			setCreateRequest({
				...createRequest,
				groupPermissions: [
					...createRequest.groupPermissions.slice(0, selectedIndex),
					groupPermission,
					...createRequest.groupPermissions.slice(selectedIndex + 1),
				],
			});
		}
	}, [groupPermission]);

	const [tabValue, setTabValue] = useState<string>("collection");
	const [allGroups, setAllGroups] = useState<GroupModel[]>([]);

	useEffect(() => {
		GroupService.getAllAsCreator(accountId).then((response) => {
			setAllGroups(response.data.groups);
		});
	}, [accountId]);

	return (
		<>
			<div className="flex justify-end">
				<Tabs value={tabValue} onValueChange={(e) => setTabValue(e)}>
					<TabsList>
						<TabsTrigger value="collection">
							Collection Permissions
						</TabsTrigger>
						<TabsTrigger value="problems">
							Problem Permissions
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
			<GroupAndPermissionManager
				allGroups={allGroups}
				createRequest={createRequest}
				// setCreateRequest={setCreateRequest}
				onAddGroups={(e) => handleAddGroups(e)}
				onRemoveGroup={(e) => handleRemoveGroup(e)}
				selectedIndex={selectedIndex}
				setSelectedIndex={setSelectedIndex}
			>
				<>
					{tabValue === "collection" && (
						<PermissionSwitchScrollArea>
							{groupPermission && selectedIndex >= 0 && (
								<CollectionPermissionSwitchGroup
									manageCollectionsChecked={
										groupPermission.manageCollections
									}
									viewCollectionsChecked={
										groupPermission.viewCollections
									}
									onClickManageCollections={() => {
										setGroupPermission({
											...groupPermission,
											manageCollections:
												!groupPermission.manageCollections,
										});
									}}
									onClickViewCollections={() => {
										setGroupPermission({
											...groupPermission,
											viewCollections:
												!groupPermission.viewCollections,
										});
									}}
								/>
							)}
						</PermissionSwitchScrollArea>
					)}

					{tabValue === "problems" &&
						groupPermission &&
						selectedIndex >= 0 && (
							<div className="grid gap-y-2 p-2 rounded-md">
								{createRequest.problemsInterface.map(
									(collectionProblem) => (
										<div className="flex items-center justify-between pr-5">
											<div className="w-1/2">
												<MyProblemMiniCard2
													disabledHighlight
													problem={
														collectionProblem.problem
													}
												/>
											</div>

											<div className="text-base font-medium flex items-center">
												View Problem
												<Switch
													checked={
														collectionProblem.groupPermissions?.find(
															(gp) =>
																gp.group
																	.group_id ===
																currentGroupId
														)?.viewProblems ||
														false
													}
													onClick={() => {
														const findGroup =
														collectionProblem.groupPermissions?.find(
																(gp) =>
																	gp.group
																		.group_id ===
																	currentGroupId
															);

														const newGroupPermissions =
															collectionProblem.groupPermissions.map(
																(gp) => {
																	if (
																		gp.group
																			.group_id ===
																		currentGroupId
																	) {
																		return {
																			...gp,
																			viewProblems:
																				!gp.viewProblems,
																		};
																	} else {
																		return gp;
																	}
																}
															);

														if (
															!findGroup ||
															newGroupPermissions.length ===
																0
														) {
															newGroupPermissions.push(
																{
																	groupId:
																		currentGroupId,
																	group: allGroups.find(
																		(g) =>
																			g.group_id ===
																			currentGroupId
																	)!,
																	viewProblems:
																		true,
																	manageProblems:
																		false,
																}
															);
														}

														if (
															!createRequest.collection
														) {
															return;
														}

														setCreateRequest({
															...createRequest,
															problemsInterface:
																createRequest.problemsInterface.map(
																	(cp) => {
																		if (
																			cp
																				.problem
																				.problem_id ===
																			collectionProblem
																				.problem
																				.problem_id
																		) {
																			return {
																				...cp,
																				groupPermissions:
																					newGroupPermissions,
																			};
																		} else {
																			return cp;
																		}
																	}
																),
														});
													}}
													className="ml-2"
												/>
											</div>
											<div className="text-base font-medium flex items-center">
												Manage Problem
												<Switch
													checked={
														collectionProblem.groupPermissions?.find(
															(gp) =>
																gp.group
																	.group_id ===
																currentGroupId
														)?.manageProblems ||
														false
													}
													onClick={() => {
														const findGroup =
															collectionProblem.groupPermissions?.find(
																(gp) =>
																	gp.group
																		.group_id ===
																	currentGroupId
															);

														const newGroupPermissions =
															collectionProblem.groupPermissions.map(
																(gp) => {
																	if (
																		gp.group
																			.group_id ===
																		currentGroupId
																	) {
																		return {
																			...gp,
																			manageProblems:
																				!gp.manageProblems,
																		};
																	} else {
																		return gp;
																	}
																}
															);

														if (
															!findGroup ||
															newGroupPermissions.length ===
																0
														) {
															newGroupPermissions.push(
																{
																	groupId:
																		currentGroupId,
																	group: allGroups.find(
																		(g) =>
																			g.group_id ===
																			currentGroupId
																	)!,
																	viewProblems:
																		false,
																	manageProblems:
																		true,
																}
															);
														}

														if (
															!createRequest.collection
														) {
															return;
														}

														setCreateRequest({
															...createRequest,
															problemsInterface:
																createRequest.problemsInterface.map(
																	(cp) => {
																		if (
																			cp
																				.problem
																				.problem_id ===
																			collectionProblem
																				.problem
																				.problem_id
																		) {
																			return {
																				...cp,
																				groupPermissions:
																					newGroupPermissions,
																			};
																		} else {
																			return cp;
																		}
																	}
																),
														});
													}}
													className="ml-2"
												/>
											</div>
										</div>
									)
								)}
							</div>
						)}
				</>
			</GroupAndPermissionManager>
		</>
	);
};

export default ManageGroups;
