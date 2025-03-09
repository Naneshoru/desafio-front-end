import { Field, GenericItem } from '@models/table'
import { useMemo } from 'react'

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