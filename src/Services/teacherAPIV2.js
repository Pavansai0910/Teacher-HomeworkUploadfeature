import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiConnector } from '../Services/Operations/apiconnector';

export const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const saveLessonPlan = async (payload, boardId) => {
const headers = await getAuthHeader()
    const requestBody = payload
    return apiConnector('POST', `/v2/teacher/lessonplan/save?boardId=${boardId}`, requestBody, headers)
}

// LessonPlan/history
export const getGeneratedLessonPlan  = async ({ teacherId }) => {
    const headers = await getAuthHeader()
    return apiConnector('GET', `/v2/teacher/get-generated-lesson-plans/${teacherId}`, null, headers)
}

export const getAllLessonPlans = async ({ lessonPlanId }) => {
    const headers = await getAuthHeader()
    return apiConnector('GET', `/v2/teacher/get-content-of-lesson-plan/${lessonPlanId}`, null, headers)
}

// get-pdf-for-lesson-plan/:_id

export const downloadLessonPlan = async ({_id}) => {
        const headers = await getAuthHeader();
    return apiConnector('GET',`/v2/teacher/get-pdf-for-lesson-plan/${_id}`, null, headers, {}, 'blob')
}
