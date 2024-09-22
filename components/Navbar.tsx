"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false); // Close the dialog
  };

  return (
    <nav className="sticky top-0 bg-white z-10 px-8 md:px-16 lg:px-32 h-16 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold font-sans text-green-600 flex items-center">
          <span className="text-green-700 text-4xl">D</span>eepak
        </h1>
      </div>

      {/* Navbar for small screens */}
      <div className="md:hidden">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <HamburgerMenuIcon />
          </DialogTrigger>
          <DialogContent>
            <ul className="flex flex-col md:flex-row items-center gap-2">
              <Link href="/" onClick={handleLinkClick} className="hover:text-green-600 hover:bg-gray-200 w-full text-center py-2 rounded-lg transition-all">
                <li>Home</li>
              </Link>
              <Link href="#about" onClick={handleLinkClick} className="hover:text-green-600 hover:bg-gray-200 w-full text-center py-2 rounded-lg transition-all">
                <li>About</li>
              </Link>
              <Link href="#skills" onClick={handleLinkClick} className="hover:text-green-600 hover:bg-gray-200 w-full text-center py-2 rounded-lg transition-all">
                <li>Skills</li>
              </Link>
              <Link href="#projects" onClick={handleLinkClick} className="hover:text-green-600 hover:bg-gray-200 w-full text-center py-2 rounded-lg transition-all">
                <li>Projects</li>
              </Link>
              <Link href="#contact" onClick={handleLinkClick} className="hover:text-green-600 hover:bg-gray-200 w-full text-center py-2 rounded-lg transition-all">
                <li>Contact Me</li>
              </Link>
            </ul>
          </DialogContent>
        </Dialog>
      </div>

      {/* Nav links for larger screens */}
      <ul className="hidden md:flex flex-col md:flex-row items-center gap-8">
        <Link href="/" onClick={handleLinkClick} className="hover:text-green-600 transition-all">
          <li>Home</li>
        </Link>
        <Link href="#about" onClick={handleLinkClick} className="hover:text-green-600 transition-all">
          <li>About</li>
        </Link>
        <Link href="#skills" onClick={handleLinkClick} className="hover:text-green-600 transition-all">
          <li>Skills</li>
        </Link>
        <Link href="#projects" onClick={handleLinkClick} className="hover:text-green-600 transition-all">
          <li>Projects</li>
        </Link>
        <Link href="#contact" onClick={handleLinkClick} className="hover:text-green-600 transition-all">
          <li>Contact Me</li>
        </Link>
      </ul>
    </nav>
  );
};
