import React from 'react'
import TableHeader from './table-header'
import TableRow from './table-row'

export type GenericItem = { [key: string]: string | number | boolean }

export type TableProps <T extends GenericItem> = {
  mainProps: Array<keyof T>
  items: T[] | null
}

export default function Table <T extends GenericItem>
({ items, mainProps }: TableProps<T>) {
  return (
    <table>
      <TableHeader item={items?.[0] ?? null} mainProps={mainProps} />
      <tbody>
        {items?.map((item, index) => (
          <TableRow key={index} item={item} mainProps={mainProps} />
        ))}
      </tbody>
    </table>
  )
}
