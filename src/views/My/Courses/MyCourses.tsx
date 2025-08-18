import { LibraryBig } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardContainer from "../../../components/CardContainer";
import MyCourseCard from "../../../components/Cards/CourseCards/MyCourseCard";
import { Button } from "../../../components/shadcn/Button";
import { Input } from "../../../components/shadcn/Input";
import { Tabs, TabsList, TabsTrigger } from "../../../components/shadcn/Tabs";
import { NavSidebarContext } from "../../../contexts/NavSidebarContext";
import NavbarSidebarLayout from "../../../layout/NavbarSidebarLayout";
import { TopicService } from "@/services/Topic.service";
import { TopicPopulateTopicCollectionPopulateCollectionModel } from "@/types/models/Topic.model";
import MyCoursesTable from "../../../components/Tables/MyCoursesTable";

const MyCourses = () => {

    const navigate = useNavigate();
	const accountId = String(localStorage.getItem("account_id"));
    const {setSection} = useContext(NavSidebarContext)

	const [topics, setTopics] = useState<TopicPopulateTopicCollectionPopulateCollectionModel[]>([])
	const [manageableTopics, setManageableTopics] = useState<TopicPopulateTopicCollectionPopulateCollectionModel[]>([])
	
	const [filteredTopics, setFilteredTopics] = useState<TopicPopulateTopicCollectionPopulateCollectionModel[]>([])
	const [filteredManageableTopics, setFilteredManageableTopics] = useState<TopicPopulateTopicCollectionPopulateCollectionModel[]>([])

	const [tabValue, setTabValue] = useState("personal")
	const [searchValue, setSearchValue] = useState("")

	useEffect(() => {
		if (!searchValue || searchValue === "") {
			setFilteredTopics(topics)
			setFilteredManageableTopics(manageableTopics)
		}
		else {
			setFilteredTopics(topics.filter((topic) => topic.name.toLowerCase().includes(searchValue.toLowerCase())))
			setFilteredManageableTopics(manageableTopics.filter((topic) => topic.name.toLowerCase().includes(searchValue.toLowerCase())))
		}
	},[searchValue,topics,manageableTopics])
	

    useEffect(( )=> {
        setSection("COURSES")
		TopicService.getAllAsCreator(accountId).then((response) => {
			setTopics(response.data.topics)
			setManageableTopics(response.data.manageable_topics)
		})
    },[])

	return (
		<NavbarSidebarLayout>
			<div className="w-[96%] mx-auto mt-10">
				<div className="flex justify-between gap">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							My Courses
						</h1>
					</div>
					<div className="xl:w-7/12 w-5/12">
						<Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search ..." />
					</div>
					<div>
						<Tabs value={tabValue} onValueChange={(e) => setTabValue(e)}>
							<TabsList>
								<TabsTrigger value="personal">
									Personal
								</TabsTrigger>
								<TabsTrigger value="manageable">
									Manageable
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>
					<div>
						<Button
							onClick={() => navigate("/my/courses/create")}
						>
							<LibraryBig size={20} className="mr-2" />
							Create Course
						</Button>
					</div>
				</div>

				<CardContainer>
					{
						tabValue === "personal" && <MyCoursesTable courses={filteredTopics}/>
					}
					{
						tabValue === "manageable" && filteredManageableTopics.map(topic => (
							<MyCourseCard course={topic}/>
						))
					}
				</CardContainer>
			</div>
		</NavbarSidebarLayout>
	);
};

export default MyCourses;
