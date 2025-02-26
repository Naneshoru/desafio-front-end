import { useMemo } from 'react'

type GenericItem = { [key: string]: string | number | boolean }

type Field<T extends GenericItem> = {
  name: keyof T
  displayName: string
}

function useFieldsMap<T extends GenericItem>(fields: Field<T>[] | undefined) {
  return useMemo(() => {
    const map: { [key in keyof T]?: string } = {}
    if (fields == null) return map
    fields.forEach(field => {
      map[field.name] = field.displayName
    })
    return map
  }, [fields])
}

export default useFieldsMap