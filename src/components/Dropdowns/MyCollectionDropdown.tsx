import { CopyPlus, PencilIcon, Trash } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CollectionService } from "@/services/Collection.service";
import { ProblemService } from "@/services/Problem.service";
import { transformCollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupModel2CreateCollectionRequest } from "@/types/adapters/Collection.adapter";
import { transformCreateCollectionRequestForm2CreateCollectionRequestForm } from "@/types/adapters/CreateCollectionRequestForm.adapter";
import { CollectionModel } from "@/types/models/Collection.model";
import DeleteCollectionConfirmationDialog from "../Dialogs/DeleteCollectionConfirmationDialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../shadcn/DropdownMenu";
import { toast } from "../shadcn/UseToast";

const MyCollectionDropdown = ({
	children,
	collection,
}: {
	children: React.ReactNode;
	collection: CollectionModel;
}) => {
	const accountId = String(localStorage.getItem("account_id"));
	const navigate = useNavigate();
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const handleCloneCollection = async () => {
		const response = await CollectionService.get(
			collection.collection_id,
			accountId
		);

		let createRequest =
			transformCollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupModel2CreateCollectionRequest(
				response.data
			);

		createRequest.title += " (Copy)";

		const { request, groups, problemIds, problemGroupPermissions } =
			transformCreateCollectionRequestForm2CreateCollectionRequestForm(
				createRequest
			);

		CollectionService.create(accountId, request)
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
			.then((response) => {
				let promise = [];
				for (const problem of problemGroupPermissions) {
					promise.push(
						ProblemService.updateGroupPermissions(
							problem.problem_id,
							accountId,
							problem.groupPermissions
						)
					);
				}

				return {
					promise: Promise.all(promise),
					collection_id: response.data.collection_id,
				};
			})
			.then((response) => {
				toast({
					title: "Create Completed",
				});
				window.open(`/my/collections/${response.collection_id}`,'_blank');
			});
	};

	return (
		<DropdownMenu>
			<DeleteCollectionConfirmationDialog
				collection={collection}
				open={openDeleteDialog}
				setOpen={setOpenDeleteDialog}
				afterDelete={() => window.location.reload()}
			/>
			<DropdownMenuTrigger>{children}</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem disabled>
					<div className="font-medium">{collection.name}</div>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() =>
						navigate(`/my/collections/${collection.collection_id}/edit`)
					}
				>
					<PencilIcon className="mr-2" size={16} />
					Edit Collection
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleCloneCollection}>
					<CopyPlus className="mr-2" size={16} />
					Clone Collection
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setOpenDeleteDialog(true)}
					className="text-red-400"
				>
					<Trash className="mr-2" size={16} />
					Delete Collection
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default MyCollectionDropdown;
