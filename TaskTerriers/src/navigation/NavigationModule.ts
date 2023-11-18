import React from 'react'

import { NavigationContainerRef, StackActions } from '@react-navigation/native'
import { NavigationState, PartialState } from '@react-navigation/native'
import { RootStackParamList } from './type'

export const TaskTerriersNavigationRef: React.RefObject<NavigationContainerRef<RootStackParamList>> | undefined = React.createRef()

export function navigate(screenName: string, params?: any) {
  // @ts-ignore
  TaskTerriersNavigationRef.current?.navigate(screenName, params)
}

export function push(screenName: string, params?: any) {
  TaskTerriersNavigationRef.current.dispatch(StackActions.push(screenName, params))
}

export function pop() {
  TaskTerriersNavigationRef.current.dispatch(StackActions.pop())
}

export function goBack() {
  TaskTerriersNavigationRef.current?.goBack()
}

export function popToTop() {
  const targetScreen = TaskTerriersNavigationRef.current.getRootState?.()?.routes?.[0]?.name
  if (!targetScreen) return
  // @ts-ignore
  TaskTerriersNavigationRef.current.navigate(targetScreen)
}

export function replace(screenName: string, params?: any) {
  TaskTerriersNavigationRef.current.dispatch(StackActions.replace(screenName, params))
}

export async function reset(state: PartialState<NavigationState> | NavigationState) {
  TaskTerriersNavigationRef.current?.reset(state)
}

export function getCurrentScreenName() {
  return TaskTerriersNavigationRef.current?.getCurrentRoute()?.name || ''
}

export const TaskTerriersNavigationModule = {
  navigate,
  push,
  pop,
  goBack,
  popToTop,
  replace,
  reset,
  getCurrentScreenName,
}
