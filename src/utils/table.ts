import { Field, GenericItem } from "../components/table";

function createEmptyObject<T extends GenericItem>(item: Array<keyof T>): T {
  const emptyObject = {} as T;
  item.forEach(key => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emptyObject[key as keyof T] = '' as any;
  });
  return emptyObject;
}

export function createEmptyArray<T extends GenericItem>(fields: Field<T>[]) {
  const arr = fields.map((f) => f.name)
  const empty = createEmptyObject(arr)
  const emptyItems = new Array(10).fill(empty)
  return emptyItems
}