import { LibraryBig } from "lucide-react";
import { useContext } from "react";
import TopicCollectionAccordionCard from "../components/Cards/CollectionCards/TopicCollectionAccordionCard";
import ReadOnlyPlate from "../components/ReadOnlyPlate";
import { ScrollArea } from "../components/shadcn/ScrollArea";
import { CourseNavSidebarContext } from "../contexts/CourseNavSidebarContexnt";
import CourseNavbarSidebarLayout from "../layout/CourseNavbarSidebarLayout";
import { handleDeprecatedDescription } from "../utilities/HandleDeprecatedDescription";
import CourseLayout from "../layout/CourseLayout";

const ViewCourse = () => {
  const { course } = useContext(CourseNavSidebarContext);

  return (
    <CourseLayout>
      <CourseNavbarSidebarLayout>
        <div className="mt-10 mx-auto w-[95%]">
          <h1 className="text-3xl font-bold flex items-center">
            <LibraryBig size={36} className="text-purple-400 mr-2" />
            {course?.name}
          </h1>
          {course && (
            <ReadOnlyPlate
              value={JSON.parse(
                handleDeprecatedDescription(String(course.description))
              )}
            />
          )}

          <ScrollArea className="h-[70vh]">
            <div className="grid gap-y-2">
              {course?.collections?.map((tc) => (
                <TopicCollectionAccordionCard collection={tc.collection} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </CourseNavbarSidebarLayout>
    </CourseLayout>
  );
};

export default ViewCourse;
