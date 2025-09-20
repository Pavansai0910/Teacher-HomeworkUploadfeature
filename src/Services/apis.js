import API_URL from "../Constants/API_URL";

const BASE_URL = API_URL

// ENROLL API ENDPOINTS
export const enrollEndpoints = {
    GET_ENROLL_CLASS_SUBJECTS_API: BASE_URL + "/enroll/get-academic-subjects",
    SUBJECT_ENROLL_API: BASE_URL + "/enroll/subject-enrollment",
    GET_ENROLL_COMPETITIVE_EXAMS: BASE_URL + "/enroll/get-competitive-exams/",
    COMPETITIVE_EXAM_ENROLLMENT: BASE_URL + "/enroll/competitive-exam-enrollment",
};

// NOTES API ENDPOINTS
export const notesEndpoints = {
    FETCH_NOTES_CLASS_SUBJECTS_API: BASE_URL + "/note/get-subjects",
    FETCH_NOTES_DATA: BASE_URL + "/note/get-notes",
    FETCH_NOTES_CHAPTERS_API: BASE_URL + "/note/get-chapters", 
    UPDATE_NOTES_PROGRESS: BASE_URL + "/note/update-notes-progress",
    MODIFY_PROGRESS: BASE_URL + "/note/modify-notes-data",
};

// FLASHCARDS API ENDPOINTS
export const flashcardsEndpoints = {
    FETCH_FLASHCARDS_CLASS_SUBJECTS_API: BASE_URL + "/flashcard/get-subjects",
    FETCH_FLASHCARD_CHAPTERS_API: BASE_URL + "/flashcard/get-chapters",
    FETCH_FLASHCARD_DATA_API: BASE_URL + "/flashcard/get-flashcards",
    FETCH_QUIZ_DATA_API: BASE_URL + "/quiz/get-quizzes",
    UPDATE_FLASHCARD_PROGRESS: BASE_URL + "/flashcard/update-flashcard-progress",
    UPDATE_QUIZ_PROGRESS: BASE_URL + "/quiz/update-quiz-progress",
};

// DASHBOARD HOME ENDPOINTS
export const dashboardHomeEndpoints = {
    GET_RECENT_LEARNINGS_API: BASE_URL + "/dashboard/get-recent-learnings",
    GET_GRAPH_STATS_API: BASE_URL + "/dashboard/get-new-graph-stats",
    GET_STRONG_WEAK_API: BASE_URL + "/academic-mock/get-strength-weak-areas",
    GET_SELF_AWARE_STATS_API: BASE_URL + "/self-assessment/get-self-assessment-stats",
};

// UPDATE GRAPH STATS ENDPOINTS
export const updateGraphStatsEndpoints = {
    UPDATE_NOTES_GRAPH_STATS_API: BASE_URL + "/dashboard/update-graph-stats/notes",
    UPDATE_FLASHCARDS_GRAPH_STATS_API: BASE_URL + "/dashboard/update-graph-stats/flashcards",
};

// ACTIVITY ENDPOINTS
export const activityEndpoints = {
    UPDATE_BREATHING_PROGRESS: BASE_URL + "/activity/update-breathing-progress",
};

// SECTIONAL ENDPOINTS
export const sectionalEndpoints = {
    GET_SUBJECTS_AND_CHAPTERS_DATA_FOR_SECTIONAL_TEST:
        BASE_URL + "/sectional/get-subjects-and-chapters",
    GET_SECTIONAL_TEST_QUESTIONS: BASE_URL + "/sectional/get-sectional-test-questions",
    GET_SECTIONAL_TEST_RESULT: BASE_URL + "/sectional/get-sectional-test-result",
};

// SELF AWARE ASSESSMENT ENDPOINTS
export const selfAssessmentEndpoints = {
    GET_SELF_ASSESSMENT_NAMES: BASE_URL + "/self-assessment/get-self-assessment-name",
    GET_SELF_ASSESSMENT_QUESTIONS: BASE_URL + "/self-assessment/get-self-assessment-questions",
    GET_SELF_ASSESSMENT_RESULT: BASE_URL + "/self-assessment/get-self-assessment-result",
};

