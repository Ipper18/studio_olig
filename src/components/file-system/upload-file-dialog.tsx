"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadFileDialogProps {
  parentId: string | null;
}

export function UploadFileDialog({ parentId }: UploadFileDialogProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (!file) {
      toast({
        title: "Błąd",
        description: "Proszę wybrać plik do wgrania.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would handle the file upload here.
    // For this demo, we'll just show a success message.
    console.log("Uploading file:", {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      parentId: parentId,
    });

    toast({
      title: "Sukces!",
      description: `Pomyślnie wgrano plik "${file.name}".`,
    });

    // Reset form and close dialog
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setOpen(false);
    
    // You would typically revalidate the path to show the new file.
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UploadCloud className="mr-2 h-4 w-4" />
          Wgraj plik
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Wgraj plik</DialogTitle>
          <DialogDescription>
            Wybierz plik z dysku, który chcesz przesłać. Kliknij Zapisz, aby zakończyć.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file-upload" className="text-right">
              Plik
            </Label>
            <Input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="col-span-3"
              ref={fileInputRef}
            />
          </div>
          {file && (
            <div className="col-span-4 pl-4 text-sm text-muted-foreground">
                Wybrano: {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Anuluj</Button>
          <Button onClick={handleSubmit}>Zapisz</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
