import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { FileText, Folder } from "lucide-react";
import { TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel } from "../../types/models/Topic.model";
import { DropdownMenu } from "../ui/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
} from "../ui/sidebar";

const CourseNavSidebar2 = ({
	course,
	recentOpenCollection = [],
	onChange = () => {},
}: {
	course: TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel;
	recentOpenCollection?: string[];
	onChange?: (id: string, isOpen: boolean) => void;
}) => {

    const handleOpenChange = (open: boolean, collectionId: string) => {
        onChange(collectionId,open)
	};

	return (
		<Sidebar className="mt-10">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<div className="text-base font-bold">
								{course?.name}
							</div>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Collections</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{course?.collections.map((collection) => (
								<Collapsible
                                onOpenChange={(open) => handleOpenChange(open, collection.collection?.collection_id)}
									defaultOpen={recentOpenCollection.includes(
										collection.collection?.collection_id
									)}
									className="group/collapsible"
								>
									<SidebarMenuItem key="1">
										<CollapsibleTrigger asChild>
											<SidebarMenuButton className="py-6">
												<Folder
													size={16}
													className="mr-2 text-yellow-400"
												/>
												<span className="font-semibold">
													{
														collection.collection
															?.name
													}
												</span>
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{collection.collection?.problems.map(
													(problem) => (
														<SidebarMenuButton
															key={
																problem.problem
																	?.problem_id
															}
														>
															<div className="flex items-center my-1">
																<FileText
																	size={16}
																	className="mr-2 text-blue-400"
																/>
																<span>
																	{
																		problem
																			.problem
																			?.title
																	}
																</span>
															</div>
														</SidebarMenuButton>
													)
												)}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};

export default CourseNavSidebar2;
