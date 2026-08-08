import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import PlanetaryHour from "@/interfaces/PlanetaryHour";

const initialState: ClockState = { 
    currentDate: null,
    currentHour: null,
    dayHours: JSON.stringify([]),
    nightHours: JSON.stringify([]),
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
                dayHours: action.payload.dayHours,
                nightHours: action.payload.nightHours,
            };
        }
    }
});

export interface ClockState  {
    currentDate: string | null;
    currentHour: string | null,
    dayHours: string,
    nightHours: string,
}

export const { updateClock } = clockSlice.actions;
export default clockSlice.reducer;
