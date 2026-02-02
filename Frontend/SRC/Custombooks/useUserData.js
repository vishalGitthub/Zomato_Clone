import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useUserData = () => {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState("User");

    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser)); 
            } catch (error) {
                console.error("Invalid user data in cookies:", error);
                Cookies.remove("user"); 
            }
        }
        setUserType(Cookies.get("userType") || "user");
    }, []);

    const updateUser = (newUser) => {
        if (!newUser) {
            Cookies.remove("user"); 
            setUser(null);
        } else {
            Cookies.set("user", JSON.stringify(newUser), { expires: 7, secure: true, sameSite: "Strict" });
            setUser(newUser);
        }
    };
    const updateUserType = (type) => {
        if (!type) {
            Cookies.remove("userType");
            setUserType("user");
        } else {
            Cookies.set("userType", type, { expires: 7, secure: true, sameSite: "Strict" });
            setUserType(type);
        }
    };

    return { user, userType, updateUser, updateUserType };
};

export default useUserData;
