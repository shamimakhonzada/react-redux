export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95">
      <div className="container mx-auto max-w-7xl px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left */}
        <p className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {new Date().getFullYear()} Task. All rights reserved.
        </p>

        {/* Center */}
        <p className="text-sm text-muted-foreground text-center">
          Built with <span className="text-primary font-semibold">React</span> &{" "}
          <span className="text-primary font-semibold">Redux</span>
        </p>

        {/* Right */}
        <p className="text-sm text-muted-foreground text-center md:text-right">
          Built by{" "}
          <a
            href="https://sshoaib.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            Shamim Shoaib
          </a>
        </p>
      </div>
    </footer>
  );
}
