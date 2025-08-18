import { LibraryBig, StepForward } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TopicModel } from "@/types/models/Topic.model";
import { Button } from "../../shadcn/Button";
import { Card } from "../../shadcn/Card";

const PublicCourseCard = ({ course }: { course: TopicModel }) => {
    
	const navigate = useNavigate();

	return (
		<Card className="p-6">
			<div className="flex items-start font-bold text-xl">
				<LibraryBig size={30} className="mr-2 text-purple-400" />
				<p className="line-clamp-2 w-11/12 h-[6ex]">{course?.name}</p>
			</div>

			<div className="mt-3 flex justify-end">
				<Button onClick={() => navigate(`/courses/${course.topic_id}`)}>
					<StepForward className="mr-2" />
					Continue
				</Button>
			</div>
		</Card>
	);
};

export default PublicCourseCard;
