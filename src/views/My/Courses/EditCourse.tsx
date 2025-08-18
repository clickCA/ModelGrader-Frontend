import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateCourseForm, {
	OnCourseSavedCallback,
} from "../../../components/Forms/CreateCourseForm";
import { toast } from "../../../components/shadcn/UseToast";
import NavbarSidebarLayout from "../../../layout/NavbarSidebarLayout";
import { TopicService } from "../../../services/Topic.service";
import { transformCreateCourseRequestForm2CreateTopicRequest } from "@/types/adapters/CreateCourseRequestForm.adapter";
import { transformTopicPopulateTopicCollectionPopulateCollectionAndTopicGroupPermissionPopulateGroupModel2CreateCourseRequest } from "@/types/adapters/Topic.adapter";
import { CreateCourseRequestForm } from "@/types/forms/CreateCourseRequestForm";
import { CollectionService } from "../../../services/Collection.service";

const EditCourse = () => {
	const { courseId } = useParams();
	const editCourseId = String(courseId);
	const accountId = String(localStorage.getItem("account_id"));

	const [createRequest, setCreateRequest] =
		useState<CreateCourseRequestForm>();

	const handleSave = ({
		setLoading,
		createRequest,
	}: OnCourseSavedCallback) => {
		if (!setLoading || !createRequest || !courseId) {
			return;
		}

		const { formData, collectionIds, groups, collectionGroupsPermissions } =
			transformCreateCourseRequestForm2CreateTopicRequest(createRequest);

		console.log(formData.get("name"));

		setLoading(true);
		TopicService.update(editCourseId, accountId, formData)
			.then(() => {
				return TopicService.updateCollections(
					editCourseId,
					collectionIds
				);
			})
			.then(() => {
				return TopicService.updateGroupPermissions(
					editCourseId,
					accountId,
					groups
				);
			})
			.then(() => {
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

				return Promise.all(promise);
			})
			.then(() => {
				setLoading(false);
				toast({
					title: "Update Completed",
				});
			});
	};

	useEffect(() => {
		TopicService.get(accountId, editCourseId).then((response) => {
			const { data } = response;
			console.log(data);
			setCreateRequest(
				transformTopicPopulateTopicCollectionPopulateCollectionAndTopicGroupPermissionPopulateGroupModel2CreateCourseRequest(
					data
				)
			);
		});
	}, [editCourseId]);

	return (
		<NavbarSidebarLayout>
			{createRequest && (
				<CreateCourseForm
					onCourseSave={({
						createRequest,

						setLoading,
					}) =>
						handleSave({
							createRequest,

							setLoading,
						})
					}
					createRequestInitialValue={
						createRequest as CreateCourseRequestForm
					}
				/>
			)}
		</NavbarSidebarLayout>
	);
};

export default EditCourse;
