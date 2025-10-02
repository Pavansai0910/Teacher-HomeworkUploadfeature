import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiConnector } from '../Services/Operations/apiconnector';

export const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const getChapters = async ({ classId, subjectId, boardId }) => {
  const headers = await getAuthHeader();
  return apiConnector(
    'GET',
    `/v1/teacher/get-chapters?subjectId=${subjectId}&classId=${classId}&boardId=${boardId}`,
    null,
    headers,
  );
};

export const getAllTopics = async ({
  classId,
  subjectId,
  chapterId,
  boardId,
}) => {
  const headers = await getAuthHeader();
  return apiConnector(
    'GET',
    `/v2/teacher/get-topics?classId=${classId}&subjectId=${subjectId}&chapterId=${chapterId}&boardId=${boardId}`,
    null,
    headers,
  );
};

export const versionChecker = async ({ studentId, versionNumber,newdownloaded}) => {
  const headers = await getAuthHeader();
  const requestBody = { versionNumber,newdownloaded };

  return apiConnector("POST", `/v1/student/student-app-version-update/${studentId}`, requestBody, headers);
};

export const teacherLoginEvent = async ({teacherId}) => {
    const headers = await getAuthHeader()
    return apiConnector('POST', `/v1/teacher/login-event-for-teacher/${teacherId}`, null, headers)
}
export const createLessonPlan = async payload => {
  const headers = await getAuthHeader();
  const requestBody = payload;
  return apiConnector(
    'POST',
    `/v2/teacher/lessonplan/generate`,
    requestBody,
    headers,
  );
};
