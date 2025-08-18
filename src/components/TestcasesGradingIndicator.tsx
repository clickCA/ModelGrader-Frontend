import { SubmissionTestcaseSecureModel } from "@/types/models/Submission.model";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "./shadcn/HoverCard";

type TestcaseGradingResultStatus = "OK" | "TIMEOUT" | "ERROR" | "FAILED";

const TestcaseGradingResult = ({
	no,
	status,
	disableHover = false,
	sizeX = 2,
	sizeY = 4,
	className = "",
}: {
	no: number | string;
	status: "OK" | "TIMEOUT" | "ERROR" | "FAILED";
	disableHover?: boolean;
	sizeX?: number;
	sizeY?: number;
	className?: string;
}) => {
	const chartStyledFunction = () => {
		let result = `px-${sizeX} py-${sizeY} cursor-pointer ${className} `;
		if (status === "OK") {
			result += `bg-green-400 `;
		} else if (status === "TIMEOUT") {
			result += `bg-yellow-400 `;
		} else if (status === "FAILED") {
			result += `bg-red-400 `;
		} else if (status === "ERROR") {
			result += `bg-zinc-300 `;
		}

		return result;
	};

	const textStyledFunction = () => {
		let result = `font-bold `;
		if (status === "OK") {
			result += `text-green-400`;
		} else if (status === "TIMEOUT") {
			result += `text-yellow-400`;
		} else if (status === "FAILED") {
			result += `text-red-400`;
		} else if (status === "ERROR") {
			result += `text-zinc-500`;
		}

		return result;
	};

	return (
		<HoverCard>
			<HoverCardTrigger>
				<div className={chartStyledFunction()}></div>
				{/* {status === "OK" && <div className={"px-2 py-4 cursor-pointer " + 'bg-green-400'}></div>}
				{status === "TIMEOUT" && <div className={"px-2 py-4 cursor-pointer " + 'bg-yellow-400'}></div>}
				{status === "ERROR" && <div className={"px-2 py-4 cursor-pointer " + 'bg-red-400'}></div>}
				{status === "FAILED" && <div className={"px-2 py-4 cursor-pointer " + 'bg-zinc-300'}></div>} */}
			</HoverCardTrigger>
			{!disableHover && (
				<HoverCardContent>
					<p className="font-bold">Testcase #{no}</p>
					<p className="font-bold">
						Status:{" "}
						<span className={textStyledFunction()}>{status}</span>
					</p>
					<p className="font-bold text-sm">
						Time Used:{" "}
						<span className="font-normal">-.--- seconds</span>
					</p>
				</HoverCardContent>
			)}
		</HoverCard>
	);
};

const TestcasesGradingIndicator = ({
	submissionTestcases,
	disableHover = false,
	className = "",
	sizeX = 2,
	sizeY = 4,
	testcaseGradingResultClassName = "",
}: {
	submissionTestcases?: SubmissionTestcaseSecureModel[];
	disableHover?: boolean;
	className?: string;
	sizeX?: number;
	sizeY?: number;
	testcaseGradingResultClassName?: string;
}) => {
	// useEffect(()=>{
	// 	console.log(submissionTestcases)
	// },[submissionTestcases])
	return (
		<div className={"flex gap-0.5 items-center" + className}>
			{submissionTestcases?.map((testcase, index) => (
				<TestcaseGradingResult
					className={testcaseGradingResultClassName}
					sizeX={sizeX}
					sizeY={sizeY}
					disableHover={disableHover}
					key={index}
					no={index + 1}
					status={
						testcase.runtime_status as TestcaseGradingResultStatus
					}
				/>
			))}
		</div>
	);
};

export default TestcasesGradingIndicator;
