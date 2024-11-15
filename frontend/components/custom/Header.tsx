"use client";
import React, { useState } from "react";
import LoginModal from "./LoginModal";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = () => {
    setIsModalOpen(true);
  };

  const handleSignUp = () => {
    setIsSignedUp(true);
    setIsModalOpen(true);
  };

  const onclose = () => {
    setIsSignedUp(false);
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
    <header className="flex justify-between p-4 border-b">
      <div>logo</div>
      <nav>
        <ul className="flex gap-3">
          {isLoggedIn ? (
            <>
              <li>
                <button onClick={handleLogout}>Log out</button>
              </li>
              <li>
                <Link href={`/mypage/90393cd5-ab1f-40fc-be7f-ca2dfaccb438`}>
                  My Recipes
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={handleSignUp}>Sign up</button>
              </li>
              <li>
                <button onClick={handleLogin}>Log in</button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {isModalOpen && (
        <LoginModal
          onClose={onclose}
          setIsLoggedIn={setIsLoggedIn}
          isSignedUp={isSignedUp}
          setIsSignedUp={setIsSignedUp}
        />
      )}
    </header>
  );
};

export default Header;
