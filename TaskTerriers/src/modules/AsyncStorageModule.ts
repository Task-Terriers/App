import AsyncStorage from '@react-native-async-storage/async-storage'

export type AsyncStorageKeyType = 'USER_DATA'
type SecureStorageKeyType = 'AUTH_INFO'

const GET_asyncStorage = async (key: AsyncStorageKeyType) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) return JSON.parse(value)
  } catch (err) {
    console.log(err)
  }
}

const SET_asyncStorage = async (key: AsyncStorageKeyType, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (err) {
    console.log(err)
  }
}

const DELETE_asyncStorage = async (key: AsyncStorageKeyType) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (err) {
    console.log(err)
  }
}

const AsyncStorageModule = {
  GET_asyncStorage,
  SET_asyncStorage,
  DELETE_asyncStorage,
}

export default AsyncStorageModule
