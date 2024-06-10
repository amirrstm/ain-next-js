'use client'

import { useTheme } from 'next-themes'

import { IconMoon, IconSun } from '@tabler/icons-react'

const ThemeMode: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <div className="cursor-pointer" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
      {resolvedTheme === 'light' ? <IconMoon className="w-5 h-5" /> : <IconSun className="w-5 h-5" />}
    </div>
  )
}

export default ThemeMode
