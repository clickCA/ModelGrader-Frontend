import { ColumnDef } from "@tanstack/react-table";
import { Folder, LibraryBig, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { TopicPopulateTopicCollectionPopulateCollectionModel } from "../../types/models/Topic.model";
import { readableDateFormat } from "../../utilities/ReadableDateFormat";
import MyCourseDropdown from "../Dropdowns/MyCourseDropdown";
import { DataTable } from "./Prototype/DataTable";

const MyCoursesTable = ({
	courses = [],
}: {
	courses: TopicPopulateTopicCollectionPopulateCollectionModel[];
}) => {
	const columns: ColumnDef<TopicPopulateTopicCollectionPopulateCollectionModel>[] =
		[
			{
				accessorKey: "title",
				header: "Title",
				cell: ({ row }) => (
					<div className="flex items-center font-medium py-2 hover:underline hover:text-green-500">
						<LibraryBig
							className="mr-2 text-purple-400"
							size={20}
						/>
						<Link
							to={`/my/courses/${row.original.topic_id}/edit`}
							target="_blank"
						>
							{row.original.name}
						</Link>
					</div>
				),
			},
			{
				accessorKey: "collections",
				header: "Collections",
				cell: ({ row }) => (
					<div className="flex items-center font-medium">
						<Folder className="mr-2 text-yellow-400" size={20} />
						{row.original.collections.length}
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
			{
				accessorKey: "action",
				header: () => <div className="text-center">Action</div>,
				cell: ({ row }) => (
					<div className=" flex items-center justify-center">
						<MyCourseDropdown course={row.original}>
							<MoreHorizontal size={20} />
						</MyCourseDropdown>
					</div>
				),
			},
		];

	return (
		<div>
			<DataTable columns={columns} data={courses} />
		</div>
	);
};

export default MyCoursesTable;
