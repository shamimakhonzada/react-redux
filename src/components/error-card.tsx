import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorCardProps {
  title?: string;
  message?: string;
  onRetry: () => void;
}

export function ErrorCard({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please check your connection and try again.",
  onRetry,
}: ErrorCardProps) {
  return (
    <Card className="mx-auto w-full max-w-5xl text-center">
      <CardHeader className="flex flex-col items-center gap-3">
        <AlertTriangle className="size-10 text-destructive" />
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{message}</p>
        <Button variant="outline" onClick={onRetry} className="mt-2">
          <RefreshCw className="size-4" />
          Try Again
        </Button>
      </CardHeader>
    </Card>
  );
}
