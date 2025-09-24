import { apiConnector } from "./Operations/apiconnector"
export const loginTeacher = (credentials) => {
    return apiConnector('POST', '/v1/auth/login-teacher', credentials)
}
