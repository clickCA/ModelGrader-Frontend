import { Check, FileCheck, Folder } from "lucide-react";
import { CollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel } from "@/types/models/Collection.model";
import { handleDeprecatedDescription } from "@/utilities/HandleDeprecatedDescription";
import ReadOnlyPlate from "../../ReadOnlyPlate";
import PublicProblemsTable from "../../Tables/ProblemTables/PublicProblemsTable";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/shadcn/Accordion";
import { Badge } from "@/components/shadcn/Badge";
import { Card } from "@/components/shadcn/Card";

const isPassed = (collection: CollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel):boolean => {
	return collection.problems.filter(
		(collectionProblem) =>
			collectionProblem.problem.best_submission
				?.is_passed
	).length === collection.problems.length
}
const TopicCollectionAccordianCard = ({
	collection,
}: {
	collection: CollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel;
}) => {
	return (
		<Card className="px-5 cursor-pointer">
			<Accordion type="multiple" className="">
				<AccordionItem value="1" className="border-none">
					<AccordionTrigger className="flex items-center">
						<div className="flex items-center w-6/12">
							<Folder className="text-yellow-400 mr-2" />
							{collection.name}
						</div>

						<div className="flex text-base items-center font-mono w-4/12">
							<FileCheck
								size={20}
								className="text-green-600 mr-2"
							/>
							<div className={isPassed(collection) ? "text-green-600 font-bold" : ""}>
								(
								{
									collection.problems.filter(
										(collectionProblem) =>
											collectionProblem.problem
												.best_submission?.is_passed
									).length
								}
								/{collection.problems.length})
							</div>
						</div>

						<div className="w-2/12">
							{isPassed(collection) && (
								<Badge>
									<Check className="mr-2" size={18} />
									Completed
								</Badge>
							)}
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<ReadOnlyPlate
							value={JSON.parse(handleDeprecatedDescription(String(collection.description)))}
						/>

						<PublicProblemsTable
							problems={collection.problems.map(
								(collectionProblem) =>
									collectionProblem.problem
							)}
						/>

						{/* <ScrollArea className="mt-6 pr-5">
							<div className="grid gap-y-2">
								{collection.problems.map((problem) => (
									<PublicProblemMiniCard
										problem={problem.problem}
									/>
								))}
							</div>
						</ScrollArea> */}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</Card>
	);
};

export default TopicCollectionAccordianCard;
