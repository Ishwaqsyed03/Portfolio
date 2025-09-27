"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3">
          <div className="w-16"></div> {/* Empty space to maintain layout balance */}
          <button 
            aria-expanded={open} 
            aria-label="Toggle menu" 
            onClick={() => setOpen((v) => !v)} 
            className="md:hidden rounded-md px-4 py-2 border border-white/20 bg-transparent hover:border-purple-400/60 hover:bg-purple-500/10 transition-all duration-300"
          >
            <span className="font-medium">Menu</span>
          </button>
          <ul className="hidden md:flex gap-8 text-sm text-zinc-300">
            <li>
              <Link 
                href="#about" 
                className="group relative px-4 py-2 rounded-lg bg-transparent hover:text-white transition-all duration-300 overflow-hidden nav-button-effect"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-purple-500/15 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 font-medium">About</span>
              </Link>
            </li>
            <li>
              <Link 
                href="#skills" 
                className="group relative px-4 py-2 rounded-lg bg-transparent hover:text-white transition-all duration-300 overflow-hidden nav-button-effect"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-purple-500/15 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 font-medium">Skills</span>
              </Link>
            </li>
            <li>
              <Link 
                href="#projects" 
                className="group relative px-4 py-2 rounded-lg bg-transparent hover:text-white transition-all duration-300 overflow-hidden nav-button-effect"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-purple-500/15 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 font-medium">Projects</span>
              </Link>
            </li>
            <li>
              <Link 
                href="#experience" 
                className="group relative px-4 py-2 rounded-lg bg-transparent hover:text-white transition-all duration-300 overflow-hidden nav-button-effect"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-purple-500/15 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 font-medium">Experience</span>
              </Link>
            </li>
            <li>
              <Link 
                href="#trusted" 
                className="group relative px-4 py-2 rounded-lg bg-transparent hover:text-white transition-all duration-300 overflow-hidden nav-button-effect"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-purple-500/15 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 font-medium">Trusted By</span>
              </Link>
            </li>
            <li>
              <Link 
                href="#testimonials" 
                className="group relative px-4 py-2 rounded-lg bg-transparent hover:text-white transition-all duration-300 overflow-hidden nav-button-effect"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-purple-500/15 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 font-medium">Testimonials</span>
              </Link>
            </li>
            <li>
              <Link 
                href="#contact" 
                className="group relative px-4 py-2 rounded-lg bg-transparent hover:text-white transition-all duration-300 overflow-hidden nav-button-effect"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-purple-500/15 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 font-medium">Contact</span>
              </Link>
            </li>
          </ul>
        </nav>
        {open && (
          <div className="md:hidden mt-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3">
            <ul className="grid gap-3 text-sm text-zinc-300">
              <li>
                <Link 
                  href="#about" 
                  onClick={() => setOpen(false)} 
                  className="group relative block py-3 px-4 rounded-lg bg-transparent hover:text-white transition-all duration-300 overflow-hidden nav-button-effect"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-purple-500/15 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 font-medium">About</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#skills" 
                  onClick={() => setOpen(false)} 
                  className="group relative block py-3 px-4 rounded-lg bg-transparent hover:text-white transition-all duration-300 overflow-hidden nav-button-effect"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-purple-500/15 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 font-medium">Skills</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#projects" 
                  onClick={() => setOpen(false)} 
                  className="group relative block py-3 px-4 rounded-lg bg-transparent hover:text-white transition-all duration-300 overflow-hidden nav-button-effect"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-purple-500/15 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 font-medium">Projects</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#experience" 
                  onClick={() => setOpen(false)} 
                  className="group relative block py-3 px-4 rounded-lg bg-transparent hover:text-white transition-all duration-300 overflow-hidden nav-button-effect"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-purple-500/15 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 font-medium">Experience</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#trusted" 
                  onClick={() => setOpen(false)} 
                  className="group relative block py-3 px-4 rounded-lg bg-transparent hover:text-white transition-all duration-300 overflow-hidden nav-button-effect"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-purple-500/15 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 font-medium">Trusted By</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#testimonials" 
                  onClick={() => setOpen(false)} 
                  className="group relative block py-3 px-4 rounded-lg bg-transparent hover:text-white transition-all duration-300 overflow-hidden nav-button-effect"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-purple-500/15 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 font-medium">Testimonials</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#contact" 
                  onClick={() => setOpen(false)} 
                  className="group relative block py-3 px-4 rounded-lg bg-transparent hover:text-white transition-all duration-300 overflow-hidden nav-button-effect"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-purple-500/15 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 font-medium">Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
