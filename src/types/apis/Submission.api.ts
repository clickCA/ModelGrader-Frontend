import { AxiosResponse } from "axios";
import { ProblemPopulateAccountSecureModel } from "../models/Problem.model";
import {
	GetSubmissionByAccountProblemResponse,
	SubmissionPopulateSubmissionTestcaseAndAccountModel,
	SubmissionPopulateSubmissionTestcaseAndProblemSecureModel,
	SubmissionPopulateSubmissionTestcasesSecureModel,
	SubmissionTestcaseSecureModel,
} from "../models/Submission.model";
import { Pagination } from "../Pagination.type";
import { Query } from "../Query";

export type SubmitProblemRequest = {
	language: string;
	submission_code: string;
};

export type SubmitProblemResponse = {
	submission_id: string;
	problem: ProblemPopulateAccountSecureModel;
	language: string;
	submission_code: string;
	is_passed: boolean;
	date: string;
	score: number;
	max_score: number;
	passed_ratio: number;
	account: number;
	runtime_output: SubmissionTestcaseSecureModel[];
};

export type GetAllSubmissionsQuery = {
	problem_id?: string;
	account_id?: string;
	passed?: number;
	sort_date?: number;
	sort_score?: number;
	start?: number;
	end?: number;
};

export type GetAllSubmissionsResponse = {
	submissions: SubmissionPopulateSubmissionTestcaseAndProblemSecureModel[];
};

export type GetSubmissionsByCretorProblemResponse = Pagination & {
	submissions: SubmissionPopulateSubmissionTestcaseAndAccountModel[];
};

export type SubmissionServiceAPI = {
	submit: (
		accountId: string,
		problemId: string,
		request: SubmitProblemRequest
	) => Promise<
		AxiosResponse<SubmissionPopulateSubmissionTestcasesSecureModel>
	>;
	topicSubmit: (
		accountId: string,
		topicId: string,
		problemId: string,
		request: SubmitProblemRequest
	) => Promise<
		AxiosResponse<SubmissionPopulateSubmissionTestcasesSecureModel>
	>;
	getByCreatorProblem: (
		accountId: string,
		problemId: string,
		options?: Query
	) => Promise<AxiosResponse<GetSubmissionsByCretorProblemResponse>>;
	getByAccountProblem: (
		accountId: string,
		problemId: string
	) => Promise<AxiosResponse<GetSubmissionByAccountProblemResponse>>;
	getByAccountProblemInTopic: (
		accountId: string,
		problemId: string,
		topicId: string
	) => Promise<AxiosResponse<GetSubmissionByAccountProblemResponse>>;
	getAll: (
		query?: GetAllSubmissionsQuery
	) => Promise<AxiosResponse<GetAllSubmissionsResponse>>;
};
