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
        error: {
            templateUrl: 'error.html',
            func: false
        },
        chat: {
            templateUrl: 'chat.html',
            func: false
        }
    }
);
