import Link from "next/link";
import slugify from "slugify";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

interface BreadcrumbNavProps {
  items: { id: string; name:string; isCurrent: boolean }[];
  basePath: string;
}

export function BreadcrumbNav({ items, basePath }: BreadcrumbNavProps) {
    let currentPath = basePath;
    const pathSegments = items.slice(1);

    return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={basePath}>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.length > 0 && <BreadcrumbSeparator />}
        {pathSegments.map((item, index) => {
          currentPath += `/${slugify(item.name, { lower: true, strict: true })}`;
          const isLast = index === pathSegments.length - 1;
          return (
            <Fragment key={item.id}>
              <BreadcrumbItem>
                {isLast ? (
                   <BreadcrumbPage>{item.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={currentPath}>{item.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}