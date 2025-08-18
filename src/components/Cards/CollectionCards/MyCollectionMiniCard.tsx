import {
	FileSpreadsheet,
	Folder
} from "lucide-react";
import { useState } from "react";
import { CollectionPopulateProblemSecureModel } from "@/types/models/Collection.model";
import { Card } from "../../shadcn/Card";



const MyCollectionMiniCard = ({
	// problem,
    collection,
	disabled=false,
	disabledHighlight=false,
	onClick=()=>{}
}: {
	// problem: ProblemPopulateTestcases | ProblemSecureModel | ProblemModel;
    collection:CollectionPopulateProblemSecureModel
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
		collection && (
			// <MyCollectionContextMenu problem={problem}>
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
							<Folder className="text-yellow-400 mr-2" />
							{(!highlightTitle || disabled || disabledHighlight) && (
								<h1 className="	font-bold">{collection.name}</h1>
							)}
							{(highlightTitle && !disabled && !disabledHighlight) && (
								<h1 className="font-bold text-green-600">
									{collection.name}
								</h1>
							)}
						</div>

						<div className="flex gap-1 text-sm font-medium self-center">
                            <div className="flex">
                                <FileSpreadsheet className="text-blue-400 mr-2" />
                                <p>Problems ({collection.problems.length})</p>
                            </div>
						
						</div>
					</div>
				{/* </CardContent> */}
			</Card>
		// </MyCollectionContextMenu>
		)
	);
};

export default MyCollectionMiniCard;
