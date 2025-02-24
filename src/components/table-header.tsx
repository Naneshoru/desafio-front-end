import React from 'react'
import { useWindowSize } from '@uidotdev/usehooks'

type GenericItem = { [key: string]: string | number | boolean }

type MobileHeaderProps<T extends GenericItem> = {
  mainProps: Array<keyof T>
}

function MobileHeader<T extends GenericItem>({ mainProps }: MobileHeaderProps<T>) {
  return (
    <>
      {mainProps.map((key) => (
        <th key={String(key)}>{String(key)}</th>
      ))}
    </>
  )
}

type WebHeaderProps<T extends GenericItem> = {
  item: T | null
}

function WebHeader<T extends GenericItem>({ item }: WebHeaderProps<T>) {
  return (
    <>
      {item ? Object.keys(item).map((key) => (
        <th key={String(key)}>{String(key)}</th>
      )) : <></>}
    </>
  )
}

type TableHeaderProps<T extends GenericItem> = {
  item: T | null
  mainProps: Array<keyof T>
}

export default function TableHeader<T extends GenericItem>({ item, mainProps }: TableHeaderProps<T>) {
  const { width } = useWindowSize()
  const mobile = (width ?? 0) <= 375

  return (
    <thead>
      <tr>
        {mobile ? <MobileHeader mainProps={mainProps} /> : <WebHeader item={item} />}
      </tr>
    </thead>
  )
}
