import AuthStack from "./authStackNav";
import { useAuth } from "@/src/services/auth/authentication";
import MainStack from "./drawerNav";

const MainLayout: React.FC = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <MainStack /> : <AuthStack />;
};

export default MainLayout;
