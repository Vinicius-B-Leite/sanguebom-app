import { MMKV } from "react-native-mmkv";
import { LAST_NOTIFICATION_KEY } from "../storageConfig";
import { getLastNotificationRead } from "../notificationStorage";

describe('Storage', () => {
    let storage: MMKV;

    beforeAll(() => {
        storage = new MMKV();
    });
    describe('getLastNotificationRead', () => {
        it('returned a empty string when nothing was storage', () => {
            const id = getLastNotificationRead()
            expect(id).toBe('')
        })
    })
})