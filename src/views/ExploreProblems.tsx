import { useEffect, useState } from "react";
import CardContainer from "../components/CardContainer";
import PublicProblemsTable from "../components/Tables/ProblemTables/PublicProblemsTable";
import { Separator } from "../components/shadcn/Seperator";
import NavbarMenuLayout from "../layout/NavbarMenuLayout";
import { ProblemService } from "../services/Problem.service";
import { ProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel } from "../types/models/Problem.model";

const ExploreProblems = () => {
	const [problems, setProblems] = useState<
		ProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel[]
	>([]);

	const accountId = String(localStorage.getItem("account_id"));

	useEffect(() => {
		ProblemService.getAll({
			account_id: accountId,
		}).then((response) => {
      console.log('prob',response.data.problems)
			setProblems(response.data.problems);
		});
	}, [accountId]);

	return (
		<NavbarMenuLayout>
			<div className="mx-auto w-[90%] mt-10">
				<h1 className="text-3xl font-bold">Explore Problems</h1>
				<div>
					<CardContainer className="w-4/4">
						{/* {problems.map((problem) => (
							<PublicProblemCard problem={problem} />
						))} */}
					<PublicProblemsTable
						problems={problems}
					/>
					</CardContainer>
          <Separator orientation="vertical"/>
				</div>
			</div>
		</NavbarMenuLayout>
	);
};

export default ExploreProblems;
