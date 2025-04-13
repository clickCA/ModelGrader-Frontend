import { FilePlus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardContainer from "../../../components/CardContainer";
import CustomPagination from "../../../components/Paginations/CustomPagination";
import MyProblemsTable from "../../../components/Tables/ProblemTables/MyProblemsTable";
import { Button } from "../../../components/shadcn/Button";
import { Input } from "../../../components/shadcn/Input";
import { Tabs, TabsList, TabsTrigger } from "../../../components/shadcn/Tabs";
import { NavSidebarContext } from "../../../contexts/NavSidebarContext";
import NavbarSidebarLayout from "../../../layout/NavbarSidebarLayout";
import { ProblemService } from "../../../services/Problem.service";
import { Pagination } from "../../../types/Pagination.type";
import { ProblemCountTestcases } from "../../../types/models/Problem.model";

const MyProblems = () => {
	const accountId = String(localStorage.getItem("account_id"));
	const navigate = useNavigate();

	const [problems, setProblems] = useState<ProblemCountTestcases[]>([]);
	const [manageableProblems, setManageableProblems] = useState<
		ProblemCountTestcases[]
	>([]);
	const [filteredProblems, setFilteredProblems] = useState<
		ProblemCountTestcases[]
	>([]);
	const [filteredManageableProblems, setFilteredManageableProblems] =
		useState<ProblemCountTestcases[]>([]);
	const [problemPagination, setProblemPagination] = useState<Pagination>({
		start: 0,
		end: 10,
		total: 1,
	});
	const [loading, setLoading] = useState<boolean>(true);

	const { setSection } = useContext(NavSidebarContext);

	const [tabValue, setTabValue] = useState("personal");
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		if (!searchValue || searchValue === "") {
			setFilteredProblems(problems);
			setFilteredManageableProblems(manageableProblems);
		} else {
			setFilteredProblems(
				problems.filter((problem) =>
					problem.title
						.toLowerCase()
						.includes(searchValue.toLowerCase())
				)
			);
			setFilteredManageableProblems(
				manageableProblems.filter((problem) =>
					problem.title
						.toLowerCase()
						.includes(searchValue.toLowerCase())
				)
			);
		}
	}, [searchValue, problems, manageableProblems]);

	useEffect(() => {
		setLoading(true);
		ProblemService.getAllAsCreator(accountId, {
			start: problemPagination.start,
			end: problemPagination.end,
		}).then((response) => {
			setProblems(response.data.problems);
			setManageableProblems(response.data.manageable_problems);
			setProblemPagination({
				...problemPagination,
				total: response.data.total_personal_problems,
			});
			setLoading(false);
		});

		setSection("PROBLEMS");
	}, [accountId, problemPagination.start, problemPagination.end]);

	const handleNextClick = () => {
		if (problemPagination.end < problemPagination.total) {
			setProblemPagination((prev) => {
				const newStart = prev.start + 10;
				const newEnd = Math.min(prev.end + 10, prev.total);
				return { ...prev, start: newStart, end: newEnd };
			});
		}
	};

	const handlePreviousClick = () => {
		if (problemPagination.start > 0) {
			setProblemPagination((prev) => {
				const newStart = Math.max(prev.start - 10, 0);
				const newEnd = prev.end - 10;
				return { ...prev, start: newStart, end: newEnd };
			});
		}
	};

	return (
		<NavbarSidebarLayout>
			<div className="w-[96%] mx-auto mt-10">
				<div className="flex justify-between gap">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							My Problems
						</h1>
					</div>
					<div className="w-7/12 md:w-5/12">
						<Input
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							placeholder="Search ..."
						/>
					</div>
					<div>
						<Tabs
							value={tabValue}
							onValueChange={(e) => setTabValue(e)}
						>
							<TabsList>
								<TabsTrigger value="personal">
									Personal
								</TabsTrigger>
								<TabsTrigger value="manageable">
									Manageable
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>
					<div>
						<Button onClick={() => navigate("/my/problems/create")}>
							<FilePlus size={20} className="mr-2" />
							Create Problem
						</Button>
					</div>
				</div>

				<CardContainer>
					{tabValue === "personal" && (
						<MyProblemsTable problems={filteredProblems} />
					)}
					{tabValue === "manageable" && (
						<MyProblemsTable
							problems={filteredManageableProblems}
						/>
					)}

					<div className="flex justify-end">
						<div>
							<CustomPagination
								disabled={loading}
								pagination={problemPagination}
								onNextClick={handleNextClick}
								onPreviousClick={handlePreviousClick}
							/>
						</div>
					</div>
				</CardContainer>
			</div>
		</NavbarSidebarLayout>
	);
};

export default MyProblems;
