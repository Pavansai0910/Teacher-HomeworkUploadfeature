import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getJwtToken() {
    return await AsyncStorage.getItem('jwtToken');
}

export const getStudentProfile = async () => {
        const studentProfileString = await AsyncStorage.getItem('studentProfile');
        const studentProfile = JSON.parse(studentProfileString);
        return studentProfile
    }