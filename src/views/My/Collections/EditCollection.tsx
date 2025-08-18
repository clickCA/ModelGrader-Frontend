import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateCollectionForm, {
	OnCollectionSavedCallback,
} from "../../../components/Forms/CreateCollectionForm";
import { toast } from "../../../components/shadcn/UseToast";
import NavbarSidebarLayout from "../../../layout/NavbarSidebarLayout";
import { CollectionService } from "../../../services/Collection.service";
import { transformCollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupModel2CreateCollectionRequest } from "@/types/adapters/Collection.adapter";
import { transformCreateCollectionRequestForm2CreateCollectionRequestForm } from "@/types/adapters/CreateCollectionRequestForm.adapter";
import { CreateCollectionRequestForm } from "@/types/forms/CreateCollectionRequestForm";
import { ProblemService } from "../../../services/Problem.service";

const EditCollection = () => {
	const accountId = String(localStorage.getItem("account_id"));

	const { collectionId } = useParams();
	const editCollectionId = String(collectionId);

	const [createRequest, setCreateRequest] =
		React.useState<CreateCollectionRequestForm>();

	const handleSave = ({
		setLoading,
		createRequest,
	}: OnCollectionSavedCallback) => {
		if (!setLoading || !createRequest) {
			return;
		}

		const { request, problemIds, groups, problemGroupPermissions } =
			transformCreateCollectionRequestForm2CreateCollectionRequestForm(
				createRequest as CreateCollectionRequestForm
			);

		setLoading(true);

		CollectionService.update(editCollectionId,accountId, request)
			.then((response) => {
				return CollectionService.updateProblem(
					response.data.collection_id,
					problemIds
				);
			})
			.then((response) => {
				return CollectionService.updateGroupPermissions(
					response.data.collection_id,
					accountId,
					groups
				);
			})
            .then(() => {
				const promise = [];
				for (const problem of problemGroupPermissions) {
					promise.push(
						ProblemService.updateGroupPermissions(
							problem.problem_id,
							accountId,
							problem.groupPermissions
						)
					);
				}

				return Promise.all(promise);
			})
			.then(() => {
				setLoading(false);
				console.log("Save");
				toast({
					title: "Update Completed",
				});
			});
	};

	useEffect(() => {
		CollectionService.get(editCollectionId, accountId).then((response) => {
			setCreateRequest(
				transformCollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupModel2CreateCollectionRequest(
					response.data
				)
			);
		});
	}, [editCollectionId]);

	return (
		<NavbarSidebarLayout>
			{createRequest && (
				<CreateCollectionForm
					onCollectionSave={({ setLoading, createRequest }) =>
						handleSave({ setLoading, createRequest })
					}
					createRequestInitialValue={createRequest}
				/>
			)}
		</NavbarSidebarLayout>
	);
};

export default EditCollection;
