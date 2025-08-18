import { FileCheck, FileSpreadsheet, Folder } from "lucide-react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseNavSidebarContext } from "../contexts/CourseNavSidebarContexnt";
import { ProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel } from "@/types/models/Problem.model";
import { TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel } from "@/types/models/Topic.model";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./shadcn/Accordion";
import { Tooltip, TooltipContent, TooltipTrigger } from "./shadcn/Tooltip";
import { onMiddleClickOpenInNewTab } from "@/utilities/OnMiddleClickOpenInNewTab";

const NavbarCollectionProblemCard = ({
	problem
}:{
	problem: ProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel
}) => {

	const {courseId,problemId} = useParams()

	const navigate = useNavigate()

	const backgroundCustomStyle = () => {
		let result = "flex text-base items-center p-1 rounded cursor-pointer "
		if (problem.best_submission?.is_passed) {
			result += "hover:bg-green-100 "
		}
		else {
			result += "hover:bg-blue-100 "
		}

		if (problem.problem_id === String(problemId)) {
			if (problem.best_submission?.is_passed) {
				result += "bg-green-100 "
			}
			else {
				result += "bg-blue-100 "
			}
		}
		return result
	}

	return (
		<div 
		onMouseDown={(e) => onMiddleClickOpenInNewTab(e,`/courses/${courseId}/problems/${problem.problem_id}`)}
		onClick={() => {
			navigate(`/courses/${courseId}/problems/${problem.problem_id}`)
			window.location.reload()
		}} className={backgroundCustomStyle()}>
			{problem.best_submission?.is_passed ? <FileCheck size={18} className="text-green-500 mr-2"/> : <FileSpreadsheet size={18} className="text-blue-400 mr-2" />}
			<p className="w-5/6 line-clamp-1 text-left font-mono">{problem.title}</p>
		</div>
	);
};

const NavbarCollectionsProblemsAccordion = ({
	collections,
}: {
	collections: TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel[];
}) => {

	const {
        recentOpenCollection,
        setRecentOpenCollection
    } = useContext(CourseNavSidebarContext)

	const handleAccordionTrigger = (index:number) => {
		if (recentOpenCollection.length > 0 && recentOpenCollection.includes(String(index))) {
			setRecentOpenCollection(recentOpenCollection.filter((value) => value !== String(index)))
		}
		else {
			setRecentOpenCollection([...recentOpenCollection,String(index)])
		}
	}

	// useEffect(() => {
	// 	const recentOpenStorage = localStorage.getItem("recent_open_collection")
	// 	console.log(recentOpenStorage)

	// 	if (recentOpenStorage) {
	// 		setRecentOpenCollection(JSON.parse(String(recentOpenStorage)))
	// 	}
	// },[])

	// useEffect(()=>{
	// 	localStorage.setItem("recent_open_collection",JSON.stringify(recentOpenCollection))
	// },[recentOpenCollection])

	return (
		<Accordion type="multiple" value={recentOpenCollection}>
			{collections?.map((topicCollection,index) => (
				<AccordionItem value={String(index)} className="">
					<AccordionTrigger onClick={() => handleAccordionTrigger(index)} className="py-0 p-3">
						<Tooltip>
							<TooltipTrigger>
							<div className="flex items-center text-base">
							<Folder
								size={18}
								className="text-yellow-400 mr-2"
							/>
							<p className="w-5/6 line-clamp-1 text-left">{topicCollection.collection.name}</p>
						</div>
							</TooltipTrigger>
							<TooltipContent>
								{topicCollection.collection.name}
							</TooltipContent>
						</Tooltip>
					</AccordionTrigger>
					<AccordionContent>
						<div className="ml-5 w-[80%] grid gap-y-1">
							{topicCollection.collection.problems.map((collectionProblem) => (

								<NavbarCollectionProblemCard problem={collectionProblem.problem}/>
							))}
							
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
};

export default NavbarCollectionsProblemsAccordion;
