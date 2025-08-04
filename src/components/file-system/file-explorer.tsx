"use client";

import { FileSystemItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Folder, Table } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CreateItemDialog } from "./create-item-dialog";
import { UploadFileDialog } from "./upload-file-dialog";
import { Button } from "../ui/button";

interface FileExplorerProps {
  items: FileSystemItem[];
  parentId: string | null;
}

export function FileExplorer({ items, parentId }: FileExplorerProps) {
  const pathname = usePathname();
  const router = useRouter();

  const getHref = (item: FileSystemItem) => {
    if (item.type === "folder") {
      const slug = item.name.toLowerCase().replace(/\s+/g, '-');
      return `${pathname === '/work' ? '/work' : pathname}/${slug}`;
    }
    return `/spreadsheet/${item.id}`;
  };
  
  const handleBack = () => {
    if (pathname !== '/work') {
        const pathSegments = pathname.split('/').filter(Boolean);
        // remove 'work' and the last segment
        const newPath = '/work/' + pathSegments.slice(1, -1).join('/');
        router.push(newPath);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {pathname !== '/work' && (
              <Button variant="outline" size="icon" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Wstecz</span>
              </Button>
          )}
          <h1 className="text-3xl font-bold tracking-tight">Zasoby</h1>
        </div>
        <div className="flex items-center gap-2">
            <UploadFileDialog parentId={parentId} />
            <CreateItemDialog parentId={parentId} />
        </div>
      </div>
      {items.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <Link href={getHref(item)} key={item.id}>
              <Card className="hover:border-primary hover:shadow-lg transition-all duration-200 cursor-pointer h-full">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                   {item.type === 'folder' ? <Folder className="h-6 w-6 text-accent"/> : <Table className="h-6 w-6 text-accent"/>}
                  <CardTitle className="text-lg font-medium">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground capitalize">{item.type === 'folder' ? 'Folder' : 'Arkusz'}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">Ten folder jest pusty.</p>
          <p className="text-sm text-muted-foreground">Utwórz nowy folder lub arkusz, aby zacząć.</p>
        </div>
      )}
    </div>
  );
}
