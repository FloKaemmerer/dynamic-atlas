import type { Blueprint, ThemeDefinition } from 'vuetify'
import CheckboxTrue from '@/components/custom_icons/CheckboxTrue'
import CheckboxFalse from '@/components/custom_icons/CheckboxFalse'
import '@/assets/themes/poeTradeDark.css'

const colors = {
  'black': '#000000',
  'offwhite': '#fff8e1',
  'accent-light': '#e9cf9f',
  'accent': '#634928',
  'blue': '#243c61',
  'blue-gray': '#495260',
  'gray-light': '#7f7f7f',
  'gray': '#1f2124',
  'gray-dark': '#0e0f10',
  'gray-darkest': '#0e0f10',
}
const poeTradeThemeDark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: colors.offwhite,
    secondary: colors.accent,
    info: colors.blue,
    ...colors,
  },
}

export const PoeTradeTheme: Blueprint = {
  defaults: {
    global: {
      rounded: 0,
    },
    VTextField: {
      color: 'offwhite',
      density: 'compact',
      hideDetails: true,
    },
    VCheckbox: {
      density: 'compact',
      hideDetails: true,
      falseIcon: CheckboxFalse,
      trueIcon: CheckboxTrue,
    },
    VCombobox: {
      density: 'compact',
      hideDetails: true,
    },
    VExpansionPanel: {
      bgColor: 'black',
    },
    VRangeSlider: {
      showTicks: 'always',
      step: 1,
      direction: 'horizontal',
      thumbColor: 'accent',
      trackFillColor: 'accent-light',
      trackColor: 'gray-dark',
      hideDetails: true,
      strict: true,
      thumbLabel: true,
      thumbSize: 12,
    },
    VToolbar: {
      color: 'black',
    },
  },
  theme: {
    defaultTheme: 'poeTradeThemeDark',
    themes: {
      poeTradeThemeDark,
    },
  },
}
