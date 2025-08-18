import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { ProblemService } from "../../../services/Problem.service";
import { transformProblemModel2ProblemHashedTable } from "@/types/adapters/Problem.adapter";
import {
	CreateCollectionRequestForm,
	ProblemItemInterface,
} from "@/types/forms/CreateCollectionRequestForm";
import { ProblemHashedTable } from "@/types/models/Problem.model";
import MyProblemMiniCard2 from "../../Cards/ProblemCards/MyProblemMiniCard2";
import { Input } from "../../shadcn/Input";
import { ScrollArea } from "../../shadcn/ScrollArea";
import { Separator } from "../../shadcn/Seperator";

const ManageProblems = ({
	createRequest,
	setCreateRequest,
}: {
	createRequest: CreateCollectionRequestForm;
	setCreateRequest: React.Dispatch<
		React.SetStateAction<CreateCollectionRequestForm>
	>;
}) => {
	const accountId = String(localStorage.getItem("account_id"));

	const [allProblemsSortable, setAllProblemsSortable] = useState<
		ProblemItemInterface[]
	>([]);
	const [selectedProblemsSortable, setSelectedProblemsSortable] = useState<
		ProblemItemInterface[]
	>([]);
	const [allProblems, setAllProblems] = useState<ProblemHashedTable>({});

	const [initial, setInitial] = useState(true);
	const [selectedProblemSortableIds, setSelectedProblemSortableIds] =
		useState<string[]>([]);

	useEffect(() => {
		setSelectedProblemSortableIds(
			selectedProblemsSortable.map((item) => item.id as string)
		);
	}, [selectedProblemsSortable]);

	const handleRemoveSelectedProblem = (id: string) => {
		setSelectedProblemsSortable([
			...selectedProblemsSortable.filter((item) => item.id !== id),
		]);
	};

	const handleQuickToggleSelectedProblem = (item: ProblemItemInterface) => {
		// if (selectedProblemsSortable.find((item1) => item1.id === item.id)) {
		// 	console.log("Remove");
		// 	handleRemoveSelectedProblem(item.id as string);
		// } else {
		// 	console.log("Add");
		// 	setSelectedProblemsSortable([...selectedProblemsSortable, item]);
		// }

		if (selectedProblemSortableIds.includes(item.id as string)) {
			handleRemoveSelectedProblem(item.id as string);
		} else {
			setSelectedProblemsSortable([...selectedProblemsSortable, item]);
		}
	};

	useEffect(() => {
		setCreateRequest({
			...createRequest,
			problemsInterface: [...selectedProblemsSortable],
		});
	}, [selectedProblemsSortable]);

	const [filteredProblems, setFilteredProblems] = useState<
		ProblemItemInterface[]
	>([]);
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		setFilteredProblems(
			allProblemsSortable.filter(
				(item) =>
					searchValue === "" ||
					item.problem.title.includes(searchValue)
			)
		);
	}, [searchValue, allProblemsSortable]);

	useEffect(() => {
		ProblemService.getAllAsCreator(accountId, { end: 10 })
			.then((response) => {
				setAllProblems(
					transformProblemModel2ProblemHashedTable(
						response.data.problems
					)
				);
				setAllProblemsSortable(
					response.data.problems.map((problem) => ({
						id: problem.problem_id,
						name: problem.title,
						problem: problem,
						groupPermissions: [],
					}))
				);

				return ProblemService.getAllAsCreator(accountId);
			})
			.then((response) => {
				setAllProblems(
					transformProblemModel2ProblemHashedTable(
						response.data.problems
					)
				);
				setAllProblemsSortable(
					response.data.problems.map((problem) => ({
						id: problem.problem_id,
						name: problem.title,
						problem: problem,
						groupPermissions: [],
					}))
				);
			});
	}, [accountId]);

	useEffect(() => {
		if (createRequest.collection) {
			setAllProblems({
				...allProblems,
				...transformProblemModel2ProblemHashedTable(
					createRequest.collection.problems.map((cp) => cp.problem)
				),
			});
		}
	}, [createRequest.collection, allProblems]);

	useEffect(() => {
		if (initial) {
			setSelectedProblemsSortable(
				createRequest.problemsInterface?.map((cp) => ({
					id: cp.problem.problem_id,
					name: cp.problem.title,
					problem: cp.problem,
					groupPermissions: cp.groupPermissions.map((gc) => ({
						groupId: gc.group.group_id,
						group: gc.group,
						manageProblems: gc.manageProblems,
						viewProblems: gc.viewProblems,
					})),
				})) ?? ([] as ProblemItemInterface[])
			);
			setInitial(false);
		}

		// console.log("Create Request", createRequest);
	}, [createRequest]);

	return (
		<div>
			<div className="flex">
				<div className="w-1/2">
					<div className="mt-6 pr-5">
						<div className="grid gap-y-3">
							<ScrollArea className="mt-6 h-[80vh] md:h-[60vh] pr-5">
								<ReactSortable
									animation={150}
									group="shared"
									list={selectedProblemsSortable}
									setList={setSelectedProblemsSortable}
									className="grid gap-y-2 p-2 rounded-md"
								>
									{selectedProblemsSortable?.map((item) => (
										<MyProblemMiniCard2
											disabledHighlight
											onClickXIcon={() =>
												handleRemoveSelectedProblem(
													item.id as string
												)
											}
											onClickPencilIcon={() => {
												const win = window.open(
													`/my/problems/${item.problem.problem_id}/edit`,
													"_blank"
												);
												if (win) win.focus();
											}}
											key={item.id}
											problem={item.problem}
										/>
									))}
								</ReactSortable>
							</ScrollArea>
						</div>
					</div>
				</div>

				<div className="mx-3">
					<Separator orientation="vertical" />
				</div>

				<div className="w-1/2">
					<Input
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						className="mt-2"
					/>
					<ScrollArea className="mt-6 h-[80vh] md:h-[60vh] pr-5">
						<ReactSortable
							group={{
								name: "shared",
								pull: "clone",
								put: false,
							}}
							animation={150}
							sort={false}
							list={allProblemsSortable}
							setList={setAllProblemsSortable}
							filter=".selected"
							className="grid grid-cols-1 gap-2 p-2 rounded-md"
						>
							{filteredProblems?.map((item) => (
								<div
									className={
										selectedProblemsSortable.includes(item)
											? "selected"
											: ""
									}
								>
									<MyProblemMiniCard2
										onClick={() =>
											handleQuickToggleSelectedProblem(
												item
											)
										}
										disabled={selectedProblemSortableIds.includes(
											item.id as string
										)}
										key={item.id}
										problem={item.problem}
									/>
								</div>
							))}
						</ReactSortable>
					</ScrollArea>
				</div>
			</div>
		</div>
	);
};

export default ManageProblems;
