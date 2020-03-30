# Express + Passport + HBS + Mongoose Boilerplate

### Usage

You can use this boilerplate to jumpstart your next project. This will give you the following:

+ An Express server
+ Handlebars set up as the view engine with a layout file and a few page/partials files
+ mongoose with a custom user schema (first name, last name, email, password, date)
+ passport integrated with mongoose for saving users to mongoDB and authenticated users from mongoDB
+ flash integration for success and error messages from one page to another.

### installation

The following commands will get you started: 

clone the repo:
```
git clone https://github.com/codythegreat/express-passport-local-auth-boilerplate.git
```

cd into the directory:
```
cd cloned_directory
```

install dependencies:
```
npm install
```

if you have nodemon install globally you can use the following to start the server:
```
nodemon server.js
```

Otherwise you can use node:
```
node server.js
```