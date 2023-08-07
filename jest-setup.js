import 'react-native-gesture-handler/jestSetup';

import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

global.__reanimatedWorkletInit = () => {}
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

jest.mock('react-native-onesignal', () => ({
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    inFocusDisplaying: jest.fn(),
    setAppId: jest.fn(),
    sendTag: jest.fn()
  }))
