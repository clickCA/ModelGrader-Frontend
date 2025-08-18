import { useEffect, useState } from "react";
import PublicCourseCard from "../components/Cards/CourseCards/PublicCourseCard";
import SubmissionCard from "../components/Cards/SubmissionCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../components/shadcn/Carousel";
import NavbarMenuLayout from "../layout/NavbarMenuLayout";
import { SubmissionService } from "@/services/Submission.service";
import { TopicService } from "@/services/Topic.service";
import { SubmissionPopulateSubmissionTestcaseAndProblemSecureModel } from "@/types/models/Submission.model";
import { TopicModel } from "@/types/models/Topic.model";

const Dashboard = () => {
	const accountId = String(localStorage.getItem("account_id"));
	const username = localStorage.getItem("username");

	const [previousAttemptedProblems, setPreviousAttemptedProblems] = useState<
		SubmissionPopulateSubmissionTestcaseAndProblemSecureModel[]
	>([]);

	const [accessibleCourses, setAccessibleCourses] = useState<TopicModel[]>(
		[]
	);

	useEffect(() => {
		SubmissionService.getAll({
			account_id: accountId,
			sort_date: 1,
			start: 0,
			end: 10,
		}).then((response) => {
			setPreviousAttemptedProblems(response.data.submissions);
			// console.log(response.data.submissions);
		});

		TopicService.getAllAccessibleByAccount(accountId).then((response) => {
			console.log("result", response.data.topics);
			setAccessibleCourses(response.data.topics);
		});
	}, [accountId]);

	return (
		<NavbarMenuLayout xPad={false}>
			<div className="mt-10 w-[90%] mx-auto">
				<p className="text-4xl font-bold">
					Welcome back,{" "}
					<span className="text-green-600">{username}</span>
				</p>

				<p className="text-3xl font-bold mt-8 mb-3">
					Previous Attempted
				</p>

				<Carousel>
					<CarouselContent>
						{previousAttemptedProblems.map((submission, index) => (
							<CarouselItem className="basis-1/4">
								<SubmissionCard
									key={index}
									submission={submission}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselNext />
					<CarouselPrevious />
				</Carousel>

				{/* <div className="grid grid-cols-4 gap-4">
					{previousAttemptedProblems.map((submission, index) => (
						<SubmissionCard key={index} submission={submission} />
					))}
				</div> */}

				<p className="text-3xl font-bold mt-8 mb-3">Courses</p>
				<Carousel>
					<CarouselContent>
						{accessibleCourses.map((course,index) => (
						<CarouselItem className="basis-1/4">
							<PublicCourseCard key={index} course={course} />
						</CarouselItem>
					))}
					</CarouselContent>
					<CarouselNext />
					<CarouselPrevious />
				</Carousel>
				
			</div>
		</NavbarMenuLayout>
	);
};

export default Dashboard;
