"use client";
import React, { useContext, useState } from "react";
import LoginModal from "./LoginModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserContext } from "../../provider";
import { useEffect } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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

  return (
    <header className="flex p-4 border-b justify-between ">
      <Link
        href={`/`}
        className="pl-[10vw] lg:pl-[17vw] text-sm text-gray-700 font-semibold hover:text-gray-500"
      >
        logo
      </Link>
      <nav className="pr-[10vw] lg:pr-[17vw]">
        <ul className="flex gap-6">
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  href={`/mypage/recipe/create`}
                  className="text-sm text-gray-600 font-semibold"
                >
                  <button className="flex items-center justify-center basis-12 bg-customRose rounded-full py-0.5 px-4">
                    <p className="text-sm text-white">Add</p>
                  </button>
                </Link>
              </li>
              <li>
                <Link
                  href={`/mypage/${loggedUserId}`}
                  className="text-sm text-gray-700 font-semibold hover:text-gray-500"
                >
                  My Recipes
                </Link>
              </li>
              <li>
                <button
                  className="text-sm text-gray-700 font-semibold hover:text-gray-500"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  className="text-sm text-gray-700 font-semibold hover:text-gray-500"
                  onClick={handleSignUp}
                >
                  Sign up
                </button>
              </li>
              <li>
                <button
                  className="text-sm text-gray-700 font-semibold hover:text-gray-500"
                  onClick={handleLogin}
                >
                  Log in
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

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
