'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { TierId } from '@/types'

interface DealerSession {
  tier: TierId
  accountName: string
  accountNo: string
}

interface DealerContextValue {
  dealer: DealerSession | null
  login: (tier: TierId) => void
  logout: () => void
}

const DealerContext = createContext<DealerContextValue>({
  dealer: null,
  login: () => {},
  logout: () => {},
})

export function DealerProvider({ children }: { children: ReactNode }) {
  const [dealer, setDealer] = useState<DealerSession | null>(null)

  const login = (tier: TierId) =>
    setDealer({ tier, accountName: 'Design House Studio', accountNo: 'DH-2026-114' })

  const logout = () => setDealer(null)

  return (
    <DealerContext.Provider value={{ dealer, login, logout }}>
      {children}
    </DealerContext.Provider>
  )
}

export function useDealer() {
  return useContext(DealerContext)
}
