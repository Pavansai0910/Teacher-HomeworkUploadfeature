import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lessonPlannerData: null, 
};

const lessonPlannerSlice = createSlice({
  name: 'lessonPlanner',
  initialState,
  reducers: {
    setLessonPlanner: (state, action) => {
      state.lessonPlannerData = action.payload;
    },
    resetLessonPlanner: (state) => {
      state.lessonPlannerData = null;
    },
  },
});

export const { setLessonPlanner, resetLessonPlanner } = lessonPlannerSlice.actions;
export default lessonPlannerSlice.reducer;