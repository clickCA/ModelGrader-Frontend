import { TestcaseModel } from "@/types/models/Problem.model";

export function checkRuntimeStatus(testcases: TestcaseModel[]):boolean {
	for (const testcase of testcases) {
		if (testcase.runtime_status !== "OK") {
			return false;
		}
	}
	return true;
};