import { CopyPlus, PencilIcon, Trash } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CollectionService } from "../../services/Collection.service";
import { TopicService } from "../../services/Topic.service";
import { transformCreateCourseRequestForm2CreateTopicRequest } from "@/types/adapters/CreateCourseRequestForm.adapter";
import { transformTopicPopulateTopicCollectionPopulateCollectionAndTopicGroupPermissionPopulateGroupModel2CreateCourseRequest } from "@/types/adapters/Topic.adapter";
import { TopicModel } from "@/types/models/Topic.model";
import DeleteCourseConfirmationDialog from "../Dialogs/DeleteCourseConfirmationDialog";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "../shadcn/ContextMenu";
import { toast } from "../shadcn/UseToast";

const MyCourseContextMenu = ({
	children,
	course,
}: {
	children: React.ReactNode;
	course: TopicModel;
}) => {
	const accountId = String(localStorage.getItem("account_id"));
	const navigate = useNavigate();
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const handleCloneCourse = async () => {
		const response = await TopicService.get(
			accountId,
			course.topic_id
		);

		let createRequest =
			transformTopicPopulateTopicCollectionPopulateCollectionAndTopicGroupPermissionPopulateGroupModel2CreateCourseRequest(
				response.data
			);

		createRequest.title += " (Copy)";

		const { formData, groups, collectionIds, collectionGroupsPermissions } =
			transformCreateCourseRequestForm2CreateTopicRequest(
				createRequest
			);

			TopicService.create(accountId, formData)
			.then((response) => {
				return TopicService.updateCollections(
					response.data.topic_id,
					collectionIds
				);
			})
			.then((response) => {
				return TopicService.updateGroupPermissions(
					response.data.topic_id,
					accountId,
					groups
				);
			})
			.then((response) => {
				let promise = [];
				for (const collection of collectionGroupsPermissions) {
					promise.push(
						CollectionService.updateGroupPermissions(
							collection.collection_id,
							accountId,
							collection.groupPermissions
						)
					);
				}

				return {
					promise: Promise.all(promise),
					topic_id: response.data.topic_id,
				};
			})
			.then(({ topic_id }) => {
				toast({
					title: "Create Completed",
				});
				window.open(`/my/courses/${topic_id}`,'_blank');
			});
	};

	return (
		<ContextMenu>
			<DeleteCourseConfirmationDialog
				course={course}
				open={openDeleteDialog}
				setOpen={setOpenDeleteDialog}
				afterDelete={() => window.location.reload()}
			/>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem disabled>
					<div className="font-medium">{course.name}</div>
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem
					onClick={() =>
						navigate(`/my/courses/${course.topic_id}/edit`)
					}
				>
					<PencilIcon className="mr-2" size={16} />
					Edit Course
				</ContextMenuItem>
				<ContextMenuItem onClick={handleCloneCourse}>
					<CopyPlus className="mr-2" size={16} />
					Clone Course
				</ContextMenuItem>
				<ContextMenuItem
					onClick={() => setOpenDeleteDialog(true)}
					className="text-red-400"
				>
					<Trash className="mr-2" size={16} />
					Delete Course
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
};

export default MyCourseContextMenu;
