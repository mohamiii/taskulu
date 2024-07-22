import { api } from "@/components/api/api";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UserContext = createContext({
  user: null as User | null,
  setUser: (user: User) => {},
});

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const fetchUser = async () => {
    try {
      const response = await api.get("user/");
      setUser(response.data);
    } catch (error) {
      console.error(error);
      // toast.error("خطا در دریافت اطلاعات کاربری");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const contextValue = {
    user,
    setUser,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
