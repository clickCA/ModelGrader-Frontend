import {
	User
} from "lucide-react";
import { useState } from "react";
import { AccountModel, AccountSecureModel } from "@/types/models/Account.model";
import { Card } from "@/components/shadcn/Card";

const AccountMiniCard2 = ({
	// problem,
    account,
	disabled=false,
	disabledHighlight=false,
	onClick=()=>{}
}: {
	// problem: ProblemPopulateTestcases | ProblemSecureModel | ProblemModel;
    account: AccountModel | AccountSecureModel;
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
		let className = "p-2 cursor-pointer ";

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
		account && (
			// <MyCollectionContextMenu problem={problem}>
			<Card
				onClick={() => onClick()}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				className={customCardCSS()}

				// className={`pt-6 px-5 ${disabled ? "opacity-50" : }`}`}
			>
				<div className="flex items-center justify-between font-medium text-base ">
					<div className="flex items-center">
						<User size={20} className="text-red-400 mr-2" />
						<p className="">{account.username}</p>
					</div>
					{/* <div className="bg-red-600 w-4 h-4 text-center text-white rounded-full text-xs">
						{collection.problems.length}
					</div> */}
				</div>
			</Card>
		// </MyCollectionContextMenu>
		)
	);
};

export default AccountMiniCard2;
