import {
	Folder
} from "lucide-react";
import { useState } from "react";
import {
	CollectionPopulateCollectionProblemPopulateProblemModel,
	CollectionPopulateProblemSecureModel
} from "@/types/models/Collection.model";
import { onMiddleClickOpenInNewTab } from "@/utilities/OnMiddleClickOpenInNewTab";
import MyCollectionContextMenu from "@/components/ContextMenus/MyCollectionContextMenu";
import { Card } from "@/components/shadcn/Card";



const MyCollectionMiniCard2 = ({
	collection,
	disabled = false,
	disabledHighlight = false,
	onClick = () => {},
}: {
	collection: CollectionPopulateProblemSecureModel | CollectionPopulateCollectionProblemPopulateProblemModel;
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
		collection && (
			<MyCollectionContextMenu collection={collection}>
			<Card
				onMouseDown={(e) => onMiddleClickOpenInNewTab(e,`/my/collections/${collection.collection_id}/edit`)}
				onClick={() => onClick()}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				className={customCardCSS()}

			>
				<div className="flex items-center justify-between font-medium text-base ">
					<div className="flex items-center w-11/12">
						<Folder size={20} className="text-yellow-400 mr-2" />
						<p className="line-clamp-1">{collection.name}</p>
					</div>
					<div className="bg-blue-600 w-4 h-4 text-center text-white rounded-full text-xs">
						{collection.problems.length}
					</div>
				</div>
			</Card>
			</MyCollectionContextMenu>
		)
	);
};

export default MyCollectionMiniCard2;
