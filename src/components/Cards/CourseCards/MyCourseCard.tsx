import { Folder, LibraryBig } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopicPopulateTopicCollectionPopulateCollectionModel } from "@/types/models/Topic.model";
import { onMiddleClickOpenInNewTab } from "@/utilities/OnMiddleClickOpenInNewTab";
import { readableDateFormat } from "@/utilities/ReadableDateFormat";
import MyCourseContextMenu from "@/components/ContextMenus/MyCourseContextMenu";
import { Card, CardContent } from "@/components/shadcn/Card";

const MyCourseCard = ({
	course,
}: {
	course: TopicPopulateTopicCollectionPopulateCollectionModel;
}) => {
	const navigate = useNavigate();
	const [mouseOver, setMouseOver] = useState(false);

	return (
		<MyCourseContextMenu course={course}>
			<Card
				onMouseDown={(e) =>
					onMiddleClickOpenInNewTab(
						e,
						`/my/courses/${course.topic_id}/edit`
					)
				}
				onClick={() => navigate(`/my/courses/${course.topic_id}/edit`)}
				onMouseOver={() => setMouseOver(true)}
				onMouseOut={() => setMouseOver(false)}
				className={`pt-6 px-5 cursor-pointer ${
					mouseOver ? "border-green-500 bg-green-100" : ""
				}`}
			>
				{/* <div className="flex">
				<img src={`${BASE_URL}${course.image_url}`} className="h-40" /> */}

				<CardContent className="w-5/6">
					<div className="flex items-center font-bold mb-2">
						<LibraryBig className="text-purple-400 mr-2" />
						{mouseOver ? (
							<h1 className="text-green-600">{course.name}</h1>
						) : (
							course.name
						)}
					</div>
					<div className="flex text-sm font-medium items-stretch">
						<div className="w-1/6 self-end grid gap-y-2">
							<div>
								<p className="">Lasted Updated</p>
								<p className="text-gray-400">
									{readableDateFormat(course.updated_date)}
								</p>
							</div>
							<div>
								<p className="">Created Date</p>
								<p className="text-gray-400">
									{readableDateFormat(course.created_date)}
								</p>
							</div>
						</div>

						<div className="w-2/6 grid gap-y-2">
							<div>
								<p className="">Visibility</p>
								<p className="text-gray-400">Public</p>
							</div>
						</div>

						<div className="w-1/6 self-center">
							<p className="flex items-center">
								<Folder className="text-yellow-400 mr-2" />
								Collections ({course.collections.length})
							</p>
						</div>
					</div>
				</CardContent>
				{/* </div> */}
			</Card>
		</MyCourseContextMenu>
	);
};

export default MyCourseCard;
