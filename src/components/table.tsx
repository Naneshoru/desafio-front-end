import React, { JSX } from 'react'
import TableHeader from './table-header'
import TableRow from './table-row'

export type GenericItem = { [key: string]: string | number | boolean }

export type Field<T extends GenericItem> = { 
  name: keyof T, 
  displayName: string, 
  isImage?: boolean, 
  alt?: string
}

export type TableProps <T extends GenericItem> = {
  fields: Field<T>[]
  mainFields: Array<keyof T>
  items: T[] | null
  customRows?: (index: number) => JSX.Element | JSX.Element[]
  mobileWidth?: number
}

export default function Table <T extends GenericItem>
({ items, fields, mainFields, customRows, mobileWidth }: TableProps<T>) {
  if (fields == null) return <></>
  return (
    items == null ? <></> :
    <table>
      <TableHeader fields={fields} mainFields={mainFields} mobileWidth={mobileWidth} />
      <tbody>
        {
          customRows
          ? items.map((_, index) => (
            customRows(index)
          ))
          : items.map((item) => (
            <TableRow item={item} fields={fields} mainFields={mainFields} />
          ))
        }
      </tbody>
    </table>
  )
}
