import { Github, Twitter, Globe, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full mt-10 border-t bottom-0 border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Brand & Copyright */}
        <div className="text-center md:text-left">
          <h3 className="text-sm font-dela font-semibold text-primary mb-1">
            8point Ecosystem v8.1
            <span className="text-sm text-muted-foreground pl-2 font-montserrat">
            | © {new Date().getFullYear()} All rights reserved.
          </span>
          </h3>
          
        </div>

       
        {/* Right: Social Icons */}
        <div className="flex items-center gap-4">
         <h3 className="text-sm font-montserrat font-semibold text-muted-foreground mb-1">
          Powered by <a href="https://macre8tive.com" target="_blank" className="text-primary "> Macre8tive </a>
          </h3>
        </div>
      </div>
    </footer>
  );
}
