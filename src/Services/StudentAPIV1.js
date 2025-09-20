import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiConnector } from "./Operations/apiconnector";
const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem('studentToken');
  return {
    Authorization: `Bearer ${token}`
  };
};

// student subjects
export const getStudentSubjects = async ({studentId}) => {
    const headers = await getAuthHeader();
    return apiConnector('GET',`/v1/student/get-students-subjects/${studentId}`,null,headers)
}

export const getChapters = async ({ classId, subjectId, boardId}) => {
        const headers = await getAuthHeader();
    return apiConnector('GET', `/v1/teacher/get-chapters?subjectId=${subjectId}&classId=${classId}&boardId=${boardId}`,null, headers)
}

// student topic wise performance
export const getStudentsTopicWisePerformance = async ({studentId,classId,subjectId,chapterId, boardId}) => {
        const headers = await getAuthHeader();
    return apiConnector('GET',`/v1/student/get-students-topic-wise-performance/${studentId}?classId=${classId}&subjectId=${subjectId}&chapterId=${chapterId}&boardId=${boardId}`,null, headers)
}

// lga score
export const getLgaScore = async ({ studentId }) => {
        const headers = await getAuthHeader();
    return apiConnector('GET',`/v1/student/tests-total/${studentId}`,null, headers)
}

// selfAware percentage
export const getSelfAwarePercentage = async ({ studentId }) => {
        const headers = await getAuthHeader();
    return apiConnector('GET',`/v1/student/self-aware-completion/${studentId}`,null, headers)
}

//improvement plan
export const getStudentTasks = async ({studentId}) => {
            const headers = await getAuthHeader();
    return apiConnector('GET',`/v1/student/get-student-tasks/${studentId}`,null,headers)
}

//v1/student-tests/lga-zone route apis
export const getAllAssignedExam = async ({studentId,subjectId, page, limit}) => {
    const headers = await getAuthHeader();
    return apiConnector('GET',`/v1/student/get-assigned-exams-for-student/${studentId}/${subjectId}?page=${page}&limit=${limit}`,null,headers)
}

//v1/student/exam/:id route apis
export const getExamById = async ({examId}) => {
    const headers = await getAuthHeader();
    return apiConnector('GET',`/v1/exam/get-exam-with-id/${examId}`,null,headers)
}

export const submitExam = async (payload,examId) => {
    const headers = await getAuthHeader();
    return apiConnector('POST',`/v1/student/exam/${examId}/submit`,payload,headers)
}


//self-aware route used in both side of teacher and student
export const getSelfAwareExams = async ({studentId}) => {
        const headers = await getAuthHeader();
    return apiConnector('GET',`/v1/student/get-self-aware-test-status/${studentId}`,null,headers)
}

export const getSelfAwareExambyId = async ({examId}) => {
    const headers = await getAuthHeader();
    return apiConnector('GET', `/v1/student/get-self-aware-test/${examId}`,null,headers)
}


export const submitSelfAwareExam = async (payload) => {
    const headers = await getAuthHeader();
    return apiConnector('POST','/v1/student/submit-self-aware-test',payload,headers)
}

// used in both
export const getSelfAwareResult = async ({studentId,examId}) => {
        const headers = await getAuthHeader();
    return apiConnector('GET',`/v1/student/get-self-aware-test-result/${studentId}/${examId}`,null, headers)
}

// used in teachers
export const downloadExamForStudents = async ({examCode}) => {
        const headers = await getAuthHeader();
    return apiConnector('GET',`/v1/teacher/download-question-paper/${examCode}`, null, headers, {}, 'blob')
}

export const createTimetable = async ({studentId}) => {
    const headers = await getAuthHeader();
    return apiConnector('POST',`/v1/student/create-time-table/${studentId}`,null, headers)
}

// student/get-student-zone-counts
export const getSubtopicMilestones = async ({ studentId }) => {
    const headers = await getAuthHeader();
    return apiConnector('GET', `/v1/student/get-student-zone-counts/${studentId}`,null, headers)
}

export const changeStudentPassword = async({ studentId, newPassword }) => {
    const headers = await getAuthHeader()
  const body = { newPassword };
  return apiConnector('POST', `/v1/auth/change-password/${studentId}/student`, body, headers);
};

// /recent-unattempted/:studentId
export const unattemptedExam = async({ studentId }) => {
    const headers = await getAuthHeader()
  return apiConnector('GET', `/v1/student/get-recent-attempted/${studentId}`, null, headers);
};

export const updateStudentOnboarding = async ({ studentId}) => {
        const headers = await getAuthHeader();
    const requestBody = { "count": true }
    return apiConnector('POST', `/v1/student/update-student-count/${studentId}`,requestBody,  headers)
}

export const studentLoginEvent = async ({studentId}) => {
    const headers = await getAuthHeader()
    return apiConnector('POST', `/v1/student/login-event-for-student/${studentId}`, null, headers)
}

export const testReport = async ({ description, studentId, examId }) => {
  const headers = await getAuthHeader();
  const requestBody = description;
  return apiConnector("POST",`/v1/student/lga-report/${studentId}/${examId}`,requestBody,headers);
};

export const lgaLog = async ({ studentId, examId, schoolId, questionpaperId}) => {
  const headers = await getAuthHeader();
  const requestBody = { studentId, examId, schoolId, questionpaperId };
  return apiConnector("POST", `/v1/student/lga-log-entries`, requestBody, headers);
};