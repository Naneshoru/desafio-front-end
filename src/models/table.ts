export type GenericItem = { [key: string]: string | number | boolean }

export type Field<T extends GenericItem> = { 
  name: keyof T, 
  displayName: string, 
  isImage?: boolean, 
  alt?: string
} & Sortable

export type SortOrder = 'asc' | 'desc';

export type Sortable = {
  sortable?: boolean;
  order?: SortOrder;
};