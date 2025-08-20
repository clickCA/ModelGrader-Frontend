import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { FileCheck, FileSpreadsheet, Folder } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TopicModel } from '@/types/models/Topic.model';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
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
} from '../ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const CourseNavSidebar2 = ({
  course,
  recentOpenCollection = [],
  onChange = () => {},
}: {
  course: TopicModel;
  recentOpenCollection?: string[];
  onChange?: (id: string, isOpen: boolean) => void;
}) => {
  const navigate = useNavigate();

  const handleOpenChange = (open: boolean, collectionId: string) => {
    onChange(collectionId, open);
  };

  const goToProblemView = (problemId: string) => {
    navigate(`/courses/${course.topic_id}/problems/${problemId}`);
    window.location.reload();
  };

  return (
    <Sidebar className="mt-10">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <div className="text-base font-bold">{course?.name}</div>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Collections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {course?.collections?.map((collection) => (
                <Collapsible
                  onOpenChange={(open) => handleOpenChange(open, collection.collection?.collection_id)}
                  defaultOpen={recentOpenCollection.includes(collection.collection?.collection_id)}
                  className="group/collapsible">
                  <SidebarMenuItem key="1">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="py-6">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="flex items-center w-full ">
                              <Folder size={16} className="mr-2 text-yellow-400 flex-shrink-0" />
                              <span className="font-semibold line-clamp-1 min-w-0 overflow-ellipsis">
                                {collection.collection?.name}
                              </span>
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{collection.collection?.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {collection.collection?.problems?.length && collection.collection?.problems?.length > 0 ? (
                          collection.collection?.problems?.map((problem) => (
                            <SidebarMenuButton
                              onClick={() => goToProblemView(problem.problem?.problem_id)}
                              key={problem.problem?.problem_id}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="flex items-center my-1">
                                    <span>
                                      {problem.problem?.best_submission?.is_passed ? (
                                        <FileCheck size={18} className="text-green-500 mr-2" />
                                      ) : (
                                        <FileSpreadsheet size={18} className="text-blue-400 mr-2" />
                                      )}
                                    </span>
                                    <span className="font-mono text-xs line-clamp-1 overflow-ellipsis">
                                      {problem.problem?.title}
                                    </span>
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <span>{problem.problem?.title}</span>
                                </TooltipContent>
                              </Tooltip>
                            </SidebarMenuButton>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500 italic">Empty</span>
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
