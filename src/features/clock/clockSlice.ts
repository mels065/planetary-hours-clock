import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlanetaryDate, PlanetaryHour } from "@/utils/interfaces";

const initialState: ClockState = { 
    currentDate: null,
    currentHour: null,
};

const clockSlice = createSlice({
    name: 'clock',
    initialState,
    reducers: {
        updateClock(state, action: PayloadAction<ClockState>) {
            return {
                ...state,
                currentDate: action.payload.currentDate,
                currentHour: action.payload.currentHour,
            };
        }
    }
});

export interface ClockState  {
    currentDate: string | null;
    currentHour: string | null
}

export const { updateClock } = clockSlice.actions;
export default clockSlice.reducer;
