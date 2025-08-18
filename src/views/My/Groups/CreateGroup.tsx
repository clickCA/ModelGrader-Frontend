import { useNavigate } from "react-router-dom";
import CreateGroupForm, {
	OnGroupSavedCallback,
} from "../../../components/Forms/CreateGroupForm";
import NavbarSidebarLayout from "../../../layout/NavbarSidebarLayout";
import { GroupService } from "@/services/Group.service";
import { transformCreateGroupRequestForm2CreateGroupRequest } from "@/types/adapters/CreateGroupRequestForm.adapter";
import { CreateGroupRequestForm } from "@/types/forms/CreateGroupRequestForm";

const formInitialValue: CreateGroupRequestForm = {
	name: "",
	description: "",
	color: "#f87171",
	membersInterface: [],
	manageCourses: false,
	viewCourseLogs: false,
	viewCourses: false,
	manageCollections: false,
	viewCollections: false,
	manageProblems: false,
	viewProblems: false
};

const CreateGroup = () => {
	const navigate = useNavigate();
	const accountId = String(localStorage.getItem("account_id"));

	const handleSave = ({
		createRequest,
		setLoading,
	}: OnGroupSavedCallback) => {
		const request =
			transformCreateGroupRequestForm2CreateGroupRequest(createRequest);
		const memberIds = createRequest.membersInterface.map(
			(item) => item.id as string
		);

		setLoading(true);
		console.log(createRequest,request)
		GroupService.create(accountId, request)
			.then((response) => {
				return GroupService.updateMembers(
					response.data.group_id,
					memberIds
				);
			})
			.then((response) => {
				setLoading(false);
				navigate(`/my/groups/${response.data.group_id}/edit`);
			});
	};

	return (
		<NavbarSidebarLayout>
			<CreateGroupForm
				onCourseSave={(e) => handleSave(e)}
				createRequestInitialValue={formInitialValue}
			/>
		</NavbarSidebarLayout>
	);
};

export default CreateGroup;
