import { apiConnector } from "./apiconnector";
import { notesEndpoints, updateGraphStatsEndpoints } from "../apis";

import getJwtToken from "../../Utils/getJwtToken";

const {
    FETCH_NOTES_CLASS_SUBJECTS_API,
    FETCH_NOTES_CHAPTERS_API,
    FETCH_NOTES_DATA,
    UPDATE_NOTES_PROGRESS,
    MODIFY_PROGRESS
} = notesEndpoints;

const {
    UPDATE_NOTES_GRAPH_STATS_API,
} = updateGraphStatsEndpoints;

export const fetchNotesChapters = async (classSubjectId) => {
    let result = null;

    try {
        const token = await getJwtToken();
        const headers = { 'Authorization': `Bearer ${token}` };
        const response = await apiConnector("GET", `${FETCH_NOTES_CHAPTERS_API}/${classSubjectId}`, null, headers);
        result = response.data;
    } catch (error) {
        console.error("Error occured while fetching chapters data....");
        if (error.response)
            result = error.response.data;
    }
    return result;
}
    
export const fetchNotesForChapter = async (chapterId) => {
    let result = null; 
        try {
            const token = await getJwtToken();
            const headers = { 'Authorization': `Bearer ${token}` };
            const response = await apiConnector("GET", `${FETCH_NOTES_DATA}/${chapterId}`, null, headers);

            dispatch(setNotesData(response.data.data));
            dispatch(setCompletedTopicsIndexArr(response.data.progress));

        } catch (error) {
            console.error("Error occured while fetching enrollment data....");  
    }
    return result
}


export const updateNotesProgress = async (chapterId, topicIndex) => {
let result = null;
        try {
            const token = await getJwtToken();
            const headers = { 'Authorization': `Bearer ${token}` };
            const response = await apiConnector("GET", `${UPDATE_NOTES_PROGRESS}/${chapterId}/${topicIndex}`, null, headers);
           result = response.data
        } catch (error) {
            console.error("Error occured while updating notes progress....");
        }
        return result
    }


export const updateTimeSpent = async (time) => {
    try {
        const token = await getJwtToken();
        const headers = { 'Authorization': `Bearer ${token}` };
        await apiConnector("GET", `${UPDATE_NOTES_GRAPH_STATS_API}/${time}`, null, headers);
    } catch (error) {
        console.error("Failed to update time spent....");
        if (error.response)
            console.error("ERROR RESPONSE >> ", error.response.data)
    }
}

export const modifyNotes = async (bodyData) => {
    let result = null;

    try {
        const token = await getJwtToken();
        const headers = { 'Authorization': `Bearer ${token}` };
        const response = await apiConnector("POST", `${MODIFY_PROGRESS}`, bodyData, headers);
        if(response?.data?.success){
            result = response.data;
        }
    } catch (error) {
        console.error("Error occured while fetching chapters data....");
        if (error.response)
            result = error.response.data;
    }
    return result;
}