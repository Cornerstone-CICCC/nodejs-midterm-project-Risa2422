"use client";
import React, { useState } from "react";
import LoginModal from "./LoginModal";

type Props = {};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

  const handleLogin = () => {
    setIsModalOpen(true);
  };

  const handleSignUp = () => {
    setIsSignedUp(true);
    setIsModalOpen(true);
  };

  const onclose = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="flex justify-between p-4 border-b">
      <div>logo</div>
      <nav>
        <ul className="flex gap-3">
          {isLoggedIn ? (
            <>
              <li>
                <button>Log out</button>
              </li>
              <li>
                <button>My Recipes</button>
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
        />
      )}
    </header>
  );
};

export default Header;
