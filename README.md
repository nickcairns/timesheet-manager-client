# Timesheet Manager Client

## About
This repository contains the frontend client code for the timesheet manager web app. It is built using Vue.js and follows the principles of a Single Page Application (SPA). Pinia has been utilized for state management.

## Functionality
The frontend client provides the following functionality:

* User Authentication: Users are presented with a login page where they can (securely) authenticate.
* Role-based Access: Upon successful login, different areas of the app load based on the user's role. There are separate versions for standard users and admin users.
* Submission of records.
* Retreival of records in report form, with optional filter/search criteria.
* Adding and editing users registered with the system by admin users.

## TODO
* Pagination for larger numbers of returned results (may be better handled by the REST controller).
* Use HTTPS when implemented on REST controller.
* Add ability to edit records (user can edit own, admin can edit all).
* Increase time user is logged in for, until the expressly logout.
* Incorporate a service to email users their default password, and then prompt to change it on first login.
* Improve styling.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
