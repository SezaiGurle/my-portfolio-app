import { Footer } from "@/components/Footer";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaMedium, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <div className="max-w-6xl w-full mx-auto overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:block md:w-1/2 relative min-h-[600px]">
            <Image
              src="/images/fogy-lake.jpeg"
              alt="Fogy Lake"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="flex-1 p-8">
            <div className="flex flex-col items-center space-y-8">
              <div className="relative w-32 h-32 md:w-48 md:h-48">
                <Image
                  src="/images/my-pic.jpeg"
                  alt="Sezai Gürle"
                  fill
                  className="rounded-full object-cover border-4 border-primary/10"
                  priority
                  quality={100}
                />
              </div>
              <div className="space-y-4">
                <h1 className="text-xl font-bold text-center">Hi, I'm Sezai Gürle</h1>
                <div className="about-text text-center">
                  <p>I'm Sezai, a fullstack developer living in Turkey. I started software engineering in 2019 and graduated in 2024 and now I'm here unemployed. I hope I don't break the internet with my little computer. So far so good...</p>
                  <p>I guess. I'm currently exploring the world of software development and coffee culture.</p>
                </div>
              </div>
              
              <div className="flex space-x-8">
                <a href="https://github.com/sezaigurle" target="_blank" rel="noopener noreferrer" 
                   className="text-3xl hover:text-primary transition-colors">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/in/sezai-gürle-b36a8519a/" target="_blank" rel="noopener noreferrer"
                   className="text-3xl hover:text-primary transition-colors">
                  <FaLinkedin />
                </a>
                <a href="https://medium.com/@sezaigurle" target="_blank" rel="noopener noreferrer"
                   className="text-3xl hover:text-primary transition-colors">
                  <FaMedium />
                </a>
                <a href="https://twitter.com/SezaiGurle" target="_blank" rel="noopener noreferrer"
                   className="text-3xl hover:text-primary transition-colors">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com/the_sezo" target="_blank" rel="noopener noreferrer"
                   className="text-3xl hover:text-primary transition-colors">
                  <FaInstagram />
                </a>
              </div>
            </div>
            
          </div>
          
        </div>
        
      </div>
    </div>
  );
} 