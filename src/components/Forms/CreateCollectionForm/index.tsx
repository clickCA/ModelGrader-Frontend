import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useBeforeUnload, useNavigate, useSearchParams } from "react-router-dom";
import { CreateCollectionRequestForm } from "@/types/forms/CreateCollectionRequestForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/Tabs";
import FormSaveButton from "../FormSaveButton";
import GeneralDetail from "./GeneralDetail";
import ManageGroups from "./ManageGroups";
import ManageProblems from "./ManageProblems";

const TabList = [
	{
		value: "general",
		label: "General Detail",
	},
	{
		value: "problems",
		label: "Manage Problems",
	},
	{
		value: "groups",
		label: "Manage Groups & Permissions",
	},
];

export type OnCollectionSavedCallback = {
	setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
	createRequest?: CreateCollectionRequestForm;
};

const CreateCollectionForm = ({
	createRequestInitialValue,
	onCollectionSave,
}: {
	createRequestInitialValue: CreateCollectionRequestForm;
	onCollectionSave: (callback: OnCollectionSavedCallback) => void;
}) => {
	const navigate = useNavigate();
	const [currentForm, setCurrentForm] = useSearchParams();

	const [loading, setLoading] = useState(false);
	const [createRequest, setCreateRequest] =
		useState<CreateCollectionRequestForm>(createRequestInitialValue);

	const handleSave = () => {
		onCollectionSave({
			setLoading,
			createRequest,
		});
	};

	useBeforeUnload(() => "Some change has not been saved yet. Are you sure to close this tab?")

	return (
		<div className="w-[96%] mx-auto mt-10">
			<div className="flex justify-between">
				<h1 className="text-3xl font-bold tracking-tight flex">
					<ArrowLeft
						size={40}
						className="text-gray-400 transition-all pr-0 hover:pr-1 cursor-pointer mr-2"
						onClick={() => navigate(-1)}
					/>
					{createRequest.title === ""
						? "Create Collection"
						: createRequest.title}
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
				{currentForm.get("section") === "problems" && (
					<ManageProblems
						createRequest={createRequest}
						setCreateRequest={setCreateRequest}
					/>
				)}

				{currentForm.get("section") === "groups" && (
					<ManageGroups
						createRequest={createRequest}
						setCreateRequest={setCreateRequest}
					/>
				)}
			</div>
		</div>
	);
};

export default CreateCollectionForm;
