import { Platform, Dimensions, StatusBar } from 'react-native'

const isIphoneX = Platform.OS === 'ios' && StatusBar.currentHeight == 44

const getSafeAreaTopSpace = () => {
  if (Platform.OS === 'ios' && StatusBar.currentHeight == 59) return 59
  if (Platform.OS === 'ios' && StatusBar.currentHeight == 44) return 44
  if (Platform.OS === 'android') return 0
  return 20
}

export const deviceInfo: {
  OS: string
  size: {
    width: number
    height: number
  }
  isIphoneX: boolean
  isAndroid: boolean
  safeAreaTopSpace: number
  safeAreaBottomSpace: number
  navigationBarHeight: number
  androidExtraDimension: {
    statusBarHeight: number
    navigationBarHeight: number
  }
  buttonBottomSpace: number
} = {
  OS: Platform.OS,
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  isIphoneX: isIphoneX,
  isAndroid: Platform.OS === 'android',
  safeAreaTopSpace: getSafeAreaTopSpace(),
  safeAreaBottomSpace: isIphoneX ? 34 : 0,
  navigationBarHeight: Platform.OS === 'android' ? Dimensions.get('screen').height - Dimensions.get('window').height + StatusBar.currentHeight : 0,
  androidExtraDimension: {
    statusBarHeight: Number(StatusBar.currentHeight),
    navigationBarHeight: Dimensions.get('screen').height - Dimensions.get('window').height + StatusBar.currentHeight,
  },
  buttonBottomSpace: isIphoneX ? 0 : 24,
}
