import React, {useEffect, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LearningNavbar from "./LearningNavbar";
import axios from "axios";

function TestAnalytics() {

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
     try {
       const response = await axios.get(`https://hyggex-backend-school-platform-dev-271594907587.us-central1.run.app/api/v1/teacher/get-analyzed-performance-for-learningObjective?classId=68c2ccc4a656eac077013658&sectionId=68c2cd62a656eac077013696&subjectId=68c2ccdea656eac077013662&chapterId=684a6915be27214d0ed0a97c&topicId=684a6915be27214d0ed0a97d&boardId=68c2cc5ea656eac077013555`)
       console.log(response.data)    

     } catch (error) {
        
     }
    }

    return (
        <SafeAreaView>
            <LearningNavbar />

        </SafeAreaView>

    )
}

export default TestAnalytics;