"use client";

import React, { useContext, useState } from "react";
import LoginModal from "./LoginModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserContext } from "../../provider";
import { useEffect } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { loggedUserId, setUserId } = useContext(UserContext) || {
    loggedUserId: null,
    setUserId: () => {},
  };

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/auth", {
          credentials: "include",
        });

        if (response.ok) {
          const userId = await response.json();
          setUserId(userId);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [loggedUserId]);

  const handleLogin = () => {
    setIsSignedUp(false);
    setIsModalOpen(true);
  };

  const handleSignUp = () => {
    setIsSignedUp(true);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/logout", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      setIsLoggedIn(false);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const NavigationItems = ({ className = "", onClick = () => {} }) => (
    <ul className={`flex flex-col md:flex-row gap-6 ${className}`}>
      {isLoggedIn ? (
        <>
          <li>
            <Link
              href={`/mypage/recipe/create`}
              className="text-sm text-gray-700 hover:text-gray-500"
              onClick={onClick}
            >
              Add Recipe
            </Link>
          </li>
          <li>
            <Link
              href={`/mypage/${loggedUserId}`}
              className="text-sm text-gray-700 hover:text-gray-500"
              onClick={onClick}
            >
              My Recipes
            </Link>
          </li>
          <li>
            <button
              className="text-sm text-gray-700 hover:text-gray-500"
              onClick={() => {
                handleLogout();
                onClick();
              }}
            >
              Log out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <button
              className="text-sm text-gray-700  hover:text-gray-500"
              onClick={() => {
                handleSignUp();
                onClick();
              }}
            >
              Sign up
            </button>
          </li>
          <li>
            <button
              className="text-sm text-gray-700 hover:text-gray-500"
              onClick={() => {
                handleLogin();
                onClick();
              }}
            >
              Log in
            </button>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <header className="flex p-4 border-b justify-between items-center">
      <Link
        href="/"
        className="pl-4 md:pl-[10vw] lg:pl-[17vw] text-md text-red-600 font-bold hover:text-gray-500"
      >
        GlobalBites
      </Link>

      <nav className="hidden md:block pr-[10vw] lg:pr-[17vw]">
        <NavigationItems />
      </nav>

      <div className="md:hidden pr-4">
        <Sheet>
          <SheetTrigger className="p-2">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <SheetHeader>
              <SheetTitle className="mr-auto">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              <NavigationItems className="flex-col items-start" />
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {isModalOpen && (
        <LoginModal
          onClose={handleClose}
          setIsLoggedIn={setIsLoggedIn}
          isSignedUp={isSignedUp}
          setIsSignedUp={setIsSignedUp}
        />
      )}
    </header>
  );
};

export default Header;
