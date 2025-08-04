"use client";

import { Spreadsheet, Upload } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Image as ImageIcon, UploadCloud } from "lucide-react";
import Image from "next/image";

interface SpreadsheetViewProps {
  spreadsheet: Spreadsheet;
}

const FileIcon = ({ type }: { type: Upload['type'] }) => {
    if (type === 'image') return <ImageIcon className="h-5 w-5 text-muted-foreground" />;
    if (type === 'pdf') return <FileText className="h-5 w-5 text-muted-foreground" />;
    return null;
}

export function SpreadsheetView({ spreadsheet }: SpreadsheetViewProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{spreadsheet.name}</h1>
        <p className="text-muted-foreground">Przegląd danych i załączników.</p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Dane Arkusza</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="border rounded-md overflow-hidden">
                <Table>
                <TableHeader>
                    <TableRow>
                    {spreadsheet.data[0].map((header, index) => (
                        <TableHead key={index}>{header}</TableHead>
                    ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {spreadsheet.data.slice(1).map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                        ))}
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row justify-between items-start">
            <div>
                <CardTitle>Załączniki</CardTitle>
                <CardDescription>Przeglądaj i zarządzaj wgranymi plikami.</CardDescription>
            </div>
            <Button variant="outline">
                <UploadCloud className="mr-2 h-4 w-4" />
                Wgraj plik
            </Button>
        </CardHeader>
        <CardContent>
            {spreadsheet.uploads.length > 0 ? (
                <ul className="space-y-4">
                    {spreadsheet.uploads.map(upload => (
                        <li key={upload.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                            {upload.type === 'image' && (
                                <Image 
                                    src={upload.url} 
                                    alt={upload.name}
                                    width={64}
                                    height={64}
                                    className="rounded-md object-cover"
                                    data-ai-hint={upload['data-ai-hint']}
                                />
                            )}
                            {upload.type === 'pdf' && (
                                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
                                    <FileText className="h-8 w-8 text-muted-foreground" />
                                </div>
                            )}
                            <div className="flex-1">
                                <p className="font-medium truncate">{upload.name}</p>
                                <p className="text-sm text-muted-foreground">{upload.size}</p>
                            </div>
                            <Button variant="ghost" size="sm">Pobierz</Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-10 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Brak wgranych plików.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
