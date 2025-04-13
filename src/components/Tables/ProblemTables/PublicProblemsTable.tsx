import { ColumnDef } from "@tanstack/react-table";
import { FileSpreadsheet, Puzzle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ProgrammingLanguageOptions } from "../../../constants/ProgrammingLanguage";
import { ProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel } from "../../../types/models/Problem.model";
import TestcasesGradingIndicator from "../../TestcasesGradingIndicator";
import { Badge } from "../../shadcn/Badge";
import { Button } from "../../shadcn/Button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../../shadcn/HoverCard";
import { DataTable } from "../Prototype/DataTable";

const PublicProblemsTable = ({
	problems,
}: {
	problems: ProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel[];
}) => {
	const { courseId } = useParams();

	const columns: ColumnDef<ProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel>[] =
		[
			{
				accessorKey: "title",
				header: "Title",
				cell: ({ row }) => {
					console.log(row.original.allowed_languages);

					return (
						<div className="font-mono flex items-center">
							<FileSpreadsheet
								className="mr-2 text-blue-400"
								size={20}
							/>
							<Link
								to={`/problems/${row.original.problem_id}`}
								target="_blank"
							>
								{row.original.title}
							</Link>
						</div>
					);
				},
			},

			{
				accessorKey: "allowed_languages",
				header: () => (
					<div className="text-center">Allowed Languages</div>
				),
				cell: ({ row }) => (
					<div className="font-medium flex justify-center">
						<div className="font-medium">
							{row.original.allowed_languages
								.split(",")
								.slice(0, 2)
								.map((lang) => (
									<span className="mx-0.5">
										{
											ProgrammingLanguageOptions.find(
												(option) =>
													option.value === lang
											)?.badge
										}
									</span>
								))}

							{row.original.allowed_languages.split(",")
								.length === 3 && (
								<span className="mx-0.5">
									{
										ProgrammingLanguageOptions.find(
											(option) =>
												option.value ===
												row.original.allowed_languages.split(
													","
												)[2]
										)?.badge
									}
								</span>
							)}

							{row.original.allowed_languages.split(",").length >
								3 && (
								<span className="mx-0.5">
									<HoverCard>
										<HoverCardTrigger>
											<Badge className="bg-neutral-200 text-black cursor-pointer">
												...{" "}
												{row.original.allowed_languages.split(
													","
												).length - 2}{" "}
												more
											</Badge>
										</HoverCardTrigger>
										<HoverCardContent>
											<div className="flex gap-0.5">
												{row.original.allowed_languages
													.split(",")
													.map((lang) => (
														<div>
															{
																ProgrammingLanguageOptions.find(
																	(option) =>
																		option.value ===
																		lang
																)?.badge
															}
														</div>
													))}
											</div>
										</HoverCardContent>
									</HoverCard>
								</span>
							)}
						</div>
					</div>
				),
			},
			{
				accessorKey: "best_submissions",
				header: "Best Submissions",
				cell: ({ row }) => (
					<div className="">
						<TestcasesGradingIndicator
							submissionTestcases={
								row.original.best_submission?.runtime_output
							}
							sizeX={1.5}
							sizeY={3}
						/>
					</div>
				),
			},

			{
				accessorKey: "author",
				header: "Author",
				cell: ({ row }) => (
					<div className="font-medium">
						{row.original.creator.username}
					</div>
				),
			},

			// {
			// 	accessorKey: "difficulty",
			// 	header: "Difficulty",
			// 	cell: ({ row }) => (
			// 		<DifficultyBadge level={row.original.difficulty}/>
			// 	),
			// },

			// {
			// 	accessorKey: "updated_date",
			// 	header: "Updated Date",
			// 	cell: ({ row }) => (
			// 		<div className="font-mono">
			// 			{readableDateFormat(row.original.updated_date)}
			// 		</div>
			// 	),
			// },

			{
				accessorKey: "action",
				header: "",
				cell: ({ row }) => (
					<div className="flex items-center">
						<Link
							target="_blank"
							to={
								courseId
									? `/courses/${courseId}/problems/${row.original.problem_id}`
									: `/problems/${row.original.problem_id}`
							}
						>
							<Button

							// onClick={() =>
							// 	navigate(`/problems/${problem.problem_id}`)
							// }
							// className="bg-white border-green-500 border-2 text-green-500 hover:bg-green-500 hover:text-white"
							>
								<Puzzle className="mr-2" />
								Solve This Problem
							</Button>
						</Link>
					</div>
				),
			},
		];

	return (
		<div>
			<DataTable columns={columns} data={problems} />
		</div>
	);
};

export default PublicProblemsTable;
