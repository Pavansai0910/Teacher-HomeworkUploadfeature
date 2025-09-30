import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getChapters } from "../../Services/teacherAPIV1"

// Async thunk for initializing chapters
export const initializeChapterStore = createAsyncThunk(
  'chapters/initialize',
  async (_, { getState }) => {
    try {
      // Get teacher profile from AsyncStorage
      const teacherProfileStr = await AsyncStorage.getItem('teacherProfile');
      const teacherProfile = teacherProfileStr ? JSON.parse(teacherProfileStr) : null;
      if (!teacherProfile) return { chapters: [], fromCache: true };

      // Get cached chapters
      const cachedStr = await AsyncStorage.getItem('cachedChapters');
      const cachedChapters = cachedStr ? JSON.parse(cachedStr) : null;

      const { assignment } = getState();
      const classId = assignment.selectedAssignment?.classId?._id;
      const subjectId = assignment.selectedAssignment?.subjectId?._id;
      const boardId = teacherProfile?.schoolId?.boardId;

      if (!classId || !subjectId || !boardId) {
        return { chapters: [], fromCache: true };
      }

      // Check cache validity (24h)
      const now = Date.now();
      const CACHE_EXPIRY = 24 * 60 * 60 * 1000;
      const isCacheValid =
        cachedChapters?.timestamp &&
        now - cachedChapters.timestamp < CACHE_EXPIRY &&
        cachedChapters?.params?.classId === classId &&
        cachedChapters?.params?.subjectId === subjectId &&
        cachedChapters?.params?.boardId === boardId;

      if (isCacheValid) {
        return { chapters: cachedChapters.data, params: cachedChapters.params, fromCache: true };
      }

      // Fetch fresh chapters
      const response = await getChapters({ classId, subjectId, boardId });
      if (!response.data?.chapters) throw new Error('No chapters found');

      // Cache new data
      const cacheData = {
        data: response.data.chapters,
        params: { classId, subjectId, boardId },
        timestamp: now,
      };
      await AsyncStorage.setItem('cachedChapters', JSON.stringify(cacheData));

      return { chapters: response.data.chapters, params: { classId, subjectId, boardId }, fromCache: false };
    } catch (err) {
      console.error('Chapter initialization failed:', err);
      return { chapters: [], fromCache: true };
    }
  }
);

const initialState = {
  chapters: [],
  loading: false,
  error: null,
  initialized: false,
  lastUpdated: null,
};

const chapterSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    resetChapters: () => initialState,
    refreshChapters: (state) => {
      state.initialized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeChapterStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeChapterStore.fulfilled, (state, action) => {
        state.chapters = action.payload.chapters;
        state.loading = false;
        state.initialized = true;
        state.lastUpdated = Date.now();
        if (!action.payload.fromCache) state.error = null;
      })
      .addCase(initializeChapterStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.initialized = true;
      });
  },
});

export const { resetChapters, refreshChapters } = chapterSlice.actions;
export default chapterSlice.reducer;
