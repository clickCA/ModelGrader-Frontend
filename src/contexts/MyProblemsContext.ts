// import { createContext, useState } from "react"
// import { ProblemPopulateTestcases } from "@/types/models/Problem.model"

// export type MyProblemsContextStateType = {
//     problems: ProblemPopulateTestcases[]
// }

// const iMyProblemsContextState: MyProblemsContextStateType = {
//     problems: []
// }

// export const getMyProblemsContextStateValue = ():MyProblemsContextStateType => {
//     const [problems, setProblems] = useState<ProblemPopulateTestcases[]>([]);

//     return {
//         problems
//     }
// }

// export const MyProblemsContext = createContext<MyProblemsContextStateType>(iMyProblemsContextState);