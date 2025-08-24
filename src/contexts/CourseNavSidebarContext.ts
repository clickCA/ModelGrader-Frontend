import { createContext, useState } from "react";
import { TopicModel } from "../types/models/Topic.model";

export type CourseNavSidebarContextType = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    section: string;
    setSection: React.Dispatch<React.SetStateAction<string>>;
    course?: TopicModel
    setCourse: React.Dispatch<React.SetStateAction<TopicModel | undefined>>;
    recentOpenCollection: string[];
    setRecentOpenCollection: React.Dispatch<React.SetStateAction<string[]>>;
    isOpenSidebar: boolean;
    setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const iCourseNavSidebarContextState: CourseNavSidebarContextType = {
    isOpen: true,
    setIsOpen: () => {},
    section: "",
    setSection: () => {},
    course: undefined,
    setCourse: () => {},
    recentOpenCollection: [],
    setRecentOpenCollection: () => {},
    isOpenSidebar: true,
    setIsOpenSidebar: () => {}
}

export const GetCourseNavSidebarContextStateValue = ():CourseNavSidebarContextType => {
    const [course, setCourse] = useState<TopicModel | undefined>();
	const [isOpen, setIsOpen] = useState(false);
	const [section, setSection] = useState("");
    const [recentOpenCollection, setRecentOpenCollection] = useState<string[]>([]);
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);

    return {
        course,
        setCourse,
        isOpen,
        setIsOpen,
        section,
        setSection,
        recentOpenCollection,
        setRecentOpenCollection,
        isOpenSidebar,
        setIsOpenSidebar
    }
}

export const CourseNavSidebarContext = createContext<CourseNavSidebarContextType>(iCourseNavSidebarContextState);