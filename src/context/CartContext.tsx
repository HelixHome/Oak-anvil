'use client'
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

export interface CartItem {
  key: string
  id: string
  name: string
  sku: string
  price: number
  wood: string | null
  uph: string | null
  qty: number
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  totalItems: number
  addItem: (item: Omit<CartItem, 'key'>) => void
  updateQty: (key: string, qty: number) => void
  removeItem: (key: string) => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = useCallback((item: Omit<CartItem, 'key'>) => {
    const key = `${item.id}|${item.wood ?? ''}|${item.uph ?? ''}`
    setItems(prev => {
      const existing = prev.find(i => i.key === key)
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + item.qty } : i)
      return [...prev, { ...item, key }]
    })
    setIsOpen(true)
  }, [])

  const updateQty = useCallback((key: string, qty: number) => {
    if (qty < 1) return
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i))
  }, [])

  const removeItem = useCallback((key: string) => {
    setItems(prev => prev.filter(i => i.key !== key))
  }, [])

  return (
    <CartContext.Provider value={{
      items, isOpen,
      totalItems: items.reduce((s, i) => s + i.qty, 0),
      addItem, updateQty, removeItem,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
