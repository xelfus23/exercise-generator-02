import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";

interface authContextProps {
    children: any;
}

interface AuthContextType {
    user: any | null;
    isAuthenticated: boolean;
    login: (
        email: string,
        password: string
    ) => Promise<{ success: boolean; error?: string }>; //  RETURN TYPE
    logout: () => Promise<{ success: boolean; error?: string }>; // Return type for logout
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    login: async () => ({ success: false }), // Default values
    logout: async () => ({ success: false }),
});

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<authContextProps> = ({
    children,
}) => {
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        updateUser(0);
    }, [isAuthenticated]);

    const updateUser = async (uid: number) => {
        try {
            setUser({
                ...user,
                firstName: "User",
                lastName: "Test",
                password: "12345",
                email: "user@test.com"
            });
        } catch (e) {
            console.warn(e);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await updateUser(0);
            setIsAuthenticated(true);
            return { success: true };
        } catch (e) {
            return { success: false };
        }
    };

    const logout = async () => {
        setUser({});
        setIsAuthenticated(false);
        return { success: true };
    };

    const value: AuthContextType = {
        user,
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("userAuth must be used within an AuthContextProvider");
    }
    return context;
};
