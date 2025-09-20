
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiConnector } from "./Operations/apiconnector";
const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem('studentToken');
  return {
    Authorization: `Bearer ${token}`
  };
};

// Flashcards API

export const getAllFlashcardSubjects = async ({studentId}) => {
    const headers = await getAuthHeader();
    return apiConnector('GET', `/v2/flashcards/get-subjects/${studentId}`,null, headers)
}

export const getChaptersForFlashcards = async ({classId, subjectId, studentId}) => {
    const headers = await getAuthHeader();
    return apiConnector('GET', `/v2/flashcards/get-chapters/${studentId}/${classId}/${subjectId}`,null, headers)
}

export const getFlashcards = async ({classId, subjectId, studentId, chapterId}) => {
    const headers = await getAuthHeader();
    return apiConnector('GET', `/v2/flashcards/get-flashcards/${studentId}/${classId}/${subjectId}/${chapterId}`,null, headers)
}

export const updateFlashcards = async (payload) => {
    const headers = await getAuthHeader();
    return apiConnector('POST', `/v2/flashcards/update-flashcard-progress`, payload, headers)
}

export const getQuiz = async ({classId, subjectId, studentId, chapterId}) => {
    const headers = await getAuthHeader();
    return apiConnector('GET', `/v2/quiz/get-quizzes/${studentId}/${classId}/${subjectId}/${chapterId}`,null, headers)
}

export const updateQuiz = async (payload) => {
    const headers = await getAuthHeader();
    return apiConnector('POST', `/v2/quiz/update-quiz-progress`, payload, headers)
}

// Notes API

export const getAllNotesSubjects = async ({studentId}) => {
    const headers = await getAuthHeader();
    return apiConnector('GET', `/v2/notes/get-subjects/${studentId}`,null, headers)
}

export const    getChaptersForNotes = async ({classId, subjectId, studentId}) => {
    const headers = await getAuthHeader();
    return apiConnector('GET', `/v2/notes/get-chapters/${studentId}/${classId}/${subjectId}`,null, headers)
}

export const getNotes = async ({studentId,classId,subjectId, chapterId}) => {
    const headers = await getAuthHeader();
    return apiConnector('GET', `/v2/notes/get-notes/${studentId}/${classId}/${subjectId}/${chapterId}`,null, headers)
}

export const getNotesIndex = async ({classId, subjectId, chapterId, topicIndex, subtopicIndex}) => {
    const headers = await getAuthHeader();
    return apiConnector('GET', `/v2/notes/get-notes-by-index/${classId}/${subjectId}/${chapterId}/${topicIndex}/${subtopicIndex}`,null, headers)
}

export const getMeaning = async (word) => {
    const headers = await getAuthHeader();
    return apiConnector('POST', `/v2/notes/getmeaning`,word, headers)
}

export const getAnswers = async (question) => {
    const headers = await getAuthHeader();
    return apiConnector('POST', `/v2/notes/get-answer`,question, headers)
}

export const updateNotes = async ({classId, subjectId, chapterId, studentId, notesIndex}) => {
    const payload = {classId, subjectId, chapterId, studentId, notesIndex}
    const headers = await getAuthHeader();
    return apiConnector('POST', `/v2/notes/update-notes-progress`,payload, headers)
}

export const adaptiveTool = async ({studentId, classNumber, topicName, prompt, notesData}) => {
    const payload = {studentId, classNumber, topicName, prompt, notesData}
    const headers = await getAuthHeader();
    return apiConnector('POST', `/v2/notes/modify-notes-data`,payload, headers)
}   

export const getSelfAwareExams = async ({studentId}) => {
        const headers = await getAuthHeader();
    return apiConnector('GET',`/v2/teacher/get-self-aware-tests-status-for-teacher/${studentId}`,null,headers)
}


export const flagQuestion = async ({ questionId, questionPaperId, studentId, reasons }) => {
    const headers = await getAuthHeader();
    return apiConnector('POST', '/v2/flag/flag-question', {
        questionId,
        questionPaperId,
        studentId,
        reasons
    }, headers);
}
