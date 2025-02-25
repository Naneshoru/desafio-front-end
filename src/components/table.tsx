import React from 'react'
import TableHeader from './table-header'
import TableRow from './table-row'

export type GenericItem = { [key: string]: string | number | boolean }

export type Field<T extends GenericItem> = Array<{ name: keyof T, displayName: string }>

export type TableProps <T extends GenericItem> = {
  fields?: Field<T> | undefined
  mainFields: Array<keyof T>
  items: T[] | null
  customRows?: (index: number) => React.JSX.Element | React.JSX.Element[]
}

export default function Table <T extends GenericItem>
({ items, fields, mainFields, customRows }: TableProps<T>) {
  return (
    items == null ? <></> :
    <table>
      <TableHeader item={items[0]} fields={fields} mainFields={mainFields} />
      <tbody>
        {
          customRows
          ? items.map((_, index) => (
            customRows(index)
          ))
          : items.map((item, index) => (
             <TableRow key={`tr-${index}`} item={item} fields={fields} mainFields={mainFields} />
          ))
        }
      </tbody>
    </table>
  )
}
