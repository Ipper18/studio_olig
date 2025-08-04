"use client";

import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateItemDialogProps {
  parentId: string | null;
}

export function CreateItemDialog({ parentId }: CreateItemDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<"folder" | "spreadsheet">("folder");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!name.trim()) {
      toast({
        title: "Błąd",
        description: "Nazwa nie może być pusta.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would call a server action here to create the item.
    // For this demo, we'll just show a success message.
    console.log("Creating item:", { name, type, parentId });

    toast({
      title: "Sukces!",
      description: `Pomyślnie utworzono ${type === 'folder' ? 'folder' : 'arkusz'} "${name}".`,
    });

    // Reset form and close dialog
    setName("");
    setType("folder");
    setOpen(false);
    
    // You would typically revalidate the path to show the new item
    // For now, a manual refresh would be needed to see changes in mock data
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Utwórz
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Utwórz nowy element</DialogTitle>
          <DialogDescription>
            Wybierz typ elementu i nadaj mu nazwę. Kliknij Zapisz, aby zakończyć.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Typ</Label>
            <RadioGroup
              defaultValue="folder"
              className="col-span-3 flex gap-4"
              value={type}
              onValueChange={(value: "folder" | "spreadsheet") => setType(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="folder" id="r1" />
                <Label htmlFor="r1">Folder</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="spreadsheet" id="r2" />
                <Label htmlFor="r2">Arkusz</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nazwa
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder={type === 'folder' ? 'Np. Nowy Projekt' : 'Np. Podsumowanie Q2'}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Anuluj</Button>
          <Button onClick={handleSubmit}>Zapisz</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
