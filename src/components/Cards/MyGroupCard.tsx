import { User, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GroupPopulateGroupMemberPopulateAccountSecureModel } from "@/types/models/Group.model";
import { onMiddleClickOpenInNewTab } from "@/utilities/OnMiddleClickOpenInNewTab";
import { readableDateFormat } from "@/utilities/ReadableDateFormat";
import { Card, CardContent } from "../shadcn/Card";

const MyGroupCard = ({
    group
}: {
    group: GroupPopulateGroupMemberPopulateAccountSecureModel;
}) => {
	const navigate = useNavigate();
	const [mouseOver, setMouseOver] = useState(false);

	

	return (
		<Card
			onMouseDown={(e) => onMiddleClickOpenInNewTab(e,`/my/groups/${group?.group_id}/edit`)}
			onMouseOver={() => setMouseOver(true)}
			onMouseOut={() => setMouseOver(false)}
			className={`pt-6 px-5 cursor-pointer ${
				mouseOver ? "border-green-500 bg-green-100" : ""
			}`}
			onClick={() => navigate(`/my/groups/${group?.group_id}/edit`)}
		>
			<CardContent>
				<div className="flex items-center font-bold mb-2">
					{group && group.color && <Users style={{
						color: group.color
					}} className={`mr-2`} />}
					{mouseOver ? (
						<h1 className="text-green-600">{group?.name}</h1>
					) : (
						group?.name
					)}
				</div>

				<div className="flex text-sm font-medium items-stretch">
					<div className="w-1/6 self-end grid gap-y-2">
						<div>
							<p className="">Lasted Updated</p>
							<p className="text-gray-400">
								
								{readableDateFormat(group?.updated_date)}
							</p>
						</div>
						<div>
							<p className="">Created Date</p>
							<p className="text-gray-400">
								
								{readableDateFormat(group?.created_date)}
							</p>
						</div>
					</div>

					<div className="w-1/6 self-center">
						<p className="flex items-center">
							<User className="text-yellow-400 mr-2" />
							Members ({group?.members?.length})
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default MyGroupCard;
