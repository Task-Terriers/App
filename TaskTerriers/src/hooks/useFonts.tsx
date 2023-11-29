import * as Font from 'expo-font'

export const useFonts = async () =>
  await Font.loadAsync({
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
  })

export default useFonts
