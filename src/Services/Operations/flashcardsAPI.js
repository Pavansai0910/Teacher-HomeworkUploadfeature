import Toast from 'react-native-toast-message';
import { apiConnector } from "./apiconnector";
import { flashcardsEndpoints, updateGraphStatsEndpoints } from "../apis";
import getJwtToken from "../../Utils/getJwtToken";

const {
    FETCH_FLASHCARDS_CLASS_SUBJECTS_API,
    FETCH_FLASHCARD_CHAPTERS_API,
    FETCH_FLASHCARD_DATA_API,
    FETCH_QUIZ_DATA_API,
    UPDATE_FLASHCARD_PROGRESS,
    UPDATE_QUIZ_PROGRESS
} = flashcardsEndpoints;

const {
    UPDATE_FLASHCARDS_GRAPH_STATS_API,
} = updateGraphStatsEndpoints;

export const fetchFlashcardSubjectsForClass = async () => {
    let result = null;

    try {
        const token = await getJwtToken();
        const headers = { 'Authorization': `Bearer ${token}` };
        const response = await apiConnector("GET", `${FETCH_FLASHCARDS_CLASS_SUBJECTS_API}`, null, headers);
        result = response.data;
    } catch (error) {
        console.error("Error occured while fetching enrollment data....");
        
        if (error.response)
            result = error.response.data;
    }
    return result;
}

export const fetchFlashcardChapters = async (classSubjectId) => {
    let result = null;

    try {
        const token = await getJwtToken();
        const headers = { 'Authorization': `Bearer ${token}` };
        const response = await apiConnector("GET", `${FETCH_FLASHCARD_CHAPTERS_API}/${classSubjectId}`, null, headers);
        result = response.data;
    } catch (error) {
        console.error("Error occured while fetching chapters data....",error);
        
        if (error.response)
            result = error.response.data;
    }
    return result;
}

export const fetchFlashcardData = async (chapterId) => {
    let result = null;

    try {
        const token = await getJwtToken();
        const headers = { 'Authorization': `Bearer ${token}` };
        const response = await apiConnector("GET", `${FETCH_FLASHCARD_DATA_API}/${chapterId}`, null, headers);
        result = response.data;
    } catch (error) {
        console.error("Error occured while fetching flashcard data....");
      
        if (error.response)
            result = error.response.data;
    }
    return result;
}


export const fetchQuizData = async (chapterId) => {
    let result = null;

    try {
        const token = await getJwtToken();
        const headers = { 'Authorization': `Bearer ${token}` };
        const response = await apiConnector("GET", `${FETCH_QUIZ_DATA_API}/${chapterId}`, null, headers);
        result = response.data;

    } catch (error) {
        console.error("Error occured while fetching quiz data....");
      
                if (error.response)
            result = error.response.data;
    }
    return result;
}


export const updateFlashcardProgress = async (chapterId, flashcardIndex) => {
    let result = null;

    try {
        const token = await getJwtToken();
        const headers = { 'Authorization': `Bearer ${token}` };
        const response = await apiConnector("GET", `${UPDATE_FLASHCARD_PROGRESS}/${chapterId}/${flashcardIndex}`, null, headers);
        result = response;
    } catch (error) {
        console.error("Error occured while updating flashcard progress....");
        if (error.response)
            result = error.response.data;
    }
    return result;
}


export const updateQuizProgress = async (chapterId, quizIndex) => {
    let result = null;

    try {
        const token = await getJwtToken();
        const headers = { 'Authorization': `Bearer ${token}` };
        const response = await apiConnector("GET", `${UPDATE_QUIZ_PROGRESS}/${chapterId}/${quizIndex}`, null, headers);
        result = response;
    } catch (error) {
        console.error("Error occured while updating quiz progress....");
        if (error.response)
            result = error.response.data;
    }
    return result;
}

export const updateTimeSpent = async (time) => {
    try {
        const token = await getJwtToken();
        const headers = { 'Authorization': `Bearer ${token}` };
        await apiConnector("GET", `${UPDATE_FLASHCARDS_GRAPH_STATS_API}/${time}`, null, headers);
    } catch (error) {
        console.error("Failed to update time spent....");
        if (error.response)
            console.error("ERROR RESPONSE >> ", error.response.data)
    }
}
