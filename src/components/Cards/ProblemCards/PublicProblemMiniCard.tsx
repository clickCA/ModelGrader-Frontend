import { FileSpreadsheet, Puzzle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel } from "@/types/models/Problem.model";
import { onMiddleClickOpenInNewTab } from "@/utilities/OnMiddleClickOpenInNewTab";
import TestcasesGradingIndicator from "../../TestcasesGradingIndicator";
import { Button } from "../../shadcn/Button";
import { Card } from "../../shadcn/Card";

const PublicProblemMiniCard = ({
	problem,
}: {
	problem: ProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel;
}) => {

	const navigate = useNavigate();

	return (
		<Card className="px-5 cursor-pointer py-2">
			<div className="flex items-center">
				<h1 className="font-bold flex items-center w-3/12 font-mono text-base">
					<FileSpreadsheet size={18} className="text-blue-400 mr-2" />
					{problem?.title}
				</h1>

				{/* <div className="flex w-2/12">
					<p className="font-medium mr-2">Created by</p>
					<p className="font-medium text-gray-400">
						{problem.creator.username}
					</p>
				</div> */}

				<div className="flex w-5/12 items-center">
					{/* <p className="font-medium mr-2">Best Submission</p> */}
					{problem.best_submission ? (
						<TestcasesGradingIndicator
							sizeX={1}
							sizeY={3}
							submissionTestcases={
								problem.best_submission.runtime_output
							}
						/>
					) : (
						"-"
					)}
				</div>

				<div>
					<Button
						onMouseDown={(e) => onMiddleClickOpenInNewTab(e,`/problems/${problem.problem_id}`)}
						onClick={() =>
							navigate(`./problems/${problem.problem_id}`)
						}
						// className="bg-white border-green-500 border-2 text-green-500 hover:bg-green-500 hover:text-white"
					>
						<Puzzle className="mr-2" />
						Solve This Problem
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default PublicProblemMiniCard;
