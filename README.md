# Assignment 3

### Lambton College<br>FSDT - Full Stack Software Development<br>Full Stack JavaScript

#### Objective

In this assignment, you are requested to develop a client/server log-in web application using what you have learned so far. Specifically, use ‘html’, ‘express’, ‘node’ and ‘restful request/response’ for developing client and server components, respectively. In your client-side (html), add the following hyperlinks to the page:

1. Log In

2. Register
-	When “Register” is clicked, the user is redirected to a web page that reads username and password from user. Once submitted, the username and password of the user are recorded in a text file (myDB.txt), separated by a comma (we use a comma-based database for now).<br>
For instance:<br>
John, 1234<br>
Alex, 2ws4<br>
This file would serve as our database and you will need to store the user data into it.<br>
<b>Note:</b> The server should not add a user if a duplicate username already exists in the database.
- Once “Log In” is selected, the user is redirected to another html page to enter username and password. Once submitted, the user is welcomed if the username and password is found on the database. Otherwise, appropriate message should be responded to the user.


### Install the app

```
npm install
```

### Run the app

```
npm start
```
