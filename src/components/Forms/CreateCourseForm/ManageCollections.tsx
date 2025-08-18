import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { CollectionService } from "@/services/Collection.service";
import { transformCollectionPopulateProblemSecureModel2CollectionHashedTable } from "@/types/adapters/Collection.adapter";
import {
	CollectionItemInterface,
	CreateCourseRequestForm,
} from "@/types/forms/CreateCourseRequestForm";
import {
	CollectionHashedTable,
	CollectionPopulateCollectionProblemPopulateProblemModel,
} from "@/types/models/Collection.model";
import MyCollectionMiniCard2 from "../../Cards/CollectionCards/MyCollectionMiniCard2";
import { Input } from "@/components/shadcn/Input";
import { ScrollArea } from "@/components/shadcn/ScrollArea";
import { Separator } from "@/components/shadcn/Seperator";

const ManageCollections = ({
	createRequest,
	setCreateRequest,
}: {
	createRequest: CreateCourseRequestForm;
	setCreateRequest: React.Dispatch<
		React.SetStateAction<CreateCourseRequestForm>
	>;
}) => {
	const accountId = String(localStorage.getItem("account_id"));

	const [allCollectionsSortable, setAllCollectionsSortable] = useState<
		CollectionItemInterface[]
	>([]);
	const [selectedCollectionsSortable, setSelectedCollectionsSortable] =
		useState<CollectionItemInterface[]>([]);

	const [allCollections, setAllCollections] = useState<CollectionHashedTable>(
		{}
	);

	const [initial, setInitial] = useState(true);
	const [selectedCollectionsSortableIds, setSelectedCollectionsSortableIds] =
		useState<string[]>([]);

	useEffect(() => {
		setSelectedCollectionsSortableIds(
			selectedCollectionsSortable.map((item) => item.id as string)
		);
	}, [selectedCollectionsSortable]);

	const handleRemoveSelectedCollection = (id: string) => {
		setSelectedCollectionsSortable([
			...selectedCollectionsSortable.filter((item) => item.id !== id),
		]);
	};

	const handleQuickToggleSelectedCollection = (
		item: CollectionItemInterface
	) => {
		// if (selectedCollectionsSortable.find((item1) => item1.id === item.id)) {
		// 	console.log("Remove");
		// 	handleRemoveSelectedCollection(item.id as string);
		// } else {
		// 	console.log("Add");
		// 	setSelectedCollectionsSortable([...selectedCollectionsSortable, item]);
		// }

		if (selectedCollectionsSortableIds.includes(item.id as string)) {
			handleRemoveSelectedCollection(item.id as string);
		} else {
			setSelectedCollectionsSortable([
				...selectedCollectionsSortable,
				item,
			]);
		}
	};

	useEffect(() => {
		setCreateRequest({
			...createRequest,
			collectionsInterface: [...selectedCollectionsSortable],
		});
		console.log('selectedCollectionsSortable',selectedCollectionsSortable)
	}, [selectedCollectionsSortable]);

	useEffect(() => {
		CollectionService.getAllAsCreator(accountId).then((response) => {
			setAllCollections(
				transformCollectionPopulateProblemSecureModel2CollectionHashedTable(
					response.data.collections
				)
			);

			setAllCollectionsSortable(
				response.data.collections.map((collection) => ({
					id: collection.collection_id,
					name: collection.name,
					collection: collection,
					groupPermissions: [],
				}))
			);
		});
	}, [accountId]);

	useEffect(() => {
		if (createRequest.course) {
			setAllCollections({
				...allCollections,
				...transformCollectionPopulateProblemSecureModel2CollectionHashedTable(
					createRequest.course.collections.map(
						(cc) =>
							cc.collection as CollectionPopulateCollectionProblemPopulateProblemModel
					)
				),
			});
		}
	}, [createRequest.course, allCollections]);

	useEffect(() => {
		if (initial) {
			setSelectedCollectionsSortable(
				createRequest.collectionsInterface.map((cc) => ({
					id: cc.collection.collection_id,
					name: cc.collection.name,
					collection: cc.collection,
					groupPermissions: cc.groupPermissions.map(
						(gc) => ({
							group_id: gc.group.group_id,
							group: gc.group,
							manageCollections: gc.manageCollections,
							viewCollections: gc.viewCollections,
						})
					),
				})) ?? ([] as CollectionItemInterface[])
			);
			setInitial(false);
		}

		console.log("Create Request", createRequest);
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
									list={selectedCollectionsSortable}
									setList={setSelectedCollectionsSortable}
									className="grid gap-y-2 p-2 rounded-md"
								>
									{selectedCollectionsSortable?.map(
										(item) => (
											<MyCollectionMiniCard2
												disabledHighlight
												onClick={() =>
													handleRemoveSelectedCollection(
														item.id as string
													)
												}
												key={item.id}
												collection={item.collection}
											/>
										)
									)}
								</ReactSortable>
							</ScrollArea>
						</div>
					</div>
				</div>

				<div className="mx-3">
					<Separator orientation="vertical" />
				</div>

				<div className="w-1/2">
					<Input className="mt-2" />
					<ScrollArea className="mt-6 h-[80vh] md:h-[60vh] pr-5">
						<ReactSortable
							group={{
								name: "shared",
								pull: "clone",
								put: false,
							}}
							animation={150}
							sort={false}
							list={allCollectionsSortable}
							setList={setAllCollectionsSortable}
							filter=".selected"
							className="grid grid-cols-3 gap-2 p-2 rounded-md"
						>
							{allCollectionsSortable?.map((item) => (
								<div
									className={
										selectedCollectionsSortable.includes(
											item
										)
											? "selected"
											: ""
									}
								>
									<MyCollectionMiniCard2
										onClick={() =>
											handleQuickToggleSelectedCollection(
												item
											)
										}
										disabled={selectedCollectionsSortableIds.includes(
											item.id as string
										)}
										key={item.id}
										collection={item.collection}
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

export default ManageCollections;
