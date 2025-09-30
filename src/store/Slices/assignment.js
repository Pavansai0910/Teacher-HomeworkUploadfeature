import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedAssignment: null, 
};

const assignmentSlice = createSlice({
  name: 'assignment',
  initialState,
  reducers: {
    setAssignment: (state, action) => {
      state.selectedAssignment = action.payload;
    },
    resetAssignment: (state) => {
      state.selectedAssignment = null;
    },
  },
});

export const { setAssignment, resetAssignment } = assignmentSlice.actions;
export default assignmentSlice.reducer;
