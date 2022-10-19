import React from 'react'
import { Switch, useTheme } from '@nextui-org/react'
import useDarkMode from 'use-dark-mode';

const ThemeSwitch = () => {
  const darkMode = useDarkMode(false);
  const { type, isDark } = useTheme();

  return (
      <Switch
        checked={darkMode.value}
        onChange={() => darkMode.toggle()}
      />
  )
}

export default ThemeSwitch
