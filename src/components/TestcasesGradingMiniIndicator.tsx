import { TestcaseStatusIndicatorColor } from '../constants/TestcaseStatusIndicatorColor';
import { SubmissionTestcaseSecureModel } from '@/types/models/Submission.model';

const TestcaseGradingMiniResult = ({
	status,
}: {
	status: TestcaseGradingResultStatus;
}) => {
	return (
		<div
			className={
				"px-1 py-2 cursor-pointer " +
				"bg-" +
				TestcaseStatusIndicatorColor[status]
			}
		></div>
	);
};

const TestcasesGradingMiniIndicator = ({
	submissionTestcases,
}: {
	submissionTestcases?: SubmissionTestcaseSecureModel[];
}) => {
	return (
		<div className="flex gap-0.5 items-center">
			{submissionTestcases?.map((testcase, index) => (
				<TestcaseGradingMiniResult
					key={index}
					status={
						testcase.runtime_status as TestcaseGradingResultStatus
					}
				/>
			))}
		</div>
	);
};


export default TestcasesGradingMiniIndicator