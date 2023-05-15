export const HREFS = {
    home: '/',
    dashboard: '/dashboard',
    transactions: '/transaction',
    login: '/login',
    register: '/register',
    profile: '/profile'
}

export const TRANSACTION_TYPES = {
    INCOME: 'income',
    EXPENSE: 'expense'
}

export const PASTEL_COLORS = [
    "#f6ccd5", "#c1c1de", "#c7daeb", "#d1e6d6", "#f2efd5", "#f0e0d1", "#b2d3db", "#a19dc4", "#e8b5d6", "#fcc", "#ffe7cf", "#b6c7a7"
]

export const BASE_URL = import.meta.env.VITE_DEPLOY_SERVER_URL || '';

export const QUERY_CACHE_TIME_DEFAULT = 5 * 60 * 100; // 5 minutes

export enum EFormMode {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
}