import { ColumnDef } from "@tanstack/react-table";
import { User, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { GroupPopulateGroupMemberPopulateAccountSecureModel } from "@/types/models/Group.model";
import { readableDateFormat } from "@/utilities/ReadableDateFormat";
import { DataTable } from "./Prototype/DataTable";

const MyGroupsTable = ({
	groups = [],
}: {
	groups: GroupPopulateGroupMemberPopulateAccountSecureModel[];
}) => {
	const column: ColumnDef<GroupPopulateGroupMemberPopulateAccountSecureModel>[] =
		[
			{
				accessorKey: "name",
				header: "Title",
				cell: ({ row }) => (
					<div className="flex items-center font-medium py-2 hover:underline hover:text-green-500">
						<Users
							style={{
								color: row.original.color,
							}}
							className="mr-2"
							size={20}
						/>
						<Link
							to={`/my/groups/${row.original.group_id}/edit`}
							target="_blank"
						>
							{row.original.name}
						</Link>
					</div>
				),
			},
			{
				accessorKey: "members",
				header: "Members",
				cell: ({ row }) => (
					<div className="flex items-center font-medium">
						<User className="mr-2 text-red-400" size={20} />
						{row.original.members.length}
					</div>
				),
			},
			{
				accessorKey: "updated_date",
				header: "Updated Date",
				cell: ({ row }) => (
					<div className="font-mono">
						{readableDateFormat(row.original.updated_date)}
					</div>
				),
			},
		];

	return (
		<div>
			<DataTable columns={column} data={groups} />
		</div>
	);
};

export default MyGroupsTable;
