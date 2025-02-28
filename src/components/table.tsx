import React, { JSX } from 'react'
import TableHeader from './table-header'
import TableBody from './table-body'

import './table.css'

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
  customRows?: (
    item: T,
    index: number,
    isLoading: boolean
  ) => JSX.Element
  mobileWidth?: number
}

export default function Table <T extends GenericItem>
({ items, fields, mainFields, customRows, mobileWidth }: TableProps<T>) {
  if (fields == null) throw Error('Inserir campos na tabela')
  
  return (
    <table>
      <TableHeader fields={fields} mainFields={mainFields} mobileWidth={mobileWidth} />
      <TableBody items={items} fields={fields} mainFields={mainFields} customRows={customRows} mobileWidth={mobileWidth} />
    </table>
  )
}

