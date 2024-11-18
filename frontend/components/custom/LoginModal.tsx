"use client";

import React, { useContext, useState } from "react";
import { Form } from "../ui/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserContext } from "../../provider";

const LoginModal: React.FC<{
  onClose: () => void;
  setIsLoggedIn: (value: boolean) => void;
  setIsSignedUp: (value: boolean) => void;
  isSignedUp: boolean;
}> = ({ onClose, setIsLoggedIn, isSignedUp }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setUserId } = useContext(UserContext) || {
    setUserId: () => {},
  };

  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async (value: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);

    const { username, password } = value;
    const formData = { username, password };

    try {
      if (isSignedUp) {
        const response = await fetch("http://localhost:3000/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to register");
        }
      }

      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        alert("Invalid username or password");
        form.reset();
        return;
      }

      const userId = await response.json();

      setUserId(userId);

      setIsLoggedIn(true);
      onClose();
    } catch (error: any) {
      setError(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-9 rounded-lg w-96">
        <Form {...form}>
          <button onClick={onClose}>
            <img src="/arrow.png" alt="Back" className="w-5" />
          </button>
          <h2 className="text-2xl mb-4 font-semibold tracking-wider font-playfair mt-3">
            {isSignedUp ? "Sign up" : "Log in"}
          </h2>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-7">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-7">
              {isSignedUp ? "Sign Up" : "Log In"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginModal;
