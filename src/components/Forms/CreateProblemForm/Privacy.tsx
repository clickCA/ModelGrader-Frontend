import React from 'react';
import { CreateProblemRequestForm } from '@/types/forms/CreateProblemRequestForm';
import { Label } from '@/components/shadcn/Label';
import { Switch } from '@/components/shadcn/Switch';

const Privacy = ({
	createRequest,
	setCreateRequest,
}: {
	createRequest: CreateProblemRequestForm;
	setCreateRequest: React.Dispatch<React.SetStateAction<CreateProblemRequestForm>>;
}) => {
	createRequest;
	setCreateRequest;

	return (
		<div>
			<div className="flex items-center space-x-2">
				<Label htmlFor="airplane-mode">Visibility</Label>
				<Switch id="airplane-mode" />
			</div>

			<div className="flex items-center space-x-2">
				<Label htmlFor="airplane-mode">Allow Reference</Label>
				<Switch id="airplane-mode" />
			</div>
		</div>
	);
};

export default Privacy