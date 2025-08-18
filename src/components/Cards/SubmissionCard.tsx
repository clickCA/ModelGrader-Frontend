import { FileSpreadsheet, LibraryBig, StepForward } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SubmissionPopulateSubmissionTestcaseAndProblemSecureModel } from "@/types/models/Submission.model";
import { readableDateFormat } from "@/utilities/ReadableDateFormat";
import TestcasesGradingIndicator from "../TestcasesGradingIndicator";
import { Button } from "../shadcn/Button";
import { Card } from "../shadcn/Card";

const SubmissionCard = ({
	submission,
}: {
	submission: SubmissionPopulateSubmissionTestcaseAndProblemSecureModel;
}) => {

    const navigate = useNavigate()

    const handleNavigateProblem = () => {
        if (submission.topic) {
            navigate(`/courses/${submission.topic.topic_id}/problems/${submission.problem.problem_id}`)
        }
        else {
            navigate(`/problems/${submission.problem.problem_id}`)
        }
    }

	return (
		<Card className="p-5">
			<p className="text-2xl font-bold flex">
				<FileSpreadsheet size={30} className="text-blue-400 mr-2" />
				{submission.problem.title}
			</p>

			{
				submission.topic ? (
					<div className="flex items-center text-sm font-medium my-2">
						<LibraryBig size={20} className="mr-1 text-purple-400"/>
						{submission.topic.name}
					</div>
				) : (
					<div className="flex items-center text-sm font-medium my-2 invisible">
						<LibraryBig size={20} className="mr-1 text-purple-400"/>
						
					</div>
				)
			}	

			<div className="text-sm font-medium my-3">
				<p>Submitted Date</p>
                <p className="text-gray-400">{readableDateFormat(submission.date)}</p>
			</div>

			<div className="flex justify-between">
				<TestcasesGradingIndicator
                    sizeX={1.5}
                    sizeY={2}
					submissionTestcases={submission.runtime_output}
					testcaseGradingResultClassName="rounded-[15%]"
				/>

				<Button
                    onClick={handleNavigateProblem}
                >
					<StepForward className="mr-2" />
					Continue
				</Button>
			</div>
		</Card>
	);
};

export default SubmissionCard;
