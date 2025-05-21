import { createContext, useContext, useEffect, useState } from 'react'

type Direction = 'ltr' | 'rtl'

type DirectionProviderProps = {
  children: React.ReactNode
  defaultDirection?: Direction
  storageKey?: string
}

type DirectionProviderState = {
  direction: Direction
  setDirection: (direction: Direction) => void
}

const initialState: DirectionProviderState = {
  direction: 'ltr',
  setDirection: () => null,
}

const DirectionProviderContext = createContext<DirectionProviderState>(initialState)

export function DirectionProvider({
  children,
  defaultDirection = 'ltr',
  storageKey = 'partix-ui-direction',
  ...props
}: DirectionProviderProps) {
  const [direction, _setDirection] = useState<Direction>(
    () => (localStorage.getItem(storageKey) as Direction) || defaultDirection
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.setAttribute('dir', direction)
  }, [direction])

  const setDirection = (direction: Direction) => {
    localStorage.setItem(storageKey, direction)
    _setDirection(direction)
  }

  const value = {
    direction,
    setDirection,
  }

  return (
    <DirectionProviderContext.Provider {...props} value={value}>
      {children}
    </DirectionProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDirection = () => {
  const context = useContext(DirectionProviderContext)

  if (context === undefined)
    throw new Error('useDirection must be used within a DirectionProvider')

  return context
}