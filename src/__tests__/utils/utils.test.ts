import { describe, expect, jest, test } from "@jest/globals";
import { isNewDay } from "@/utils/utils";

describe('isNewDay', () => {
    test('returns false if same day after sunrise', () => {
        const mock = jest
            .spyOn(global.Date, 'now')
            .mockImplementation(() => new Date("2026-03-25T12:00:00-04:00").valueOf());

        expect(isNewDay("2026-03-25T06:55:00-04:00")).toBeFalsy();

        mock.mockRestore();
    });

    test('returns false if next day, but before sunrise', () => {
        const mock = jest
            .spyOn(global.Date, 'now')
            .mockImplementation(() => new Date("2026-03-26T00:00:00-04:00").valueOf());

        expect(isNewDay("2026-03-25T06:55:00-04:00")).toBeFalsy();

        mock.mockRestore();
    });

    test('returns true if next day after sunrise', () => {
        const mock = jest
            .spyOn(global.Date, 'now')
            .mockImplementation(() => new Date("2026-03-26T12:00:00-04:00").valueOf());

        expect(isNewDay("2026-03-25T06:55:00-04:00")).toBeTruthy();

        mock.mockRestore();
    });
});
