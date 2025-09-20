import { apiConnector } from "./Operations/apiconnector"
export const loginStudent = (credentials) => {
    return apiConnector('POST', '/v1/auth/login-student', credentials)
}
