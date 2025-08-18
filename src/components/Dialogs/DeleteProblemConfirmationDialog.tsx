import React from "react";
import { ProblemService } from "@/services/Problem.service";
import { ProblemModel, ProblemPopulateTestcases, ProblemSecureModel } from "@/types/models/Problem.model";
import { Button } from "@/components/shadcn/Button";
import { Dialog, DialogContent } from "@/components/shadcn/Dialog";

const DeleteProblemConfirmationDialog = ({
  open,
  setOpen,
  problem,
  afterDelete=()=>{}
}:{
  problem: ProblemPopulateTestcases | ProblemSecureModel | ProblemModel,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  afterDelete?: () => void
}) => {

	const accountId = String(localStorage.getItem("account_id"));
  const handleDelete = () => {
    setOpen(false)
    ProblemService.delete(problem.problem_id,accountId).then(() => afterDelete())
    
  }

	return (
		<Dialog open={open} onOpenChange={() => setOpen(false)}>
			<DialogContent>
				<div>
					<div>Are you sure you want to delete this problem?</div>
					<div className="font-bold">{problem.title}</div>
				</div>
				<div className="flex justify-end gap-2">
					<Button onClick={handleDelete} className="bg-red-500 hover:bg-red-400">
						Delete
					</Button>
					<Button onClick={() => setOpen(false)} className="bg-gray-500 hover:bg-gray-400">
						Cancel
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteProblemConfirmationDialog;
