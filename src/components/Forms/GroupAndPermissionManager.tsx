import { Eye, PlusCircle, Users, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateCollectionRequestForm } from "@/types/forms/CreateCollectionRequestForm";
import {
	CreateCourseRequestForm
} from "@/types/forms/CreateCourseRequestForm";
import { CreateProblemRequestForm } from "@/types/forms/CreateProblemRequestForm";
import { GroupModel } from "@/types/models/Group.model";
import GroupCheckbox from "../GroupCheckbox";
import { Button } from "@/components/shadcn/Button";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/shadcn/ContextMenu";
import { Dialog, DialogContent } from "@/components/shadcn/Dialog";
import { ScrollArea } from "@/components/shadcn/ScrollArea";
import { Separator } from "@/components/shadcn/Seperator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/shadcn/Tooltip";

export type GroupAndPermissionManagerOnAddGroupsCallback = {
	addingGroups: GroupModel[];
}

export type GroupAndPermissionManagerOnRemoveGroupCallback = {
	index: number;
}

const GroupListItem = ({
	hexColor = "#000000",
	name = "Group Name",
	hightlighted = false,
}: {
	hexColor?: string;
	name?: string;
	hightlighted?: boolean;
}) => {
	const customStyle = () => {
		let style =
			"font-bold text-base flex items-center cursor-pointer py-1 px-3 rounded-md ";
		if (hightlighted) {
			style += " bg-green-100 text-white";
		}

		return style;
	};

	return (
		<div
			style={{
				backgroundColor: hightlighted ? hexColor : "#FFFFFF",
			}}
			className={customStyle()}
		>
			<div
				style={{
					backgroundColor: hightlighted ? "#FFFFFF" : hexColor,
				}}
				className="w-3 h-3 rounded-full mr-2"
			></div>
			<div>{name}</div>
		</div>
	);
};

const GroupListItemContextMenu = ({
	children,
	onClickRemove = () => {},
	onClickViewGroup = () => {},
}: {
	children: React.ReactNode;
	onClickRemove?: () => void;
	onClickViewGroup?: () => void;
}) => {
	return (
		<ContextMenu>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem onClick={() => onClickViewGroup()}>
					<Eye size={16} className="mr-2" />
					View Group
				</ContextMenuItem>
				<ContextMenuItem onClick={() => onClickRemove()}>
					<X size={16} className="mr-2" />
					Remove
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
};

const GroupAndPermissionManager = ({
	allGroups=[],
	createRequest,
	// setCreateRequest,
	onAddGroups=()=>{},
	onRemoveGroup=()=>{},
	selectedIndex=-1,
	setSelectedIndex=()=>{},
	children,
}: {
	allGroups: GroupModel[];
	createRequest: CreateCourseRequestForm | CreateCollectionRequestForm | CreateProblemRequestForm;
	// setCreateRequest: 
	// 	React.Dispatch<React.SetStateAction<CreateCourseRequestForm>> |
	// 	React.Dispatch<React.SetStateAction<CreateCollectionRequestForm>> |
	// 	React.Dispatch<React.SetStateAction<CreateProblemRequestForm>>;

	onAddGroups?: (e: GroupAndPermissionManagerOnAddGroupsCallback) => void;
	onRemoveGroup?: (e: GroupAndPermissionManagerOnRemoveGroupCallback) => void;
	selectedIndex?: number;
	setSelectedIndex?: React.Dispatch<React.SetStateAction<number>>;
	children: React.ReactNode;
}) => {
	const navigate = useNavigate();

	const [openAddGroupsDialog, setOpenAddGroupsDialog] =
		useState<boolean>(false);
	const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

	const handleSelectGroupCheckbox = (groupId: string) => {
		if (selectedGroupIds.includes(groupId)) {
			setSelectedGroupIds(selectedGroupIds.filter((g) => g !== groupId));
		} else {
			setSelectedGroupIds([...selectedGroupIds, groupId]);
		}
	};

	const handleRemoveGroupPermission = (index: number) => {
		onRemoveGroup({index})
	}

	const getNotInPermissionGroup = () => {
		const inPermissiongroupIds = createRequest.groupPermissions.map(
			(groupPermission) => groupPermission.group.group_id
		);
		return allGroups.filter(
			(group) => !inPermissiongroupIds.includes(group.group_id)
		);
	};

	const handleAddGroups = () => {
		const addingGroups = allGroups.filter((group) =>
			selectedGroupIds.includes(group.group_id)
		);
		onAddGroups({addingGroups})
		setSelectedGroupIds([]);
		setOpenAddGroupsDialog(false);
	};

	return (
		<div className="flex">
			<div className="w-1/6 h-[75vh]">
				<div className="flex text-green-600 items-center justify-between">
					<p className="flex font-bold text-base">
						<Users size={20} className="mr-2" />
						Groups
					</p>
					<Tooltip>
						<TooltipTrigger>
							<PlusCircle
								onClick={() => setOpenAddGroupsDialog(true)}
								size={20}
							/>
						</TooltipTrigger>
						<TooltipContent>Add Group</TooltipContent>
					</Tooltip>
				</div>
				<ScrollArea className="mt-2">
					<div className="grid gap-y-1">
						{createRequest.groupPermissions.map(
							(groupPermission, index) => (
								<div onClick={() => setSelectedIndex(index)}>
									<GroupListItemContextMenu
										onClickViewGroup={() => navigate(`/my/groups/${groupPermission.group.group_id}/edit`)}
										onClickRemove={() => handleRemoveGroupPermission(index)}
									>
										<GroupListItem
											key={index}
											name={groupPermission.group.name}
											hexColor={
												groupPermission.group.color
											}
											hightlighted={
												selectedIndex === index
											}
										/>
									</GroupListItemContextMenu>
								</div>
							)
						)}
					</div>
				</ScrollArea>
			</div>
			<div>
				<Separator orientation="vertical" className="mx-3" />
			</div>
			<ScrollArea className="w-5/6 h-[75vh]">
					{children}
			</ScrollArea>

			<Dialog
				open={openAddGroupsDialog}
				onOpenChange={setOpenAddGroupsDialog}
			>
				<DialogContent className="max-w-[80%]">
					<p className="font-bold">Add Groups</p>
					<ScrollArea>
						<div className="grid grid-cols-4 gap-2">
							{getNotInPermissionGroup().map((group) => (
								<GroupCheckbox
									onClick={() =>
										handleSelectGroupCheckbox(
											group.group_id
										)
									}
									checked={selectedGroupIds.includes(
										group.group_id
									)}
									group={group}
								/>
							))}
						</div>
					</ScrollArea>
					<div className="flex justify-end">
						<Button onClick={handleAddGroups}>Add Groups</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default GroupAndPermissionManager;
