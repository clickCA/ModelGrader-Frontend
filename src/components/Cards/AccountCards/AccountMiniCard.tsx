import {
	User
} from "lucide-react";
import { useState } from "react";
import { AccountModel, AccountSecureModel } from "@/types/models/Account.model";
import { Card } from "../../shadcn/Card";

const AccountMiniCard = ({
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
		account && (
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
							<User className="text-red-400 mr-2" />
							{(!highlightTitle || disabled || disabledHighlight) && (
								<h1 className="	font-bold">{account.username}</h1>
							)}
							{(highlightTitle && !disabled && !disabledHighlight) && (
								<h1 className="font-bold text-green-600">
									{account.username}
								</h1>
							)}
						</div>
					</div>
				{/* </CardContent> */}
			</Card>
		// </MyCollectionContextMenu>
		)
	);
};

export default AccountMiniCard;
