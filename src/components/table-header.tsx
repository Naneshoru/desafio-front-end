import React from 'react'
import { useWindowSize } from '@uidotdev/usehooks'
import { Field } from './table'

type GenericItem = { [key: string]: string | number | boolean }

type MobileHeaderProps<T extends GenericItem> = {
  mainFields: Array<keyof T>
}

function MobileHeader<T extends GenericItem>({ mainFields }: MobileHeaderProps<T>) {
  return (
    <>
      {mainFields.map((key, index) => (
        <th key={`mh-${index}`}>{String(key)}</th>
      ))}
    </>
  )
}

type WebHeaderProps<T extends GenericItem> = {
  item: T
  fields: Field<T> | undefined
}

function WebHeader<T extends GenericItem>({ item, fields }: WebHeaderProps<T>) {
  return (
    <>
      {fields 
        ? fields.map((key, index) => (
          <th key={`wh-f-${index}`}>{String(key.displayName)}</th>
        )) : 
        (Object.keys(item).map((key, index) => (
          <th key={`wh-${index}`}>{String(key)}</th>
        )))}
    </>
  )
}

type TableHeaderProps<T extends GenericItem> = {
  item: T | null
  fields: Field<T> | undefined
  mainFields: Array<keyof T>
}

export default function TableHeader<T extends GenericItem>({ item, fields, mainFields }: TableHeaderProps<T>) {
  const { width } = useWindowSize()
  const mobile = (width ?? 0) <= 375

  return item == null ? <></> : (
    <thead>
      <tr>
        {mobile ? <MobileHeader mainFields={mainFields} /> : <WebHeader item={item} fields={fields} />}
      </tr>
    </thead>
  )
}