// COMPETITIVE MOCK ENDPOINTS
export const competitiveMockEndpoints = {
    GET_EXAMS: BASE_URL + "/competitive-mock/get-exams",
    GET_MOCKS: BASE_URL + "/competitive-mock/get-mocks",
    GET_MOCK: BASE_URL + "/competitive-mock/get-mock",
    SUBMIT_MOCK: BASE_URL + "/competitive-mock/submit-mock",
    GET_MOCK_PERCENTAGE: BASE_URL + "/competitive-mock/get-percentage",
    GET_PERFORMANCE_ANALYSIS_MAIN_CONTENT_DATA:
        BASE_URL + "/competitive-mock/get-performance-analysis-main-content-data",
    GET_PERFORMANCE_ANALYSIS_SIDEBAR_DATA:
        BASE_URL + "/competitive-mock/get-performance-analysis-sidebar-data",
    GET_SECTIONWISE_MAIN_CONTENT_DATA:
        BASE_URL + "/competitive-mock/get-sectionwise-main-content-data",
    GET_SECTIONWISE_SIDEBAR_DATA: BASE_URL + "/competitive-mock/get-sectionwise-sidebar-data",
    GET_SECTIONWISE_ANALYSIS_DATA: BASE_URL + "/competitive-mock/get-sectionwise-analysis-data",
    GET_QUESTIONWISE_MAIN_CONTENT_DATA:
        BASE_URL + "/competitive-mock/get-questionwise-main-content-data",
    GET_QUESTIONWISE_SIDEBAR_DATA: BASE_URL + "/competitive-mock/get-questionwise-sidebar-data",
    GET_TIMEANALYSIS_MAIN_CONTENT_DATA:
        BASE_URL + "/competitive-mock/get-timeanalysis-main-content-data",
    GET_TIMEANALYSIS_SIDEBAR_DATA: BASE_URL + "/competitive-mock/get-timeanalysis-sidebar-data",
};

// ACADEMIC MOCK ENDPOINTS
export const academicMockEndpoints = {
    GET_EXAMS: BASE_URL + "/academic-mock/get-exams",
    GET_MOCKS: BASE_URL + "/academic-mock/get-mocks",
    GET_MOCK: BASE_URL + "/academic-mock/get-mock",
    SUBMIT_MOCK: BASE_URL + "/academic-mock/submit-mock",
    GET_MOCK_PERCENTAGE: BASE_URL + "/academic-mock/get-percentage",
    GET_PERFORMANCE_ANALYSIS_MAIN_CONTENT_DATA:
        BASE_URL + "/academic-mock/get-performance-analysis-main-content-data",
    GET_PERFORMANCE_ANALYSIS_SIDEBAR_DATA:
        BASE_URL + "/academic-mock/get-performance-analysis-sidebar-data",
    GET_SECTIONWISE_MAIN_CONTENT_DATA:
        BASE_URL + "/academic-mock/get-sectionwise-main-content-data",
    GET_SECTIONWISE_SIDEBAR_DATA: BASE_URL + "/academic-mock/get-sectionwise-sidebar-data",
    GET_SECTIONWISE_ANALYSIS_DATA: BASE_URL + "/academic-mock/get-sectionwise-analysis-data",
    GET_QUESTIONWISE_MAIN_CONTENT_DATA:
        BASE_URL + "/academic-mock/get-questionwise-main-content-data",
    GET_QUESTIONWISE_SIDEBAR_DATA: BASE_URL + "/academic-mock/get-questionwise-sidebar-data",
    GET_TIMEANALYSIS_MAIN_CONTENT_DATA:
        BASE_URL + "/academic-mock/get-timeanalysis-main-content-data",
    GET_TIMEANALYSIS_SIDEBAR_DATA: BASE_URL + "/academic-mock/get-timeanalysis-sidebar-data",
};


// PAYMENT ENDPOINTS
export const paymentEndpoints = {
    CREATE_ORDER: BASE_URL + "/payment/create",
    VERIFY_PAYMENT: BASE_URL + "/payment/verify",
    GET_SUBSCRIPTION_DETAILS: BASE_URL + "/payment/get-subscription-details",
};

// SETTINGS ENDPOINTS
export const settingsEndpoints = {
    UPDATE_PROFILE_DATA: BASE_URL + "/setting/update-profile",
};