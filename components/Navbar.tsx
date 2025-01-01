"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Sezai Gürle
        </Link>
        
        <div className="space-x-4 flex items-center">
          <Button variant="ghost" asChild>
            <Link href="/projects">Project</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/blog">Blog</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
} 