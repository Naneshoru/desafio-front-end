import React from 'react'
import { useWindowSize } from '@uidotdev/usehooks'
import { Field, GenericItem } from './table'

type MobileRowProps<T extends GenericItem> = {
  item: T, 
  mainFields: Array<keyof T>
}

function MobileRow <T extends GenericItem>({ item, mainFields }: MobileRowProps<T>): React.JSX.Element {
  return (
    <>
      {mainFields.map((property, index) => (
        <td key={`mr-${index}`}>{item[property]}</td>
      ))}
    </>
  )
}

type WebRowProps<T extends GenericItem> = {
  item: T
  fields: Field<T>[] | undefined
}

function WebRow<T extends GenericItem>({ item, fields }: WebRowProps<T>): React.JSX.Element {
  return (
    <>
      {fields
        ? fields.map((value, index) => (
          <td key={`wr-f-${index}`}>{item[String(value)]}</td>
        ))
        : Object.values(item).map((value, index) => (
          <td key={`wr-${index}`}>{String(value)}</td>
      ))}
    </>
  )
}

type TableRowProps<T extends GenericItem> = {
  item: T
  fields: Field<T>[] | undefined
  mainFields: Array<keyof T>
  mobileWidth?: number
}

export default function TableRow<T extends GenericItem>({ item, fields, mainFields, mobileWidth = 375, ...props }: TableRowProps<T>) {
  const { width } = useWindowSize()
  const mobile = (width ?? 0) <= mobileWidth

  return (
    item == null ? <></> :
    <tr {...props}>
      {mobile
        ? <MobileRow item={item} mainFields={mainFields}  />
        : <WebRow item={item} fields={fields} />}
    </tr>
  )
}

