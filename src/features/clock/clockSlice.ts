import { createSlice } from "@reduxjs/toolkit";

const clockSlice = createSlice({
    name: 'clock',
    initialState: { 
        currentDate: null,
        currentHour: null,
    },
    reducers: {
        updateClock(state, action) {
            return {
                ...state,
                currentDate: action.payload.currentDate,
                currentHour: action.payload.currentHour,
            };
        }
    }
});

export const { updateClock } = clockSlice.actions;
export default clockSlice.reducer;
