import { getFolderDataBySlug } from "@/lib/data";
import { FileExplorer } from "@/components/file-system/file-explorer";
import { BreadcrumbNav } from "@/components/file-system/breadcrumb";

interface WorkPageProps {
  params: {
    slug: string[];
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { items, breadcrumbs, currentFolderId } = await getFolderDataBySlug(params.slug);

  return (
    <div className="container py-10">
      <BreadcrumbNav items={breadcrumbs} basePath="/work" />
      <FileExplorer items={items} parentId={currentFolderId} />
    </div>
  );
}
