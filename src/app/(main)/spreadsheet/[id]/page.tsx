import { getItemById } from "@/lib/data";
import { notFound } from "next/navigation";
import { SpreadsheetView } from "@/components/spreadsheet/spreadsheet-view";
import { BreadcrumbNav } from "@/components/file-system/breadcrumb";
import { Spreadsheet } from "@/types";

interface SpreadsheetPageProps {
  params: {
    id: string;
  };
}

export default async function SpreadsheetPage({ params }: SpreadsheetPageProps) {
  const item = await getItemById(params.id);

  if (!item || item.type !== 'spreadsheet') {
    notFound();
  }
  
  const breadcrumbs = [...item.path.map(p => ({...p, isCurrent: false})), { id: item.id, name: item.name, isCurrent: true }];

  return (
    <div className="container py-10">
      <BreadcrumbNav items={[{id: 'root', name: 'Home', isCurrent: false}, ...breadcrumbs]} basePath="/work" />
      <SpreadsheetView spreadsheet={item as Spreadsheet} />
    </div>
  );
}
