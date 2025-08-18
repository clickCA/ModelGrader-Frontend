import { FolderPlus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardContainer from "../../../components/CardContainer";
import MyCollectionsTable from "../../../components/Tables/MyCollectionsTable";
import { Button } from "../../../components/shadcn/Button";
import { Input } from "../../../components/shadcn/Input";
import { Tabs, TabsList, TabsTrigger } from "../../../components/shadcn/Tabs";
import { NavSidebarContext } from "../../../contexts/NavSidebarContext";
import NavbarSidebarLayout from "../../../layout/NavbarSidebarLayout";
import { CollectionService } from "../../../services/Collection.service";
import { CollectionPopulateCollectionProblemPopulateProblemModel } from "@/types/models/Collection.model";

const MyCollections = () => {
	const navigate = useNavigate();
	const accountId = String(localStorage.getItem("account_id"));

	const [collections, setCollections] = useState<
		CollectionPopulateCollectionProblemPopulateProblemModel[]
	>([]);
	const [manageableCollections, setManageableCollections] = useState<
		CollectionPopulateCollectionProblemPopulateProblemModel[]
	>([]);
	const [filteredCollections, setFilteredCollections] = useState<
		CollectionPopulateCollectionProblemPopulateProblemModel[]
	>([]);
	const [filteredManageableCollections, setFilteredManageableCollections] =
		useState<CollectionPopulateCollectionProblemPopulateProblemModel[]>([]);

	const { setSection } = useContext(NavSidebarContext);

	const [tabValue, setTabValue] = useState("personal");
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		if (!searchValue || searchValue === "") {
			setFilteredCollections(collections);
			setFilteredManageableCollections(manageableCollections);
		} else {
			setFilteredCollections(
				collections.filter((collection) =>
					collection.name
						.toLowerCase()
						.includes(searchValue.toLowerCase())
				)
			);
			setFilteredManageableCollections(
				manageableCollections.filter((collection) =>
					collection.name
						.toLowerCase()
						.includes(searchValue.toLowerCase())
				)
			);
		}
	}, [searchValue, collections, manageableCollections]);

	useEffect(() => {
		setSection("COLLECTIONS");
		CollectionService.getAllAsCreator(accountId).then((response) => {
			setCollections(response.data.collections);
			setManageableCollections(response.data.manageable_collections);
		});
	}, []);

	return (
		<NavbarSidebarLayout>
			<div className="w-[96%] mx-auto mt-10">
				<div className="flex justify-between gap">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							My Collections
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
						<Button
							onClick={() => navigate("/my/collections/create")}
						>
							<FolderPlus size={20} className="mr-2" />
							Create Collection
						</Button>
					</div>
				</div>

				<CardContainer>
					{/* <MyCollectionsTable collections={filteredCollections} /> */}
					{
						tabValue === "personal" && (
							<MyCollectionsTable
								collections={filteredCollections}
							/>
						)
						// <MyCollectionCard collection={collection} />
					}
					{tabValue === "manageable" &&
						// filteredManageableCollections.map((collection) => (
							<MyCollectionsTable
								collections={filteredManageableCollections}
							/>
							// <MyCollectionCard collection={collection} />
						}
				</CardContainer>
			</div>
		</NavbarSidebarLayout>
	);
};

export default MyCollections;
