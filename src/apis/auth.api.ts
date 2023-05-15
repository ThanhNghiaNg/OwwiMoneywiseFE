const BASE_URL = import.meta.env.VITE_API_URL;

export const postLogin = {
    name: 'login',
    fn: async (username: string, password: string) => {
        return fetch(`${BASE_URL}/login`, { body: JSON.stringify({ username, password }) })
    }
}

export const postRegister = {
    name: 'register',
    fn: async (username: string, password: string, fullName: string, email: string, phone: string, address: string) => {
        return fetch(`${BASE_URL}/register`, {
            body: JSON.stringify({
                username, password, fullName,
                email,
                phone,
                address
            })
        })
    }
}