import { http } from "@/http-common";

class UserDataService {
    getAll() {
        return http.get("/users");
    }

    get(id) {
        return http.get(`/users/${id}`);
    }

    create(data) {
        return http.post("/users", data);
    }

    update(id, data) {
        return http.put(`/users/${id}`, data);
    }

    delete(id) {
        return http.delete(`/user/${id}`);
    }

    findByFirstName(firstName) {
        return http.get(`/users?firstName=${firstName}`);
    }

    findByActive() {
        return http.get("/users/active");
    }
}

export default new UserDataService();