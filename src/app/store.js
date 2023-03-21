import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import timelineReducer from '../features/timeline/timeLineSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    timeline : timelineReducer
  },
});

