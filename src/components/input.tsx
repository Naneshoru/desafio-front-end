import React, { useRef, useState } from 'react'

type InputProps = {
  name?: string
  value: string
  type?: string
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ name = '', value = '', type, placeholder = '', onChange}: InputProps) {
  const [inputValue, setInputValue] = useState(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    if (onChange) { onChange(event) }
  }
  return (
    <input type={type} name={name} value={inputValue} onChange={handleChange} placeholder={placeholder}  />
  )
}

type UncontrolledInputProps = {
  name?: string
  type?: string
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  ariaLabel?: string
}

export function UncontrolledInput ({ name, type, placeholder, onChange, ariaLabel }: UncontrolledInputProps) {
  const ref = useRef<HTMLInputElement | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) { onChange(event) }
  }

  return (
    <input ref={ref} type={type} name={name} placeholder={placeholder} onChange={handleChange} aria-label={ariaLabel} />
  )
}
