import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { AccountService } from "../../../services/Account.service";
import { transformAccountModels2AccountHashedTable } from "@/types/adapters/Account.adapter";
import { CreateGroupRequestForm } from "@/types/forms/CreateGroupRequestForm";
import {
	AccountHashedTable,
	AccountSecureModel,
} from "@/types/models/Account.model";
import AccountMiniCard2 from "../../Cards/AccountCards/AccountMiniCard2";
import { Button } from "../../shadcn/Button";
import { Input } from "../../shadcn/Input";
import { ScrollArea } from "../../shadcn/ScrollArea";
import { Separator } from "../../shadcn/Seperator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shadcn/Tabs";
import { ItemInterface } from "./../../../../node_modules/react-sortablejs/dist/index.d";

const ManageMembers = ({
	createRequest,
	setCreateRequest,
}: {
	createRequest: CreateGroupRequestForm;
	setCreateRequest: React.Dispatch<
		React.SetStateAction<CreateGroupRequestForm>
	>;
}) => {
	const accountId = String(localStorage.getItem("account_id"));

	const [allAccounts, setAllAccounts] = useState<AccountHashedTable>({});

	const [allAccountsSortable, setAllAccountsSortable] = useState<
		ItemInterface[]
	>([]);

	const [uploadedAccounts, setUploadedAccounts] = useState<AccountHashedTable>({});

	const [uploadedAccountsSortable, setUploadedAccountsSortable] = useState<
		ItemInterface[]
	>([]);

	const [selectedAccountsSortable, setSelectedAccountsSortable] = useState<
		ItemInterface[]
	>([]);

	const [initial, setInitial] = useState(true);
	const [selectedAccountsSortableIds, setSelectedAccountsSortableIds] =
		useState<string[]>([]);

	useEffect(() => {
		setSelectedAccountsSortableIds(
			selectedAccountsSortable?.map((item) => item.id as string)
		);
	}, [selectedAccountsSortable]);

	const handleRemoveSelectedCollection = (id: string) => {
		setSelectedAccountsSortable([
			...selectedAccountsSortable.filter((item) => item.id !== id),
		]);
	};

	const handleQuickToggleSelectedCollection = (item: ItemInterface) => {
		if (selectedAccountsSortableIds.includes(item.id as string)) {
			handleRemoveSelectedCollection(item.id as string);
		} else {
			setSelectedAccountsSortable([...selectedAccountsSortable, item]);
		}
	};

	const handleAddAllMembers = () => {
		const addedItem:ItemInterface[] = []
		uploadedAccountsSortable.map((item) => {
			console.log("AAAAA")
			if (!selectedAccountsSortableIds.includes(item.id as string)) {
				addedItem.push(item)
			}
		})

		setSelectedAccountsSortable([...selectedAccountsSortable, ...addedItem]);
	}

	useEffect(() => {
		setCreateRequest({
			...createRequest,
			membersInterface: selectedAccountsSortable,
		});
	}, [selectedAccountsSortable]);

	useEffect(() => {
		AccountService.getAll().then((response) => {
			setAllAccounts(
				transformAccountModels2AccountHashedTable(
					response.data.accounts
				)
			);

			setAllAccountsSortable(
				response.data.accounts.map((account) => ({
					id: account.account_id,
					name: account.username,
				}))
			);
		});
	}, [accountId]);

	useEffect(() => {
		if (initial) {
			setSelectedAccountsSortable(createRequest.membersInterface);
			setInitial(false);
		}

		console.log("Create Request", createRequest);
	}, [createRequest]);

	const [accountReferenceFromFile, setAccountReferenceFromFile] = useState<string[]>([]);

	const handleUploadFile = (files: FileList | null) => {
		if (!files) return;
		const file = files[0];

		// If txt file get the content
		if (file.type === "text/plain") {
			const reader = new FileReader();
			reader.onload = function (e) {
				const content = e.target?.result;
				const lines = (content as string).split("\n");

				setAccountReferenceFromFile(lines)
			};
			reader.readAsText(file);
		}
		else if (file.type === "text/csv") {
			const reader = new FileReader();
			reader.onload = function (e) {
				const content = e.target?.result;
				console.log(content)
				const lines = (content as string).split("\n").map((line) => line.split(",")[0]);

				setAccountReferenceFromFile(lines)
			};
			reader.readAsText(file);
		}
	}


	useEffect(() => {
		if (accountReferenceFromFile.length === 0) return;

		AccountService.getAll({search: accountReferenceFromFile?.join(",")}).then((response) => {
			setUploadedAccounts(
				transformAccountModels2AccountHashedTable(
					response.data.accounts
				)
			);
			setUploadedAccountsSortable(
				response.data.accounts.map((account) => ({
					id: account.account_id,
					name: account.username,
				}))
			);
		})
	},[accountReferenceFromFile])



	return (
		<div>
			<div className="flex justify-between">
				<h1 className="text-2xl font-bold">Manage Members</h1>

			</div>

			<div className="flex">
				<div className="w-1/2">
					<div className="mt-6 pr-5">
						<div className="grid gap-y-3">
							<ScrollArea className="mt-6 h-[80vh] md:h-[60vh] pr-5">
								<ReactSortable
									animation={150}
									group="shared"
									list={selectedAccountsSortable}
									setList={setSelectedAccountsSortable}
									className="grid gap-y-2 p-2 rounded-md"
									sort={false}
								>
									{selectedAccountsSortable?.map((item) => (
										<AccountMiniCard2
											disabledHighlight
											onClick={() =>
												handleRemoveSelectedCollection(
													item.id as string
												)
											}
											key={item.id}
											account={
												allAccounts[
													item.id as string
												] as AccountSecureModel
											}
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
					<Tabs defaultValue="search">
						<TabsList>
							<TabsTrigger value="search">Search</TabsTrigger>
							<TabsTrigger value="upload">
								Upload File
							</TabsTrigger>
						</TabsList>
						<TabsContent value="search">
							<Input placeholder="Search ..." className="mt-2" />
							<ScrollArea className="mt-6 h-[80vh] md:h-[60vh] pr-5">
								<ReactSortable
									group={{
										name: "shared",
										pull: "clone",
										put: false,
									}}
									animation={150}
									sort={false}
									list={allAccountsSortable}
									setList={setAllAccountsSortable}
									filter=".selected"
									className="grid grid-cols-3 gap-2 p-2 rounded-md"
								>
									{allAccountsSortable?.map((item) => (
										<div
											className={
												selectedAccountsSortable?.includes(
													item
												)
													? "selected"
													: ""
											}
										>
											<AccountMiniCard2
												disabled={selectedAccountsSortableIds.includes(
													item.id as string
												)}
												onClick={() =>
													handleQuickToggleSelectedCollection(
														item
													)
												}
												key={item.id}
												account={
													allAccounts[
														item.id as string
													] as AccountSecureModel
												}
											/>
										</div>
									))}
								</ReactSortable>
							</ScrollArea>
						</TabsContent>
						<TabsContent value="upload">
							<Input onChange={(e) => handleUploadFile(e.target.files)} className="cursor-pointer" type="file" accept=".txt,.csv" />
							<div className="flex justify-end my-2">
								<Button onClick={handleAddAllMembers} disabled={accountReferenceFromFile.length === 0} >Add All</Button>
							</div>
							<ScrollArea className="h-[80vh] md:h-[60vh] pr-5">
								<ReactSortable
									group={{
										name: "shared",
										pull: "clone",
										put: false,
									}}
									animation={150}
									sort={false}
									list={uploadedAccountsSortable}
									setList={setUploadedAccountsSortable}
									filter=".selected"
									className="grid grid-cols-3 gap-2 p-2 rounded-md"
								>
									{uploadedAccountsSortable?.map((item) => (
										<div
											className={
												selectedAccountsSortable?.includes(
													item
												)
													? "selected"
													: ""
											}
										>
											<AccountMiniCard2
												disabled={selectedAccountsSortableIds.includes(
													item.id as string
												)}
												onClick={() =>
													handleQuickToggleSelectedCollection(
														item
													)
												}
												key={item.id}
												account={
													uploadedAccounts[
														item.id as string
													] as AccountSecureModel
												}
											/>
										</div>
									))}
								</ReactSortable>
							</ScrollArea>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default ManageMembers;
