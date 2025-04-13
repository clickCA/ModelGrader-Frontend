import { BarChart3, CopyPlus, PencilIcon, Trash } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProblemService } from "../../services/Problem.service";
import { transformCreateProblemRequestForm2CreateProblemRequest } from "../../types/adapters/CreateProblemRequestForm.adapter";
import { transformProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel2CreateProblemRequestForm } from "../../types/adapters/Problem.adapter";
import {
    ProblemModel,
    ProblemPopulateTestcases,
    ProblemSecureModel,
} from "../../types/models/Problem.model";
import DeleteProblemConfirmationDialog from "../Dialogs/DeleteProblemConfirmationDialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../shadcn/DropdownMenu";
import { toast } from "../shadcn/UseToast";

const MyProblemDropdown = ({
	children,
	problem,
}: {
	children: React.ReactNode;
	problem: ProblemModel | ProblemPopulateTestcases | ProblemSecureModel;
}) => {
	const accountId = String(localStorage.getItem("account_id"));
	const navigate = useNavigate();
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	const handleCloneProblem = async () => {
		const response = await ProblemService.get(
			accountId,
			problem.problem_id
		);

		const createRequest =
			transformProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel2CreateProblemRequestForm(
				response.data
			);

		createRequest.title += " (Copy)";

		const { request, groups } =
			transformCreateProblemRequestForm2CreateProblemRequest(
				createRequest
			);

		ProblemService.create(accountId, request)
			.then((response) => {
				return ProblemService.updateGroupPermissions(
					response.data.problem_id,
					accountId,
					groups
				);
			})
			.then((response) => {
				// setLoading(false);
				toast({
					title: `Cloned ${response.data.title}`,
				});
				window.open(
					`/my/problems/${response.data.problem_id}`,
					"_blank"
				);
			});
	};

	return (
		<DropdownMenu>
			<DeleteProblemConfirmationDialog
				problem={problem}
				open={openDeleteDialog}
				setOpen={setOpenDeleteDialog}
				afterDelete={() => window.location.reload()}
			/>
			<DropdownMenuTrigger>{children}</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem disabled>
					<div className="font-medium">{problem.title}</div>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() =>
						navigate(`/my/problems/${problem.problem_id}`)
					}
				>
					<BarChart3 className="mr-2" size={16} />
					View Statistic
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() =>
						window.open(
							`/my/problems/${problem.problem_id}/edit`,
							"_blank"
						)
					}
				>
					<PencilIcon className="mr-2" size={16} />
					Edit Problem
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleCloneProblem}>
					<CopyPlus className="mr-2" size={16} />
					Clone Problem
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setOpenDeleteDialog(true)}
					className="text-red-400"
				>
					<Trash className="mr-2" size={16} />
					Delete Problem
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default MyProblemDropdown;
