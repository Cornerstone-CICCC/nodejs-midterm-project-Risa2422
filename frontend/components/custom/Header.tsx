"use client";
import React, { useState } from "react";
import LoginModal from "./LoginModal";

type Props = {};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleLogin = () => {
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
                <button>Log out</button>{" "}
              </li>
              <li>
                <button>My Profile</button>{" "}
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={handleLogin}>Sign up</button>{" "}
              </li>
              <li>
                <button onClick={handleLogin}>Log in</button>{" "}
              </li>
            </>
          )}
        </ul>
      </nav>

      {isModalOpen && (
        <LoginModal onClose={onclose} setIsLoggedIn={setIsLoggedIn} />
      )}
    </header>
  );
};

export default Header;
