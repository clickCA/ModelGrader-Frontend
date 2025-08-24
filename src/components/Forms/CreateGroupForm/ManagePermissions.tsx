import React from "react";
import { CreateGroupRequestForm } from "@/types/forms/CreateGroupRequestForm";
import PermissionSwitchScrollArea from "../../Permissions/PermissionSwitchScrollArea";
import CollectionPermissionSwitchGroup from "../PermissionSwitchGroups/CollectionPermissionSwitchGroup";
import CoursePermissionSwitchGroup from "../PermissionSwitchGroups/CoursePermissionSwitchGroup";
import ProblemPermissionSwitchGroup from "../PermissionSwitchGroups/ProblemPermissionSwitchGroup";

const ManagePermissions = ({
	createRequest,
	setCreateRequest,
}: {
	createRequest: CreateGroupRequestForm;
	setCreateRequest: React.Dispatch<
		React.SetStateAction<CreateGroupRequestForm>
	>;
}) => {
	return (
		<div>
			<p className="font-bold text-2xl">Manage Permissions</p>

			<div className="mt-5">
				<PermissionSwitchScrollArea
					className="h-[70vh] xxl:h-[75vh]"
					childrenClassName="w-[95%]"
				>
					<p className="font-bold text-base text-green-600 mt-3">
						Course Permission
					</p>
					<CoursePermissionSwitchGroup
						manageCoursesChecked={createRequest.manageCourses}
						viewCourseLogsChecked={createRequest.viewCourseLogs}
						viewCoursesChecked={createRequest.viewCourses}
						onClickManageCourses={() =>
							setCreateRequest({
								...createRequest,
								manageCourses: !createRequest.manageCourses,
							})
						}
						onClickViewCourseLogs={() =>
							setCreateRequest({
								...createRequest,
								viewCourseLogs: !createRequest.viewCourseLogs,
							})
						}
						onClickViewCourses={() =>
							setCreateRequest({
								...createRequest,
								viewCourses: !createRequest.viewCourses,
							})
						}
					/>
					<p className="font-bold text-base text-green-600 mt-3">
						Collection Permission
					</p>
					<CollectionPermissionSwitchGroup
						manageCollectionsChecked={createRequest.manageCollections}
						viewCollectionsChecked={createRequest.viewCollections}
						onClickManageCollections={() => setCreateRequest({
							...createRequest,
							manageCollections: !createRequest.manageCollections
						})}
						onClickViewCollections={() => setCreateRequest({
							...createRequest,
							viewCollections: !createRequest.viewCollections
						})}
					/>
					<p className="font-bold text-base text-green-600 mt-3">
						Problem Permission
					</p>
					<ProblemPermissionSwitchGroup
						manageProblemsChecked={createRequest.manageProblems}
						viewProblemsChecked={createRequest.viewProblems}
						onClickManageProblems={() => setCreateRequest({
							...createRequest,
							manageProblems: !createRequest.manageProblems
						})}
						onClickViewProblems={() => setCreateRequest({
							...createRequest,
							viewProblems: !createRequest.viewProblems
						})}
					/>
				</PermissionSwitchScrollArea>
			</div>
		</div>
	);
};

export default ManagePermissions;
