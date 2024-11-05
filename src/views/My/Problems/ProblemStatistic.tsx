import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MyProblemSubmissionsTable from "../../../components/Tables/MyProblemSubmissionsTable";
import { Button } from "../../../components/shadcn/Button";
import NavbarSidebarLayout from "../../../layout/NavbarSidebarLayout";
import { SubmissionService } from "../../../services/Submission.service";
import { ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel } from "../../../types/models/Problem.model";
import { SubmissionPopulateSubmissionTestcaseAndAccountModel } from "../../../types/models/Submission.model";
import { ProblemService } from "./../../../services/Problem.service";

const ProblemStatistic = () => {
	const { problemId } = useParams();
	const accountId = String(localStorage.getItem("account_id"));

	const [problem, setProblem] =
		useState<ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel>();
	const [submissions, setSubmissions] =
		useState<SubmissionPopulateSubmissionTestcaseAndAccountModel[]>();

	const loadSubmissions = () => {
		if (!problemId) return;
		ProblemService.get(accountId, problemId)
			.then((response) => {
				setProblem(response.data);
				return SubmissionService.getByCreatorProblem(
					accountId,
					problemId
				);
			})
			.then((response) => {
				setSubmissions(response.data.submissions);
			});
	};

	useEffect(loadSubmissions, [accountId, problemId]);

	return (
		<NavbarSidebarLayout>
			<div className="mt-10 w-[96%] mx-auto">
				<div className="font-bold text-3xl">{problem?.title}</div>

				<div className="mb-5 flex justify-end gap-10 items-center">
					<div>
						<Link to={`/my/problems/${problemId}/edit`}>
							<Button>
								<Pencil size={20} className="mr-2" />
								Edit Problem
							</Button>
						</Link>
					</div>
				</div>

				<div>
					{problem && (
						<MyProblemSubmissionsTable
							submissions={submissions}
							problem={problem}
						/>
					)}
				</div>
			</div>
		</NavbarSidebarLayout>
	);
};

export default ProblemStatistic;
