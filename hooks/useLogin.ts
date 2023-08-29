import { useEffect, useState } from "react"

const useLogin = () => {
    const [user, setUser] = useState<string | null>(null)

    function login(user: string) {
        setUser(user);
        window.localStorage.setItem('user', user);
    }

    function logout() {
        setUser(null);
    }

    useEffect(() => {
        const user = window.localStorage.getItem('user');
        if (user) login(user);
    }, []);

    return { user, login, logout }
}

export default useLogin;