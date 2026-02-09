"use client";

import React from "react";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useStoreUser } from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from "convex/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const { isLoading } = useStoreUser();
  const path = usePathname();

  return (
    <header className="fixed top-0 w-full border-b bg-white/95 backdrop-blur-md z-50 ">
      
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <Image
            src={"/logos/logo.png"}
            alt="Vehiql Logo"
            width={200}
            height={60}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>

        {/* Navigation Links - Only visible on Home Page and Desktop */}
        {path === "/" && (
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              How It Works
            </Link>
          </div>
        )}

        {/* Action Buttons Section */}
        <div className="flex items-center gap-4">
          <Authenticated>
            <Link href="/dashboard">
              {/* Desktop Dashboard Button */}
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 border-gray-200 hover:text-green-600 hover:border-green-600 transition-all"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              
              {/* Mobile Dashboard Icon Button */}
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0 hover:bg-gray-100">
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </Link>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 border border-gray-200",
                  userButtonPopoverCard: "shadow-xl border border-gray-100",
                  userPreviewMainIdentifier: "font-semibold text-gray-900",
                },
              }}
              afterSignOutUrl="/"
            />
          </Authenticated>

          <Unauthenticated>
            <SignInButton mode="modal">
              <Button variant="ghost" className="text-gray-600 hover:text-green-600">
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button className="bg-green-600 hover:bg-green-700 text-white shadow-sm border-none transition-transform active:scale-95">
                Get Started
              </Button>
            </SignUpButton>
          </Unauthenticated>
        </div>
      </nav>

      {/* Loading Indicator - Positioned at the very bottom of the border */}
      <div className="absolute bottom-0 left-0 w-full">
        {isLoading && <BarLoader width={"100%"} color="#22c55e" height={2} />}
      </div>
    </header>
  );
}