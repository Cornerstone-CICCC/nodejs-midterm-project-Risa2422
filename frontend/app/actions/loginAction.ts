// actions/recipeActions.ts

export const login = async (userData: {
  username: string;
  password: string;
}) => {
  try {
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create recipe");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create recipe");
  }
};
