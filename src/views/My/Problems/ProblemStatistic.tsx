import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MyProblemSubmissionsTable from "../../../components/Tables/MyProblemSubmissionsTable";
import { Button } from "../../../components/shadcn/Button";
import NavbarSidebarLayout from "../../../layout/NavbarSidebarLayout";
import { SubmissionService } from "../../../services/Submission.service";
import { ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel } from "../../../types/models/Problem.model";
import { SubmissionPopulateSubmissionTestcaseAndAccountModel } from "../../../types/models/Submission.model";
import { ProblemService } from "./../../../services/Problem.service";
import { Pencil, RotateCw } from "lucide-react";
import { Switch } from "../../../components/shadcn/Switch";
import { Label } from "../../../components/shadcn/Label";
import { cn } from "../../../lib/utils";

const ProblemStatistic = () => {
	const { problemId } = useParams();
	const accountId = String(localStorage.getItem("account_id"));
	const [loading, setLoading] = useState(false);
	const [realtimeSubmission, setRealtimeSubmission] = useState(false);

	const [problem, setProblem] =
		useState<ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel>();
	const [submissions, setSubmissions] =
		useState<SubmissionPopulateSubmissionTestcaseAndAccountModel[]>();

	const loadSubmissions = () => {
		if (!problemId) return;
		setLoading(true);
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
				setLoading(false);
			});
	};

	useEffect(loadSubmissions, [accountId, problemId]);
	useEffect(() => {
		if (realtimeSubmission) {
			loadSubmissions();
		}
	})

	return (
		<NavbarSidebarLayout>
			<div className="mt-10 w-[96%] mx-auto">
				<div className="font-bold text-3xl">{problem?.title}</div>

				<div className="mb-5 flex justify-end gap-10 items-center">
					<div className="flex items-center gap-2">
						
						{!realtimeSubmission ? (
							<Button
								onClick={loadSubmissions}
								disabled={loading || realtimeSubmission}
								className={cn("bg-blue-600 hover:bg-blue-500")}
							>
								<RotateCw size={20} className={cn({
									"animate-spin": loading,
								})} />
							</Button>
						) : (
							<Button
								disabled
								className="bg-red-600 hover:bg-red-500"
							>
								<RotateCw size={20} className="animate-spin mr-2" />
								Streaming...
							</Button>
						)}
						<Label>Realtime Submission</Label>
						<Switch
							checked={realtimeSubmission}
							onClick={() =>
								setRealtimeSubmission(!realtimeSubmission)
							}
						/>
					</div>
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
