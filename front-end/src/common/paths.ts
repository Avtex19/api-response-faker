export const PATHS = {
    // User-related
    USERS: '/users',
    USER_DETAIL: '/users/:id',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',

    // Product-related
    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/products/:id',
    PRODUCT_REVIEWS: '/products/:id/reviews',

    // Orders
    ORDERS: '/orders',
    ORDER_DETAIL: '/orders/:id',
    ORDER_STATUS: '/orders/:id/status',

    // Cart & Checkout
    CART: '/cart',
    CART_ADD: '/cart/add',
    CART_REMOVE: '/cart/remove',
    CHECKOUT: '/checkout',

    // Payments
    PAYMENTS: '/payments',
    PAYMENT_METHODS: '/payments/methods',
    PAYMENT_STATUS: '/payments/:id/status',

    // Notifications
    NOTIFICATIONS: '/notifications',
    NOTIFICATION_DETAIL: '/notifications/:id',
    NOTIFICATION_READ: '/notifications/:id/read',

    // Admin
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_USERS: '/admin/users',
    ADMIN_ORDERS: '/admin/orders',
    ADMIN_SETTINGS: '/admin/settings',

    // Analytics
    ANALYTICS_OVERVIEW: '/analytics/overview',
    ANALYTICS_USERS: '/analytics/users',
    ANALYTICS_SALES: '/analytics/sales',

    // Misc
    HEALTH: '/health',
    SETTINGS: '/settings',
    SUPPORT: '/support',
};
