import { create } from "zustand";

import ClockStore from "@/interfaces/store/ClockStore";

const useClockStore = create<ClockStore>((set) => ({
    clock: {
        currentDate: null,
        currentHour: null,
        dayHours: [],
        nightHours: [],
    },
    updateClock: (newClock) => {
        set(() => ({
            clock: newClock
        }))
    },
}));

export default useClockStore;
