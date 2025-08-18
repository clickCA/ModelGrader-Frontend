import { createContext, useState } from "react";
import { TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel } from "@/types/models/Topic.model";

export type CourseNavSidebarContextType = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    section: string;
    setSection: React.Dispatch<React.SetStateAction<string>>;
    course?: TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel
    setCourse: React.Dispatch<React.SetStateAction<TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel | undefined>>;
    recentOpenCollection: string[];
    setRecentOpenCollection: React.Dispatch<React.SetStateAction<string[]>>;
}

const iCourseNavSidebarContextState: CourseNavSidebarContextType = {
    isOpen: true,
    setIsOpen: () => {},
    section: "",
    setSection: () => {},
    course: undefined,
    setCourse: () => {},
    recentOpenCollection: [],
    setRecentOpenCollection: () => {}
}

export const getCourseNavSidebarContextStateValue = ():CourseNavSidebarContextType => {
    const [course, setCourse] = useState<TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel>();
	const [isOpen, setIsOpen] = useState(false);
	const [section, setSection] = useState("");
    const [recentOpenCollection, setRecentOpenCollection] = useState<string[]>([]);

    return {
        course,
        setCourse,
        isOpen,
        setIsOpen,
        section,
        setSection,
        recentOpenCollection,
        setRecentOpenCollection
    }
}

export const CourseNavSidebarContext = createContext<CourseNavSidebarContextType>(iCourseNavSidebarContextState);