app.factory("UserService", function() {
    return {
        isUserLoggedIn() {
            return localStorage.getItem('user') != null;
        },
        login(username, password) {
            localStorage.setItem('user', {});
        },
        logout() {
            localStorage.removeItem('user');
        },
        hasRoles(role) {},
    }
})