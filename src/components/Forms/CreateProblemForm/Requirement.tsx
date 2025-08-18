import React, { ReactNode, useEffect } from "react";
import { ProgrammingLanguageOptions } from "../../../constants/ProgrammingLanguage";
import { CreateProblemRequestForm } from "@/types/forms/CreateProblemRequestForm";
import { Checkbox } from "../../shadcn/Checkbox";
import { Input } from "../../shadcn/Input";
import { Label } from "../../shadcn/Label";

const AllowedLanguageCheckbox = ({
	children,
	checked = false,
	onClick = () => {},
}: {
	children: ReactNode;
	checked?: boolean;
	onClick?: () => void;
}) => {
	return (
		<div className="flex items-center">
			<Checkbox checked={checked} onClick={() => onClick()} />
			<div className="ml-2 text-base">{children}</div>
		</div>
	);
};

const Requirement = ({
	createRequest,
	setCreateRequest,
}: {
	createRequest: CreateProblemRequestForm;
	setCreateRequest: React.Dispatch<
		React.SetStateAction<CreateProblemRequestForm>
	>;
}) => {
	const hasSelectedAllLanguage = () => {
		return (
			createRequest.allowedLanguage.filter((lang) => lang !== "")
				.length === ProgrammingLanguageOptions.length
		);
	};

	const handleAllOption = () => {
		if (hasSelectedAllLanguage()) {
			setCreateRequest({
				...createRequest,
				allowedLanguage: [],
			});
		} else {
			setCreateRequest({
				...createRequest,
				allowedLanguage: ProgrammingLanguageOptions.map(
					(proLang) => proLang.value
				),
			});
		}
	};

	const handleOnClick = (language: string) => {
		if (createRequest.allowedLanguage.includes(language)) {
			setCreateRequest({
				...createRequest,
				allowedLanguage: createRequest.allowedLanguage.filter(
					(lang) => lang !== language
				),
			});
		} else {
			setCreateRequest({
				...createRequest,
				allowedLanguage: [...createRequest.allowedLanguage, language],
			});
		}
	};

	useEffect(() => {
		console.log(createRequest);
	}, [createRequest]);

	return (
		<div>
			<Label>Time Limit Exceeded (seconds)</Label>
			<Input
				type="number"
				value={createRequest.time_limit}
				onChange={(e) =>
					setCreateRequest({
						...createRequest,
						time_limit: Number(e.target.value),
					})
				}
			/>

			<Label>Allowed Languages</Label>
			<div className="mb-1">
				<AllowedLanguageCheckbox
					checked={hasSelectedAllLanguage()}
					onClick={handleAllOption}
				>
					All
				</AllowedLanguageCheckbox>
			</div>

			<div className="grid grid-cols-2 w-1/3 gap-y-1">
				{ProgrammingLanguageOptions.map((proLang) => (
					<AllowedLanguageCheckbox
						checked={createRequest.allowedLanguage.includes(
							proLang.value
						)}
						onClick={() => handleOnClick(proLang.value)}
					>
						{proLang.label}
					</AllowedLanguageCheckbox>
				))}
			</div>
		</div>
	);
};

export default Requirement;
