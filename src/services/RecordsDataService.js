import { http } from "@/http-common";

class RecordsDataService {
    
    getAll() {
        return http.get("/timerecords");
    }

    get(startDate, endDate, client, user) {
        return http.get(`/timerecords/findmatching?
        startDate=${startDate}&endDate=${endDate}
        &client=${client}&user=${user}`);
    }

    getMatchingDates(startDate, endDate) {
        return http.get(`/timerecords/dates?startDate=${startDate}&endDate=${endDate}`);
    }

    getMatchingDatesAndUser(startDate, endDate, userId) {
        return http.get(`/timerecords/findmatching?startDate=${startDate}&endDate=${endDate}&userId=${userId}`);
    }

    getMatchingDatesAndMultipleUsers(startDate, endDate, userIds) {
        return http.get(`/timerecords/findmatching/multipleusers?startDate=${startDate}&endDate=${endDate}&userIds=${userIds}`);
    }

    get(client) {
        return http.get(`/timerecords/${client}`);
    }

    create(data) {
        return http.post("/timerecords", data);
    }

    delete(id) {
        return http.delete(`/timerecords/${id}`);
    }

}

export default new RecordsDataService();