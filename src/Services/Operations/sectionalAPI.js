import { apiConnector } from "./apiconnector";
import { sectionalEndpoints } from "../apis";
import getJwtToken from "../../Utils/getJwtToken";

const {
  GET_SUBJECTS_AND_CHAPTERS_DATA_FOR_SECTIONAL_TEST,
  GET_SECTIONAL_TEST_QUESTIONS,
  GET_SECTIONAL_TEST_RESULT,
} = sectionalEndpoints;

// Api for fetching sectional subjects and chapters data
export const fetchSectionalSubjectsAndChapters = async () => {
  let result = null;
  try {
    const token = await getJwtToken();
    const headers = { Authorization: `Bearer ${token}` };
    const response = await apiConnector("GET",`${GET_SUBJECTS_AND_CHAPTERS_DATA_FOR_SECTIONAL_TEST}`,null,headers);
    result = response.data.data;
  } catch (error) {
    console.error("Error occured while fetching enrollment data....");
    if (error.response) result = error.response.data;
  }
  return result;
};

// Api for fetching sectional test questions for chapters
export const fetchSectionalTestQuestions = async (chapterId) => {
  let result = null;
  try {
    const token = await getJwtToken();
    const headers = { Authorization: `Bearer ${token}` };
    const body = { chapterId };
    const response = await apiConnector("POST",`${GET_SECTIONAL_TEST_QUESTIONS}`,body,headers);
    result = response.data;
  } catch (error) {
    console.error("Error occured while fetching enrollment data....");
    if (error.response) result = error.response.data;
  }
  return result;
};

// Api for fetching sectional test result
export const fetchSectionalResult = async (chapterId, answerArray, timeTaken, averageTime) => {
  let result = null;
  
  try {
    if(!answerArray || answerArray.length === 0){
      answerArray=null;
    }
    
      const token = await getJwtToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      const body = {chapterId, answerArray, timeTaken, averageTime};
      const response = await apiConnector("POST", `${GET_SECTIONAL_TEST_RESULT}`, body, headers);
      result = response.data;
  } catch (error) {
      console.error("Error occured while fetching enrollment data....");
      if (error.response)
          result = error.response.data;
  }

  return result;
};
