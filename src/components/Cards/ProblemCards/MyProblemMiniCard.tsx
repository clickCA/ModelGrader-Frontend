import {
	FileSpreadsheet,
	PencilIcon,
	Trash
} from "lucide-react";
import React, { useState } from "react";
import {
	ProblemModel,
	ProblemPopulateTestcases,
	ProblemSecureModel
} from "@/types/models/Problem.model";
import Checkmark from "../../Checkmark";
import DeleteProblemConfirmationDialog from "../../Dialogs/DeleteProblemConfirmationDialog";
import { Card } from "@/components/shadcn/Card";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/shadcn/ContextMenu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/shadcn/Tooltip";



const MyProblemContextMenu = ({
	children,
	problem,
}: {
	children: React.ReactNode;
	problem: ProblemPopulateTestcases | ProblemSecureModel | ProblemModel;
}) => {
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

	return (
		<ContextMenu>
			<DeleteProblemConfirmationDialog
				problem={problem}
				open={openDeleteDialog}
				setOpen={setOpenDeleteDialog}
				afterDelete={() => window.location.reload()}
			/>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem>
					<PencilIcon className="mr-2" size={16} />
					Edit
				</ContextMenuItem>
				<ContextMenuItem onClick={() => setOpenDeleteDialog(true)}>
					<Trash className="mr-2" size={16} />
					Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
};

const MyProblemMiniCard = ({
	problem,
	disabled=false,
	disabledHighlight=false,
	onClick=()=>{}
}: {
	problem: ProblemPopulateTestcases | ProblemSecureModel | ProblemModel;
	disabled?: boolean;
	disabledHighlight?: boolean;
	onClick?: () => void;
}) => {

	const [highlightTitle, setHighlightTitle] = useState(false);

	const handleMouseOver = () => {
		setHighlightTitle(true);
	};
	const handleMouseOut = () => {
		setHighlightTitle(false);
	};

	const customCardCSS = ():string => {
		let className = "py-3 px-5 cursor-pointer ";

		if (disabled) {
			className += "opacity-50 ";
		}
		else{
			if (highlightTitle && !disabledHighlight) {
				className += "border-green-500 bg-green-100 ";
			}
		} 
		return className;
	}

	return (
		problem && (
			<MyProblemContextMenu problem={problem}>
			<Card
				onClick={() => onClick()}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				className={customCardCSS()}

				// className={`pt-6 px-5 ${disabled ? "opacity-50" : }`}`}
			>
				{/* <CardContent> */}
					<div className="flex items-stretch justify-between">
						<div className="flex items-center w-1/2">
							<FileSpreadsheet className="text-blue-400 mr-2" />
							{(!highlightTitle || disabled || disabledHighlight) && (
								<h1 className="	font-bold">{problem.title}</h1>
							)}
							{(highlightTitle && !disabled && !disabledHighlight) && (
								<h1 className="font-bold text-green-600">
									{problem.title}
								</h1>
							)}
						</div>

						<div className="flex gap-1 text-sm font-medium self-center">
                            <Tooltip>
                                <TooltipTrigger><Checkmark variant="circle" status/></TooltipTrigger>
                                <TooltipContent>Source Code</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger><Checkmark variant="circle" status={false}/></TooltipTrigger>
                                <TooltipContent>Testcase</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger><Checkmark variant="circle" status/></TooltipTrigger>
                                <TooltipContent>No Runtime Error</TooltipContent>
                            </Tooltip>
						
						</div>
					</div>
				{/* </CardContent> */}
			</Card>
		</MyProblemContextMenu>
		)
	);
};

export default MyProblemMiniCard;
