import { apiConnector } from "./apiconnector";
import { enrollEndpoints } from "../apis";
import getJwtToken from "../../Utils/getJwtToken";

const {
    GET_ENROLL_CLASS_SUBJECTS_API,
    SUBJECT_ENROLL_API,
    GET_ENROLL_COMPETITIVE_EXAMS,
    COMPETITIVE_EXAM_ENROLLMENT,
} = enrollEndpoints;

export const fetchEnrollmentSubjectsForClass = async (classId, token) => {
    
    let result = null;

    const bodyData = { classId };
    const headerData = { Authorization: `Bearer ${token}` };

    try {
        const response = await apiConnector(
            "POST",
            GET_ENROLL_CLASS_SUBJECTS_API,
            bodyData,
            headerData
        );
    
        
        result = response.data;
    } catch (error) {
        console.error("Error occured while fetching enrollment subjects data....");
        if (error.response) result = error.response.data;
    }
    return result;
};

export const subjectEnrollment = async (classSubjectId, subjectName, token) => {
    let result = null;

    const bodyData = { classSubjectId, subjectName };
    const headerData = { Authorization: `Bearer ${token}` };

    try {
        const response = await apiConnector("POST", SUBJECT_ENROLL_API, bodyData, headerData);
        result = response.data;
    } catch (error) {
        console.error("Error occured while fetching enrollment data....");
        console.error("Enrollment Failed.");
        if (error.response) result = error.response.data;
    }
    return result;
};

export const fetchEnrollmentCompetitiveExams = async (classId) => {
    let result = null;
    try {
        const token = getJwtToken();
        const headers = { Authorization: `Bearer ${token}` };
        const body = { classId };
        const response = await apiConnector(
            "POST",
            `${GET_ENROLL_COMPETITIVE_EXAMS}`,
            body,
            headers
        );
        result = response.data;
    } catch (error) {
        console.error("Error occured while fetching competitive exams data for enrollment....");
        console.error("Error occured while fetching competitive exams data.");
        if (error.response) result = error.response.data;
    }
    return result;
};

export const competitiveExamEnrollment = async (competitiveExamId) => {
    let result = null;
    try {
        const token = getJwtToken();
        const headers = { Authorization: `Bearer ${token}` };
        const body = { competitiveExamId };
        const response = await apiConnector(
            "POST",
            `${COMPETITIVE_EXAM_ENROLLMENT}`,
            body,
            headers
        );
        result = response.data;
    } catch (error) {
        console.error("Error occured while fetching competitive exams data for enrollment....");
        console.error("Error occured while fetching competitive exams data.");
        if (error.response) result = error.response.data;
    }
    return result;
};
