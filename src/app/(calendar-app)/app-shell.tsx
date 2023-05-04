'use client'

import { I18nProvider, SSRProvider, useLocale } from 'react-aria'

import { useState, useContext, createContext } from 'react'
import { today, getLocalTimeZone } from '@internationalized/date'

import { SidePanel } from '@/components/side-panel'
import { MainPanel } from '@/components/main-panel'
import { Ribbon } from '@/components/ribbon'
import { BackgroundDecoration } from '@/components/background-decoration'
import { ThemeSwitcher } from '@/components/theme-switcher'

export const SelectedDateContext = createContext<any>(null)

export default function RootLayout({ children }) {
  const { locale, direction } = useLocale()
  const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()))

  return (
    <SSRProvider>
      <I18nProvider locale={locale}>
        <div lang={locale} dir={direction}>
          <SelectedDateContext.Provider value={{ selectedDate, setSelectedDate }}>
            <PageLayout>{children}</PageLayout>
          </SelectedDateContext.Provider>
        </div>
      </I18nProvider>
    </SSRProvider>
  )
}

function PageLayout({ children }) {
  const [activeTheme, setActiveTheme] = useState('ocean')
  const { selectedDate, setSelectedDate } = useContext(SelectedDateContext)
  return (
    <>
      <ThemeSwitcher activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
      <div className="grid min-h-screen place-items-center">
        <BackgroundDecoration selectedDate={selectedDate} />
        <div className="mx-auto w-full max-w-5xl px-2 py-16 sm:px-6 lg:px-8 xl:max-w-7xl">
          <div className="relative">
            <Ribbon />
            <div className="grid h-full rounded-2xl shadow-lg xl:grid-cols-[theme(width.100),1fr]">
              <SidePanel />
              <MainPanel>{children}</MainPanel>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
