import http from "../http-common";

class AuthService {
    login(username, password) {
        return http.post("/login", { username, password });
    }

    logout() {
        return http.post("/logout");
    }

    register(username, email, password) {
        return http.post("/register", { username, email, password });
    }

    getCurrentUser() {
        return http.get("/user");
    }
}