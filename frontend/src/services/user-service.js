app.factory("UserService", function() {
    return {
        isUserLoggedIn: function() {
            return localStorage.getItem('user') != null;
        },
        login: function(username, password) {
            localStorage.setItem('user', {});
        },
        logout: function() {
            localStorage.removeItem('user');
        },
        hasRoles: function(role) {},
    };
});