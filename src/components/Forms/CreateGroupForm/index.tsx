import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreateGroupRequestForm } from "@/types/forms/CreateGroupRequestForm";
import { Tabs, TabsList, TabsTrigger } from "../../shadcn/Tabs";
// import GeneralDetail from "./GeneralDetail";
// import ManageCollections from "./ManageCollections";
import FormSaveButton from "../FormSaveButton";
import GeneralDetail from "./GeneralDetail";
import ManageMembers from "./ManageMembers";
import ManagePermissions from "./ManagePermissions";

const TabList = [
	{
		value: "general",
		label: "General Detail",
	},
	{
		value: "members",
		label: "Manage Members",
	},
	{
		value: "permissions",
		label: "Permissions",
	},
];

export type OnGroupSavedCallback = {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	// groupId: string;
	// setGroupId: React.Dispatch<React.SetStateAction<string>>;
	createRequest: CreateGroupRequestForm;
}

const CreateGroupForm = ({
	createRequestInitialValue,
	onCourseSave,
}: // onCollectionSave,
{
	createRequestInitialValue: CreateGroupRequestForm;
	onCourseSave: (callback: OnGroupSavedCallback) => void;
	// onCollectionSave: (callback: OnCollectionSavedCallback) => void;
}) => {
	const navigate = useNavigate();
	const [currentForm, setCurrentForm] = useSearchParams();
	const [loading, setLoading] = useState(false);


	const [createRequest, setCreateRequest] = useState<CreateGroupRequestForm>(
		createRequestInitialValue
	);

	const handleSave = () => {
		console.log(createRequest)
		onCourseSave({
			setLoading,
			createRequest,
			// groupId,
			// setGroupId,
		});
	};

	return (
		<div className="w-[96%] mx-auto mt-10">
			<div className="flex justify-between">
				<h1 className="text-3xl font-bold tracking-tight flex">
					<ArrowLeft
						size={40}
						className="text-gray-400 transition-all pr-0 hover:pr-1 cursor-pointer mr-2"
						onClick={() => navigate(-1)}
					/>
					{createRequest.name === ""
						? "Create Group"
						: createRequest.name}
				</h1>
				<div>
					<div className="flex">
						<Tabs value={currentForm.get("section") || "general"}>
							<TabsList>
								{TabList.map((tab, index) => (
									<TabsTrigger
										key={index}
										value={tab.value}
										onClick={() =>
											setCurrentForm({section: tab.value})
										}
									>
										{tab.label}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
						<FormSaveButton
							disabled={loading}
							onClick={handleSave}
						/>
					</div>
				</div>
			</div>

			<div className="mt-3">
				{(!currentForm.get("section") || currentForm.get("section") === "general") && (
					<GeneralDetail
						createRequest={createRequest}
						setCreateRequest={setCreateRequest}
					/>
				)}
				{currentForm.get("section") === "members" && (
					<ManageMembers
						createRequest={createRequest}
						setCreateRequest={setCreateRequest}
					/>
				)}
				{currentForm.get("section") === "permissions" && (
					<ManagePermissions
						createRequest={createRequest}
						setCreateRequest={setCreateRequest}
					/>
				)}


			</div>
		</div>
	);
};

export default CreateGroupForm;
