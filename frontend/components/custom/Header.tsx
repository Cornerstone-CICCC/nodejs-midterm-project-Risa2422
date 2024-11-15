"use client";
import React, { useContext, useState } from "react";
import LoginModal from "./LoginModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SidebarContext } from "../../provider";
import { useEffect } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { loggedUserId, setUserId } = useContext(SidebarContext);

  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(true);
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
                <Link href={`/mypage/${loggedUserId}`}>My Recipes</Link>
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
