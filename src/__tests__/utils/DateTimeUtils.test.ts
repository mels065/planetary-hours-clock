import { describe, expect, test, jest } from "@jest/globals";

import DateTimeUtils from "@/utils/DateTimeUtils";

describe("DateTimeUtils", () => {
    describe("isNewDay", () => {
        test("returns false if same day after sunrise", () => {
            // Mock the getCurrentDateTime method to return a specific date and time
            jest.spyOn(DateTimeUtils, "getCurrentDateTime").mockReturnValue(new Date("2026-03-25T12:00:00-04:00"));

            expect(DateTimeUtils.isNewDay("2026-03-25T06:55:00-04:00")).toBeFalsy();

            // Restore the original implementation
            jest.restoreAllMocks();
        });

        test('returns false if next day, but before sunrise', () => {
            // Mock the getCurrentDateTime method to return a specific date and time
            jest.spyOn(DateTimeUtils, "getCurrentDateTime").mockReturnValue(new Date("2026-03-26T05:00:00-04:00"));

            expect(DateTimeUtils.isNewDay("2026-03-25T06:55:00-04:00")).toBeFalsy();

            // Restore the original implementation
            jest.restoreAllMocks();
        });

        test('returns true if next day after sunrise', () => {
            // Mock the getCurrentDateTime method to return a specific date and time
            jest.spyOn(DateTimeUtils, "getCurrentDateTime").mockReturnValue(new Date("2026-03-26T12:00:00-04:00"));

            expect(DateTimeUtils.isNewDay("2026-03-25T06:55:00-04:00")).toBeTruthy();

            // Restore the original implementation
            jest.restoreAllMocks();
        });
    });
});