import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreateCourseRequestForm } from "@/types/forms/CreateCourseRequestForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/Tabs";
import FormSaveButton from "../FormSaveButton";
import GeneralDetail from "./GeneralDetail";
import ManageCollections from "./ManageCollections";
import ManageGroups from "./ManageGroups";

const TabList = [
	{
		value: "general",
		label: "General Detail",
	},
	{
		value: "collections",
		label: "Manage Collections",
	},
	{
		value: "groups",
		label: "Manage Groups & Permissions",
	},
];

export type OnCourseSavedCallback = {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	// courseId: string;
	// setCourseId: React.Dispatch<React.SetStateAction<string>>;
	createRequest: CreateCourseRequestForm;
};

const CreateCourseForm = ({
	createRequestInitialValue,
	onCourseSave,
}: // onCollectionSave,
{
	createRequestInitialValue: CreateCourseRequestForm;
	onCourseSave: (callback: OnCourseSavedCallback) => void;
	// onCollectionSave: (callback: OnCollectionSavedCallback) => void;
}) => {
	const accountId = String(localStorage.getItem("account_id"));

	const [currentForm, setCurrentForm] = useSearchParams();

	const navigate = useNavigate();
	// const [currentForm, setCurrentForm] = useState(searchParams.get("section"));
	const [loading, setLoading] = useState(false);


	const [createRequest, setCreateRequest] = useState<CreateCourseRequestForm>(
		createRequestInitialValue
	);

	const handleSave = () => {
		onCourseSave({
			setLoading,
			createRequest,
			// courseId,
			// setCourseId,
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
					{createRequest.title === ""
						? "Create Course"
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
										disabled={
											tab.value === "groups" &&
											createRequest.course?.creator !==
												accountId
										}
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
				{currentForm.get("section") === "collections" && (
					<ManageCollections
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

export default CreateCourseForm;
