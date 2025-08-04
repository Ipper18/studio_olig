import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, Workflow } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Praca UUN",
    description: "Zarządzaj sekcjami, folderami i arkuszami.",
    href: "/work",
    icon: <Workflow className="h-8 w-8 text-primary" />,
    isExternal: false,
  },
  {
    title: "n8n",
    description: "Przejdź do panelu automatyzacji n8n.",
    href: "#", // Placeholder for actual n8n link
    icon: (
      <svg
        className="h-8 w-8 text-primary"
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <title>n8n</title>
        <path d="M18.109 2.373l-3.94 4.303H5.892L1.97 2.373h4.92v19.254h4.29V2.373h7.025zM22.03 2.373h-2.954l-2.68 2.923v16.331h2.68V5.296l2.954-2.923z" />
      </svg>
    ),
    isExternal: true,
  },
];

export default function DashboardPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Panel główny</h1>
        <p className="text-muted-foreground">Wybierz jedną z opcji, aby kontynuować.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const content = (
            <Card className="group flex flex-col justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>{feature.title}</CardTitle>
                  {feature.icon}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </div>
              <div className="p-6 pt-0">
                  <div className="flex items-center text-primary font-medium">
                      Przejdź <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
              </div>
            </Card>
          );

          if (feature.isExternal) {
            return (
              <a href={feature.href} target="_blank" rel="noopener noreferrer" key={feature.title} className="focus:outline-none focus:ring-2 focus:ring-ring rounded-lg">
                {content}
              </a>
            );
          }

          return (
            <Link href={feature.href} key={feature.title} className="focus:outline-none focus:ring-2 focus:ring-ring rounded-lg">
                {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
