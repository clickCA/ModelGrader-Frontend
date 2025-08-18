import { AccountSecureModel } from "./Account.model";
import { ProblemModel } from "./Problem.model";
import { TopicModel } from "./Topic.model";

export type GroupModel = {
    group_id: string;
    creator: string;
    name: string;
    description: string | null;
    color: string;
    created_date: string;
    updated_date: string;
    permission_manage_topics: boolean;
    permission_view_topics: boolean;
    permission_view_topics_log: boolean;
    permission_manage_collections: boolean;
    permission_view_collections: boolean;
    permission_manage_problems: boolean;
    permission_view_problems: boolean;
}

export type GroupMemberModel = {
    group_member_id: string;
    group: number;
    account: number;
    created_date: string;
}  

export type GroupMemberPopulateAccountSecureModel = GroupMemberModel & {
    account: AccountSecureModel;
}

export type GroupPopulateGroupMemberPopulateAccountSecureModel = GroupModel & {
    members: GroupMemberPopulateAccountSecureModel[]
}

export type GroupHashedTable = {
    [id:string]: GroupModel | GroupPopulateGroupMemberPopulateAccountSecureModel
}

export type TopicGroupPermissionModel = {
    topic_group_permission_id: string
    group: GroupModel
    permission_manage_topics: boolean
    permission_view_topics: boolean
    permission_view_topics_log: boolean
    topic: TopicModel
}

export type ProblemGroupPermissionModel = {
    problem_group_permission_id: string
    group: GroupModel
    permission_manage_problems: boolean
    permission_view_problems: boolean
    problem: ProblemModel
}

export type TopicGroupPermissionPopulateGroupModel = TopicGroupPermissionModel & {
    group: GroupModel
}