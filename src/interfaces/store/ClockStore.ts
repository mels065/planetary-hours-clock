import ClockState from "../state/ClockState";

interface ClockStore {
    clock: ClockState;
    updateClock: (newClock: ClockState) => void
}

export default ClockStore;
