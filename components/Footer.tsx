import { FaGithub, FaLinkedin, FaMedium, FaTwitter, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Sezai Gürle. Have Fun.
          </p>
        </div>
      </div>
    </footer>
  );
} 