import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface AmountFieldProps {
  value?: number
  onChange?: (value: number) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  id?: string
  currency?: string
}

export function AmountField({
  value = 0,
  onChange,
  placeholder = '0,00',
  className,
  disabled = false,
  id,
  currency = 'R$',
}: AmountFieldProps) {
  const [displayValue, setDisplayValue] = useState('')

  // Formatar número para display
  const formatDisplayValue = (num: number): string => {
    if (num === 0) return ''
    return num.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  // Atualizar display quando value muda externamente
  useEffect(() => {
    setDisplayValue(formatDisplayValue(value))
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    // Remove tudo exceto dígitos
    const numbersOnly = inputValue.replace(/\D/g, '')

    // Se está vazio, define como 0
    if (!numbersOnly) {
      setDisplayValue('')
      onChange?.(0)
      return
    }

    // Converte para número (centavos)
    const cents = parseInt(numbersOnly)
    const reais = cents / 100

    // Formata para exibição
    const formatted = reais.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

    setDisplayValue(formatted)
    onChange?.(reais)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  return (
    <div className="relative">
      <Input
        id={id}
        type="text"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={cn('pl-8', className)}
        disabled={disabled}
      />
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
        {currency}
      </span>
    </div>
  )
}
