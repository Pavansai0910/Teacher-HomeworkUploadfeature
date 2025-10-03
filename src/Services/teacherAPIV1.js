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
  console.log({classId, subjectId, boardId});
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

export const versionChecker = async ({ teacherId, versionNumber,newdownloaded}) => {
  const headers = await getAuthHeader();
  const requestBody = { versionNumber,newdownloaded };
  return apiConnector("POST", `/v2/teacher/teacher-app-version-update/${teacherId}`, requestBody, headers);
};

export const teacherLoginEvent = async ({teacherId, classId, subjectId, sectionId}) => {
    const headers = await getAuthHeader()
    const requestBody = {classId, subjectId, sectionId}
    return apiConnector('POST', `/v2/teacher/login-event-for-teacher/${teacherId}`, requestBody, headers)
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

export const getExamsByClassAndSubject = async ({
  classId,
  subjectId,
  sectionId,
  teacherId,
  chapterId,
  boardId,
}) => {
  const headers = await getAuthHeader();
  return apiConnector(
    "GET",
    `/v1/teacher/get-question-paper?classId=${classId}&subjectId=${subjectId}&sectionId=${sectionId}&teacherId=${teacherId}&chapterId=${chapterId}&boardId=${boardId}`,
    null,
    headers
  );
};

export const assignExam = async ({
  teacherId,
  classIds,
  subjectIds,
  chapterId,
  questionPaperIds,
  sectionIds,
  deadline,
  boardId,
}) => {
  const headers = await getAuthHeader();
  const requestBody = {
    teacherId,
    classIds,
    subjectIds,
    chapterId,
    questionPaperIds,
    sectionIds,
    deadline,
    boardId,
  };
  return apiConnector("POST", "/v1/exam/create-exam", requestBody, headers);
};

export const getAllStudents = async ({
  sectionId,
  classId,
  schoolId,
  subjectId,
}) => {
  const headers = await getAuthHeader();
  const requestBody = { sectionId, classId, schoolId, subjectId };
  return apiConnector(
    "POST",
    "/v1/teacher/get-students-of-particular-section",
    requestBody,
    headers
  );
};

export const downloadExam = async ({ questionPaperCode }) => {
  const headers = await getAuthHeader();
  return apiConnector(
    "GET",
    `/v1/teacher/get-question-paper-with-question-paper-code/${questionPaperCode}`,
    null,
    headers,
    {},
    "blob"
  );
};