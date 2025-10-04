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