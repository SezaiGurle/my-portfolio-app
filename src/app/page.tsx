import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Instagram, GithubIcon, TwitterIcon, LinkedinIcon, FileTextIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-8">
      <div className="max-w-6xl w-full mx-auto overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col md:flex-row">
          {/* Sol taraf - Fotoğraf */}
          <div className="hidden md:block md:w-1/2 relative min-h-[600px]">
            <Image
              src="/images/fogy-lake.jpeg"
              alt="Fogy Lake"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Sağ taraf - Profil bilgileri */}
          <div className="flex-1 p-16">
            <div className="flex flex-col items-center justify-between h-full">
              <div className="space-y-8">
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <Image
                    src="/images/my-pic.jpeg"
                    alt="Sezai Gürle"
                    fill
                    className="rounded-full object-cover border-4 border-primary/10"
                    priority
                    quality={100}
                  />
                </div>
                <div className="text-center space-y-4">
                  <h1 className="text-6xl font-bold">Hi, I'm Sezai Gürle</h1>
                  <p className="text-2xl text-muted-foreground">
                    I'm Sezai, a fullstack developer living in Turkey. I started software engineering
                    in 2019 and graduated in 2024 and now I'm here unemployed. I hope I don't break the 
                    internet with my little computer. So far so good... I guess. I'm currently exploring 
                    the world of software development and coffee culture.
                  </p>
                </div>
              </div>

              <div className="flex justify-center space-x-6 w-full mt-8">
                <Button variant="outline" size="icon" className="h-12 w-12" asChild>
                  <a href="https://www.instagram.com/the_sezo/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-6 w-6" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </Button>

                <Button variant="outline" size="icon" className="h-12 w-12" asChild>
                  <a href="https://github.com/SezaiGurle" target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                
                <Button variant="outline" size="icon" className="h-12 w-12" asChild>
                  <a href="https://x.com/SezaiGurle" target="_blank" rel="noopener noreferrer">
                    <TwitterIcon className="h-6 w-6" />
                    <span className="sr-only">Twitter</span>
                  </a>
                </Button>
                
                <Button variant="outline" size="icon" className="h-12 w-12" asChild>
                  <a href="https://www.linkedin.com/in/sezai-g%C3%BCrle-b36a8519a/" target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                
                <Button variant="outline" size="icon" className="h-12 w-12" asChild>
                  <a href="https://medium.com/@sezaigurle" target="_blank" rel="noopener noreferrer">
                    <FileTextIcon className="h-6 w-6" />
                    <span className="sr-only">Medium</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
