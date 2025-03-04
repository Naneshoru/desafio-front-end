import { JSX } from 'react'
import TableHeader from './table-header'
import TableBody from './table-body'
import { Field, GenericItem } from '../models/table'

import './table.css'

export type TableProps <T extends GenericItem> = {
  fields: Field<T>[]
  mainFields: Array<keyof T>
  items: T[] | Proccesed<T>[] | null
  customRows?: (
    item: T | Proccesed<T>,
    index: number,
    isLoading: boolean
  ) => JSX.Element
  mobileWidth?: number
  onClick?: (field: keyof T) => void
}

export type Proccesed<T> = {
  [K in keyof T]: T[K] | string
}

export default function Table <T extends GenericItem>
({ items, fields, mainFields, customRows, mobileWidth, onClick }: TableProps<T>) {
  if (fields == null) throw Error('Inserir campos na tabela')
  
  return (
    <table>
      <TableHeader fields={fields} mainFields={mainFields} mobileWidth={mobileWidth} onClick={onClick} />
      <TableBody items={items} fields={fields} mainFields={mainFields} customRows={customRows} mobileWidth={mobileWidth} />
    </table>
  )
}

