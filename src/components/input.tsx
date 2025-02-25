import React, { useState } from 'react'

type InputProps = {
  name?: string
  value?: string
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ name = '', value = '', placeholder = '', onChange}: InputProps) {
  const [inputValue, setInputValue] = useState(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    if (onChange) {
      onChange(event)
    }
  }
  return (
    <input type="text" name={name} value={inputValue} onChange={handleChange} placeholder={placeholder}  />
  )
}
