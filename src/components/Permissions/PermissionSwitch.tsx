import { ReactNode } from "react";
import { Separator } from "@/components/shadcn/Seperator";
import { Switch } from "@/components/shadcn/Switch";

const PermissionSwitch = ({
	title = "Title",
	description = "Description",
	checked = false,
	onClick = () => {},
	disabled = false,
}: {
	title?: ReactNode;
	description?: ReactNode;
	checked?: boolean;
	onClick?: () => void;
	disabled?: boolean;
}) => {
	return (
		<div  onClick={onClick} className="pt-3 hover:bg-green-100 hover:text-green-800 cursor-pointer">
			<div className="px-2">
				<div className="flex justify-between">
					<p className="font-bold">{title}</p>
					<Switch disabled={disabled} checked={checked} />
				</div>
				<p className="text-base my-3">{description}</p>
			</div>
			<Separator className="" />
		</div>
	);
};

export default PermissionSwitch;
