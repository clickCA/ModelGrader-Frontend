import React from "react";
import { AccountSecureModel } from "@/types/models/Account.model";
import { Card } from "../../shadcn/Card";
import { Checkbox } from "../../shadcn/Checkbox";

export type AccountCheckboxCardOnClickCallback = {
	checked: boolean;
	setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccountCheckboxCard = ({
	account,
	checked=false,
    onClick=()=>{}
}: {
	account: AccountSecureModel;
	checked?: boolean;
    onClick?: () => void;
}) => {
	return (
		<Card
			onClick={onClick}
			className={`p-3 cursor-pointer ${
				checked ? "border-green-500 bg-green-100 " : ""
			}`}
		>
			<div className="flex items-center">
				<Checkbox checked={checked} className="mr-2" />
				<p>{account?.username}</p>
			</div>
		</Card>
	);
};

export default AccountCheckboxCard;
