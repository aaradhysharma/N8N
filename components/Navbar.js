import Link from 'next/link';
import { Github, Zap } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold flex items-center space-x-1">
          <Zap className="w-6 h-6 text-blue-600" />
          <span>Terraform&nbsp;Medicine&nbsp;n8n</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#setup" className="hover:text-blue-600 transition-colors">Setup</a>
          <Link href="https://github.com/aaradhysharma/N8N" target="_blank" className="flex items-center hover:text-blue-600 transition-colors">
            <Github className="w-4 h-4 mr-1" /> GitHub
          </Link>
        </nav>
      </div>
    </header>
  );
} 