import React, { useEffect, useState } from "react";
import { GroupService } from "@/services/Group.service";
import {
	CourseGroupPermissionRequestForm,
	CreateCourseRequestForm,
} from "@/types/forms/CreateCourseRequestForm";
import { CollectionPopulateCollectionProblemPopulateProblemModel } from "@/types/models/Collection.model";
import { GroupModel } from "@/types/models/Group.model";
import MyCollectionMiniCard2 from "../../Cards/CollectionCards/MyCollectionMiniCard2";
import PermissionSwitchScrollArea from "../../Permissions/PermissionSwitchScrollArea";
import { Switch } from "@/components/shadcn/Switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/Tabs";
import GroupAndPermissionManager, {
	GroupAndPermissionManagerOnAddGroupsCallback,
	GroupAndPermissionManagerOnRemoveGroupCallback,
} from "../GroupAndPermissionManager";
import CoursePermissionSwitchGroup from "../PermissionSwitchGroups/CoursePermissionSwitchGroup";

const ManageGroups = ({
	createRequest,
	setCreateRequest,
}: {
	createRequest: CreateCourseRequestForm;
	setCreateRequest: React.Dispatch<
		React.SetStateAction<CreateCourseRequestForm>
	>;
}) => {
	const accountId = String(localStorage.getItem("account_id"));

	const [groupPermission, setGroupPermission] =
		useState<CourseGroupPermissionRequestForm>();

	const [selectedIndex, setselectedIndex] = useState<number>(-1);
	const [currentGroupId, setCurrentGroupId] = useState<string>("");

	const handleAddGroups = ({
		addingGroups,
	}: GroupAndPermissionManagerOnAddGroupsCallback) => {
		const newGroupPermissions = addingGroups.map((group) => ({
			group_id: group.group_id,
			group,
			manageCourses: group.permission_manage_topics,
			viewCourseLogs: group.permission_view_topics_log,
			viewCourses: group.permission_view_topics,
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
		if (index === selectedIndex) {
			setselectedIndex(-1);
		}
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

	const [tabValue, setTabValue] = useState("course");
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
						<TabsTrigger value="course">
							Course Permissions
						</TabsTrigger>
						<TabsTrigger value="collections">
							Collection Permissions
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
				setSelectedIndex={setselectedIndex}
			>
				<>
					{tabValue === "course" && (
						<PermissionSwitchScrollArea>
							{groupPermission && selectedIndex >= 0 && (
								<CoursePermissionSwitchGroup
									manageCoursesChecked={
										groupPermission.manageCourses
									}
									viewCourseLogsChecked={
										groupPermission.viewCourseLogs
									}
									viewCoursesChecked={
										groupPermission.viewCourses
									}
									onClickManageCourses={() =>
										setGroupPermission({
											...groupPermission,
											manageCourses:
												!groupPermission.manageCourses,
										})
									}
									onClickViewCourseLogs={() =>
										setGroupPermission({
											...groupPermission,
											viewCourseLogs:
												!groupPermission.viewCourseLogs,
										})
									}
									onClickViewCourses={() =>
										setGroupPermission({
											...groupPermission,
											viewCourses:
												!groupPermission.viewCourses,
										})
									}
								/>
							)}
						</PermissionSwitchScrollArea>
					)}

					{tabValue === "collections" &&
						groupPermission &&
						selectedIndex >= 0 && (
							<div className="grid gap-y-2 p-2 rounded-md">
								{createRequest.collectionsInterface?.map(
									(courseCollection) => (
										<div className="flex items-center justify-between pr-5">
											<div className="w-1/2">
												<MyCollectionMiniCard2
													disabledHighlight
													collection={
														courseCollection.collection as CollectionPopulateCollectionProblemPopulateProblemModel
													}
												/>
											</div>

											<div className="text-base font-medium flex items-center">
												View Collection
												<Switch
													checked={
														courseCollection.groupPermissions?.find(
															(gp) =>
																gp.group
																	.group_id ===
																currentGroupId
														)?.viewCollections || false
													}
													onClick={() => {
														const findGroup =
															courseCollection.groupPermissions?.find(
																(gp) =>
																	gp.group
																		.group_id ===
																	currentGroupId
															);

														const newGroupPermissions =
															courseCollection.groupPermissions.map(
																(gp) => {
																	if (
																		gp.group
																			.group_id ===
																		currentGroupId
																	) {
																		return {
																			...gp,
																			viewCollections:
																				!gp.viewCollections,
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
																	group_id:
																		currentGroupId,
																	group: allGroups.find(
																		(g) =>
																			g.group_id ===
																			currentGroupId
																	)!,
																	viewCollections:
																		true,
																	manageCollections:
																		false,
																}
															);
														}

														if (
															!createRequest.course
														) {
															return;
														}

														setCreateRequest({
															...createRequest,
															collectionsInterface:
																createRequest.collectionsInterface.map(
																	(cc) => {
																		if (
																			cc
																				.collection
																				.collection_id ===
																			courseCollection
																				.collection
																				.collection_id
																		) {
																			return {
																				...cc,
																				groupPermissions:
																					newGroupPermissions,
																			};
																		} else {
																			return cc;
																		}
																	}
																),
														});
													}}
													className="ml-2"
												/>
											</div>
											<div className="text-base font-medium flex items-center">
												Manage Collection
												<Switch
													checked={
														courseCollection.groupPermissions?.find(
															(gp) =>
																gp.group
																	.group_id ===
																currentGroupId
														)?.manageCollections || false
													}
													onClick={() => {
														const findGroup =
															courseCollection.groupPermissions?.find(
																(gp) =>
																	gp.group
																		.group_id ===
																	currentGroupId
															);

														const newGroupPermissions =
															courseCollection.groupPermissions.map(
																(gp) => {
																	if (
																		gp.group
																			.group_id ===
																		currentGroupId
																	) {
																		return {
																			...gp,
																			manageCollections:
																				!gp.manageCollections,
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
																	group_id:
																		currentGroupId,
																	group: allGroups.find(
																		(g) =>
																			g.group_id ===
																			currentGroupId
																	)!,
																	viewCollections:
																		false,
																	manageCollections:
																		true,
																}
															);
														}

														if (
															!createRequest.course
														) {
															return;
														}

														setCreateRequest({
															...createRequest,
															collectionsInterface:
																createRequest.collectionsInterface.map(
																	(cc) => {
																		if (
																			cc
																				.collection
																				.collection_id ===
																			courseCollection
																				.collection
																				.collection_id
																		) {
																			return {
																				...cc,
																				groupPermissions:
																					newGroupPermissions,
																			};
																		} else {
																			return cc;
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
