type ValueType = string | number | boolean

export type Union<T extends { [key: string]: ValueType } | ReadonlyArray<ValueType>> = T extends ReadonlyArray<ValueType>
  ? T[number]
  : T extends { [key: string]: infer U }
    ? U
    : never

export const Root = {
  BottomTabNavigation: 'BottomTabNavigation',
  ServiceDetailScreen: 'ServiceDetailScreen',
  ServiceAddScreen: 'ServiceAddScreen',
  MessagesDetailScreen: 'MessagesDetailScreen',
  SettingsTabClassesScreen: 'SettingsTabClassesScreen',
  SettingsTabMajorScreen: 'SettingsTabMajorScreen',
  SettingsTabAboutScreen: 'SettingsTabAboutScreen',
} as const

export type Root = Union<typeof Root>

export type RootStackParamList = {
  [Root.BottomTabNavigation]: object
  [Root.ServiceDetailScreen]: object
  [Root.ServiceAddScreen]: object
  [Root.MessagesDetailScreen]: object
  [Root.SettingsTabClassesScreen]: object
  [Root.SettingsTabMajorScreen]: object
  [Root.SettingsTabAboutScreen]: object
}
