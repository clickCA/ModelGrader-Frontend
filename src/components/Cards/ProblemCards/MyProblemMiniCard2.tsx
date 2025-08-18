import { FileSpreadsheet, Pencil, X } from "lucide-react";
import { useState } from "react";
import {
    ProblemModel,
    ProblemPopulateTestcases,
} from "@/types/models/Problem.model";
import { onMiddleClickOpenInNewTab } from "../../../utilities/OnMiddleClickOpenInNewTab";
import MyProblemContextMenu from "../../ContextMenus/MyProblemContextMenu";
import { Card } from "../../shadcn/Card";

const MyProblemMiniCard2 = ({
	problem,
	disabled = false,
	disabledHighlight = false,
	onClick = () => {},
	onClickPencilIcon,
	onClickXIcon,
}: {
	problem: ProblemPopulateTestcases | ProblemModel;
	disabled?: boolean;
	disabledHighlight?: boolean;
	onClick?: () => void;
	onClickPencilIcon?: () => void;
	onClickXIcon?: () => void;
}) => {
	const [highlightTitle, setHighlightTitle] = useState(false);

	const handleMouseOver = () => {
		setHighlightTitle(true);
	};
	const handleMouseOut = () => {
		setHighlightTitle(false);
	};

	const customCardCSS = (): string => {
		let className = "p-2 cursor-pointer ";

		if (disabled) {
			className += "opacity-50 ";
		} else {
			if (highlightTitle && !disabledHighlight) {
				className += "border-green-500 bg-green-100 ";
			}
		}
		return className;
	};

	return (
		problem && (
			<MyProblemContextMenu problem={problem}>
				<Card
					onMouseDown={(e) =>
						onMiddleClickOpenInNewTab(
							e,
							`/my/problems/${problem.problem_id}/edit`
						)
					}
					onClick={() => onClick()}
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
					className={customCardCSS()}

					// className={`pt-6 px-5 ${disabled ? "opacity-50" : }`}`}
				>
					<div className="flex items-center font-medium text-base justify-between">
						<div className="flex items-center w-4/12">
							<FileSpreadsheet
								size={20}
								className="text-blue-400 mr-2"
							/>

							<p className="font-mono line-clamp-1 w-5/6">
								{problem.title}
							</p>
						</div>

						<div className="flex gap-3">
							{onClickPencilIcon && (
								<Pencil
									onClick={onClickPencilIcon}
									className="text-neutral-600 hover:text-primary"
									size={16}
								/>
							)}
							{onClickXIcon && (
								<X
									onClick={onClickXIcon}
									className="text-red-400 hover:text-red-700"
									size={16}
								/>
							)}
						</div>
					</div>
				</Card>
			</MyProblemContextMenu>
		)
	);
};

export default MyProblemMiniCard2;
