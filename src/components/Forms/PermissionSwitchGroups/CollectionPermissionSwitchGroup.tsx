import PermissionSwitch from "../../Permissions/PermissionSwitch";
import { Switch } from "@/components/shadcn/Switch";

const CollectionPermissionSwitchGroup = ({
	manageCollectionsChecked = false,
	viewCollectionsChecked = false,
	onClickManageCollections = () => {},
	onClickViewCollections = () => {},
	variant = "normal",
}: {
	manageCollectionsChecked?: boolean;
	viewCollectionsChecked?: boolean;
	onClickManageCollections?: () => void | undefined;
	onClickViewCollections?: () => void | undefined;
	variant?: "normal" | "minimal";
}) => {
	const CollectionPermissions = [
		{
			title: "Manage Collections",
			description:
				"Can edit collections name and description. Can add or remove problems from collection as well.",
			checked: manageCollectionsChecked,
			onClick: onClickManageCollections,
		},
		{
			title: "View Collections",
			description:
				"Can view collection and thier problems. Note that those problems must be accessible as well.",
			checked: viewCollectionsChecked,
			onClick: onClickViewCollections,
		},
	];

	return (
		(variant === "normal" && (
			<>
				{CollectionPermissions.map((permission) => (
					<PermissionSwitch
						title={permission.title}
						description={permission.description}
						checked={permission.checked}
						onClick={permission.onClick}
					/>
				))}
			</>
		)) ||
		(variant === "minimal" && (
			<>
				{CollectionPermissions.map((permission) => (
					<div className="flex items-center font-medium text-sm">
						{permission.title}
						<Switch className="ml-2" />
					</div>
				))}
			</>
		))
	);
};

export default CollectionPermissionSwitchGroup;
