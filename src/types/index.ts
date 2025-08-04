export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  type: 'folder';
}

export interface Upload {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'pdf';
  size: string;
  'data-ai-hint'?: string;
}

export interface Spreadsheet {
  id: string;
  name: string;
  parentId: string;
  type: 'spreadsheet';
  data: string[][];
  uploads: Upload[];
}

export type FileSystemItem = Folder | Spreadsheet;
