import 'react-native-gesture-handler/jestSetup';


global.__reanimatedWorkletInit = () => {}
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))

