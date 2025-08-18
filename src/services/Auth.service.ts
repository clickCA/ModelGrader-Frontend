import axios from "axios";
import { AuthServiceAPI } from "@/types/apis/Auth.api";
import { BASE_URL } from "../constants/BackendBaseURL";
import { AccountModel } from "@/types/models/Account.model";
import { AuthenticationResultResponse } from "@/types/models/Auth.model";

export const AuthService: AuthServiceAPI = {
    login: async (request) => {
        const response = await axios.post<AccountModel>(`${BASE_URL}/api/login`, request);
        return response;
    },

    logout: async (request) => {
        const response = await axios.post<AccountModel>(`${BASE_URL}/api/logout`, request);
        return response;
    },

    authorize: async (request) => {
        const response = await axios.put<AuthenticationResultResponse>(`${BASE_URL}/api/token`, request);
        return response;
    }

}