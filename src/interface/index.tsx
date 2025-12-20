export interface MaterialItem {
  id: number;
  name: string;
  section: string;
}

export interface MaterialsTable {
  id: number;
  name: string;
  section: string;
}

export interface MaterialsItem {
  id: number;
  priyceList: boolean;
  order: number;
  name: string;
  code: string;
  unit: string;
  type: string;
  materialKind: string;
  section?: string;
}

export interface MaterialsListItem {
  id: number;
  priyceList: boolean;
  order: number;
  name: string;
  code: string;
  unit: string;
  type: string;
  materialKind: string;
  section?: string;
}
