import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { useNavigate } from "react-router-dom";
import CreateCollectionForm, {
	OnCollectionSavedCallback,
} from "../../../components/Forms/CreateCollectionForm";
import { toast } from "../../../components/shadcn/UseToast";
import NavbarSidebarLayout from "../../../layout/NavbarSidebarLayout";
import { CollectionService } from "@/services/Collection.service";
import { ProblemService } from "@/services/Problem.service";
import { transformCreateCollectionRequestForm2CreateCollectionRequestForm } from "@/types/adapters/CreateCollectionRequestForm.adapter";
import { CreateCollectionRequestForm } from "@/types/forms/CreateCollectionRequestForm";

const formInitialValue: CreateCollectionRequestForm = {
	title: "",
	description: [
		{
			id: "1",
			type: ELEMENT_PARAGRAPH,
			children: [{ text: "" }],
		},
	],
	problemsInterface: [],
	groupPermissions: [],
	collection: null,
};

const CreateCollection = () => {
	const accountId = String(localStorage.getItem("account_id"));
	const navigate = useNavigate();

	const handleSave = ({
		createRequest,
		setLoading,
	}: OnCollectionSavedCallback) => {
		if (!setLoading || !createRequest) {
			return;
		}

		const { request, problemIds, problemGroupPermissions,groups } =
			transformCreateCollectionRequestForm2CreateCollectionRequestForm(
				createRequest as CreateCollectionRequestForm
			);

		setLoading(true);

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
				navigate(`/my/collections/${response.collection_id}/edit`);
				setLoading(false);
			});
	};

	return (
		<NavbarSidebarLayout>
			<CreateCollectionForm
				onCollectionSave={({ createRequest, setLoading }) =>
					handleSave({ createRequest, setLoading })
				}
				createRequestInitialValue={formInitialValue}
			/>
		</NavbarSidebarLayout>
	);
};

export default CreateCollection;
