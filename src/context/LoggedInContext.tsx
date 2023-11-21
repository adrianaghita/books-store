import { ReactNode, createContext, useContext, useState } from "react";
import { User } from "../hooks/useRegisterInput";

interface LoggedInContextType {
  isLoggedIn: boolean;
  logInSuccessful: (enteredEmail: string, enteredPassword: string) => boolean;
  loggedEmail: string;
  logOut: () => void;
}

const LoggedInContext = createContext<LoggedInContextType | undefined>(
  undefined
);

export const useLoggedInContext = () => {
  const context = useContext(LoggedInContext);
  if (!context) {
    throw new Error(
      "useLoggedInContext must be used within a LoggedInProvider"
    );
  }
  return context;
};

export const LoggedInProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedEmail, setLoggedEmail] = useState("");

  const logInSuccessful = (
    enteredEmail: string,
    enteredPassword: string
  ): boolean => {
    const usersString = localStorage.getItem("users");
    if (usersString) {
      const users: User[] = JSON.parse(usersString);
      if (
        users.find((user) => {
          return (
            user.email === enteredEmail && user.password === enteredPassword
          );
        })
      ) {
        setLoggedEmail(enteredEmail.split("@")[0].toUpperCase());
        setIsLoggedIn(true);
        return true;
      }
    }
    setIsLoggedIn(false);
    return false;
  };

  const logOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <LoggedInContext.Provider
      value={{ logInSuccessful, isLoggedIn, loggedEmail, logOut }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};
