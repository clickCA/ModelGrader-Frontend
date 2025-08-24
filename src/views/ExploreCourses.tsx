import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Separator } from "../components/shadcn/Seperator";
import NavbarMenuLayout from "../layout/NavbarMenuLayout";
import { TopicService } from "../services/Topic.service";
import CourseLayout from "../layout/CourseLayout";

const ExploreCourses = () => {
  const accountId = String(localStorage.getItem("account_id"));
  const { courseId } = useParams();

  useEffect(() => {
    TopicService.getPublicByAccount(accountId, String(courseId)).then(
      (response) => {
        console.log(response.data);
      }
    );
  }, [accountId, courseId]);

  return (
    <CourseLayout>
      <NavbarMenuLayout>
        <div className="mx-auto w-[90%] mt-10">
          <h1 className="text-3xl font-bold">Explore Public Course</h1>
          <div>
            {/* <CardContainer className="w-3/4">
						{problems.map((problem) => (
							<PublicProblemCard problem={problem} />
						))}
					</CardContainer> */}
            <Separator orientation="vertical" />
          </div>
        </div>
      </NavbarMenuLayout>
    </CourseLayout>
  );
};

export default ExploreCourses;
