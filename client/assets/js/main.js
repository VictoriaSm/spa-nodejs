var r = new Router(
    {
        login: {
            templateUrl: 'login.html',
            func: false
        },
        register: {
            templateUrl: 'register.html',
            func: false
        },
        edit: {
            templateUrl: 'editProfile.html',
            func: true
        },
        homes: {
            templateUrl: 'homes.html',
            func: true
        },
        chat: {
            templateUrl: 'chat.html',
            func: true
        },
        error: {
            templateUrl: 'error.html',
            func: false
        },
        notFound: {
            templateUrl: 'notFound.html',
            func: false
        },
        admin: {
            templateUrl: 'admin.html',
            func: true
        },
        users: {
            templateUrl: 'admin/users.html',
            func: false
        },
        messages: {
            templateUrl: 'admin/messages.html',
            func: false
        }
    }
);
