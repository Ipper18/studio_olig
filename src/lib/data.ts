import { FileSystemItem, Folder, Spreadsheet } from "@/types";
import slugify from "slugify";

const items: FileSystemItem[] = [
  { id: 'uun', name: 'Praca UUN', parentId: null, type: 'folder' },
  { id: 'czernica', name: 'Czernica', parentId: 'uun', type: 'folder' },
  { id: 'wroclaw', name: 'Wrocław', parentId: 'uun', type: 'folder' },
  { id: 'jeszkowice', name: 'Jeszkowice', parentId: 'uun', type: 'folder' },
  { id: 'dokumenty-wroclaw', name: 'Dokumenty', parentId: 'wroclaw', type: 'folder' },
  {
    id: 'arkusz1',
    name: 'Podsumowanie Q1',
    parentId: 'czernica',
    type: 'spreadsheet',
    data: [
      ['Zadanie', 'Status', 'Odpowiedzialny', 'Termin'],
      ['Analiza sprzedaży', 'Zakończone', 'Anna Kowalska', '2023-03-15'],
      ['Przygotowanie raportu', 'W toku', 'Jan Nowak', '2023-03-20'],
      ['Spotkanie z klientem', 'Zaplanowane', 'Piotr Wiśniewski', '2023-03-25'],
    ],
    uploads: [
      { id: 'up1', name: 'raport-sprzedazy.pdf', url: '#', type: 'pdf', size: '1.2 MB' },
      { id: 'up2', name: 'wykres-trendow.png', data-ai-hint: "chart graph", url: 'https://placehold.co/400x300.png', type: 'image', size: '345 KB' },
    ],
  },
];

const itemMap = new Map<string, FileSystemItem>(items.map(item => [item.id, item]));

function getPath(itemId: string | null): { id: string; name: string }[] {
  const path = [];
  let currentId = itemId;
  while (currentId) {
    const currentItem = itemMap.get(currentId);
    if (currentItem) {
      path.unshift({ id: currentItem.id, name: currentItem.name });
      currentId = currentItem.parentId;
    } else {
      break;
    }
  }
  return path;
}

export async function getItemsByParentId(parentId: string | null) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return items.filter(item => item.parentId === parentId);
}

export async function getItemById(id: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  const item = itemMap.get(id);
  if (!item) return null;
  
  return {
    ...item,
    path: getPath(item.parentId),
  };
}

export async function getFolderDataBySlug(slugs: string[] = []) {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!slugs || slugs.length === 0) {
        const rootItems = items.filter(item => item.parentId === null);
        return {
            items: rootItems,
            breadcrumbs: [{ id: 'root', name: 'Home', isCurrent: true }],
            currentFolderId: null,
        };
    }
    
    let parentId: string | null = null;
    let currentFolder: Folder | null = null;
    const breadcrumbs: { id: string; name: string; isCurrent: boolean }[] = [{ id: 'root', name: 'Home', isCurrent: false }];

    for (const slug of slugs) {
        const foundItem = items.find(item => item.parentId === parentId && slugify(item.name, { lower: true }) === slug && item.type === 'folder') as Folder | undefined;
        
        if (foundItem) {
            currentFolder = foundItem;
            parentId = foundItem.id;
            breadcrumbs.push({ id: foundItem.id, name: foundItem.name, isCurrent: false });
        } else {
            return { items: [], breadcrumbs: [], currentFolderId: null }; // Not found
        }
    }
    
    if (breadcrumbs.length > 0) {
        breadcrumbs[breadcrumbs.length - 1].isCurrent = true;
    }

    const folderContent = items.filter(item => item.parentId === parentId);
    
    return {
        items: folderContent,
        breadcrumbs,
        currentFolderId: parentId,
    };
}
