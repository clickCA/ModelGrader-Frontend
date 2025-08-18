import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreateProblemRequestForm } from "@/types/forms/CreateProblemRequestForm";
import { TestcaseModel } from "@/types/models/Problem.model";
import { Tabs, TabsList, TabsTrigger } from "../../shadcn/Tabs";
import FormSaveButton from "../FormSaveButton";
import GeneralDetail from "./GeneralDetail";
import ManageGroups from "./ManageGroups";
import Privacy from "./Privacy";
import Requirement from "./Requirement";
import Scoring from "./Scoring";

const TabList = [
	{
		value: "general",
		label: "General Detail",
	},
	{
		value: "scoring",
		label: "Scoring",
	},
	{
		value: "requirement",
		label: "Requirement",
	},
	// {
	// 	value: "privacy",
	// 	label: "Privacy",
	// },
	{
		value: "groups",
		label: "Manage Groups & Permissions",
	},
];

export type OnProblemSaveCallback = (
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	// problemid: string,
	// setProblemId: React.Dispatch<React.SetStateAction<number>>,
	createRequest: CreateProblemRequestForm
) => void;

const CreateProblemForm = ({
	createRequestInitialValue,
	onProblemSave,
	validatedTestcases = [],
}: {
	createRequestInitialValue: CreateProblemRequestForm;
	onProblemSave: OnProblemSaveCallback;
	validatedTestcases?: TestcaseModel[];
}) => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const [currentForm, setCurrentForm] = useSearchParams();
	const [createRequest, setCreateRequest] =
		useState<CreateProblemRequestForm>(createRequestInitialValue);


	const handleSave = () => {
		onProblemSave(setLoading, createRequest);
	};


	useEffect(() => {
		if (validatedTestcases.length !== 0) {
			setCreateRequest({
				...createRequest,
				validated_testcases: validatedTestcases,
			});
		}
	}, [validatedTestcases]);

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
						? "Create Problem"
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
				{(!currentForm.get("section") || currentForm.get("section") === "general")  && (
					<GeneralDetail
						createRequest={createRequest}
						setCreateRequest={setCreateRequest}
					/>
				)}
				{currentForm.get("section") === "scoring" && (
					<Scoring
						createRequest={createRequest}
						setCreateRequest={setCreateRequest}
					/>
				)}
				{currentForm.get("section") === "requirement" && (
					<Requirement
						createRequest={createRequest}
						setCreateRequest={setCreateRequest}
					/>
				)}
				{currentForm.get("section") === "privacy" && (
					<Privacy
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

export default CreateProblemForm;
