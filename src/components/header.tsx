import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus, FilePen } from "lucide-react";
import { ModeToggle } from "./theme-switcher";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <FilePen className="size-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Task<span className="text-primary text-2xl">.</span>
          </span>
        </Link>

        {/* Navigation / Actions */}
        <nav className="flex items-center gap-3">
          <ModeToggle />
          <Link to="/user-form">
            <Button
              variant="default"
              size="sm"
              className="overflow-hidden rounded-full px-4 transition-all hover:shadow-md hover:shadow-primary/20 active:scale-95"
            >
              <UserPlus className="mr-2 size-4 transition-transform group-hover:scale-110" />
              <span className="relative font-semibold">User Form</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
