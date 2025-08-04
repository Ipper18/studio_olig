import { LoginForm } from "@/components/auth/login-form";
import { HardDrive } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-col justify-center items-center p-4">
      <div className="flex flex-col items-center gap-4 mb-8 text-center">
        <div className="bg-primary/10 p-3 rounded-lg text-primary">
          <HardDrive className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Olig Manager</h1>
        <p className="text-muted-foreground max-w-sm">Zaloguj się do swojego konta, aby zarządzać pracą i plikami.</p>
      </div>
      <LoginForm />
    </div>
  );
}
