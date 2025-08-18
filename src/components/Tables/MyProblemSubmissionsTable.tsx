import { ColumnDef } from "@tanstack/react-table";
import { Check, LibraryBig, Maximize2, X } from "lucide-react";
import { ProgrammingLanguageOptions } from "../../constants/ProgrammingLanguage";
import { ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel } from "@/types/models/Problem.model";
import { SubmissionPopulateSubmissionTestcaseAndAccountModel } from "@/types/models/Submission.model";
import { readableDateFormat } from "../../utilities/ReadableDateFormat";
import { DataTable } from "./Prototype/DataTable";
import ProblemSubmissionSourceCodeAndRuntimeResultDialog from "../Dialogs/ProblemSubmissionSourceCodeAndRuntimeResultDialog";
import TestcasesGradingIndicator from "../TestcasesGradingIndicator";
import { Button } from "../shadcn/Button";
import { Link } from "react-router-dom";

const MyProblemSubmissionsTable = ({
	submissions = [],
	problem,
}: {
	submissions?: SubmissionPopulateSubmissionTestcaseAndAccountModel[];
	problem: ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel;
}) => {
	const columns: ColumnDef<SubmissionPopulateSubmissionTestcaseAndAccountModel>[] =
		[
			{
				accessorKey: "username",
				header: "Username",
				cell: ({ row }) => (
					<div className="font-medium">
						{row.original.account.username}
					</div>
				),
			},
			{
				accessorKey: "course",
				header: "Course",
				cell: ({ row }) => (
					<div className="">
						{row.original.topic ? (
							<div className="font-medium hover:underline hover:text-green-500 flex items-center">
								<LibraryBig
									size={20}
									className="text-purple-400 mr-1"
								/>
								<Link
									target="_blank"
									to={`/courses/${row.original.topic.topic_id}`}
								>
									{row.original.topic.name}
								</Link>
							</div>
						) : (
							<div className="italic text-gray-400">
								Public Submitted
							</div>
						)}
					</div>
				),
			},
			{
				accessorKey: "language",
				header: () => <div className="text-center">Language</div>,
				cell: ({ row }) => (
					<div className="font-medium flex justify-center">
						{
							ProgrammingLanguageOptions.find(
								(language) =>
									language.value === row.original.language
							)?.badge
						}
					</div>
				),
			},
			{
				accessorKey: "is_passed",
				header: () => <div className="text-center">Is Passed</div>,
				cell: ({ row }) => {
					return (
						<div className="flex justify-center">
							{row.original.is_passed ? (
								<Check className="text-green-500" />
							) : (
								<X className="text-red-500" />
							)}
						</div>
					);
				},
			},
			{
				accessorKey: "runtime_result",
				header: "Runtime Result",
				cell: ({ row }) => (
					<div className="font-medium">
						<TestcasesGradingIndicator
							sizeX={1.5}
							sizeY={3}
							submissionTestcases={row.original.runtime_output}
						/>
					</div>
				),
			},
			{
				accessorKey: "date",
				header: "Submitted Date",
				cell: ({ row }) => (
					<div className="font-mono">
						{readableDateFormat(row.original.date)}
					</div>
				),
			},
			{
				accessorKey: "action",
				header: "",
				cell: ({ row }) => (
					<div>
						<ProblemSubmissionSourceCodeAndRuntimeResultDialog
							submission={row.original}
							problem={problem}
						>
							<Button>
								<Maximize2 size={15} className="mr-2" />
								View More
							</Button>
						</ProblemSubmissionSourceCodeAndRuntimeResultDialog>
					</div>
				),
			},
		];

	return (
		<div>
			<DataTable columns={columns} data={submissions} />
		</div>
	);
};

export default MyProblemSubmissionsTable;
