import React from 'react'
import { useWindowSize } from '@uidotdev/usehooks'
import { GenericItem } from './table'

type MobileRowProps<T extends GenericItem> = {
  item: T, 
  mainProps: Array<keyof T>
}

function MobileRow <T extends GenericItem>({ item, mainProps }: MobileRowProps<T>): React.JSX.Element {
  return (
    <>
      {mainProps.map((property, index) => (
        <td key={index}>{item[property]}</td>
      ))}
    </>
  )
}

type WebRowProps<T extends GenericItem> = {
  item: T
}

function WebRow<T extends GenericItem>({ item }: WebRowProps<T>): React.JSX.Element {
  return (
    <>
      {Object.values(item).map((value, index) => (
        <td key={index}>{String(value)}</td>
      ))}
    </>
  )
}

type TableRowProps<T extends GenericItem> = {
  item: T
  mainProps: Array<keyof T>
}

export default function TableRow<T extends GenericItem>({ item, mainProps, ...props }: TableRowProps<T>) {
  const { width } = useWindowSize()
  const mobile = (width ?? 0) <= 375

  return (
    <tr {...props}>
      {mobile
        ? <MobileRow item={item} mainProps={mainProps}  />
        : <WebRow item={item} />}
    </tr>
  )
}
