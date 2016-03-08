### Document Management System [![codecov.io](https://codecov.io/github/bryomckim/DMS-Frontend/coverage.svg?branch=master)](https://codecov.io/github/bryomckim/DMS-Frontend?branch=master)[![Code Climate](https://codeclimate.com/github/bryomckim/DMS-Frontend/badges/gpa.svg)](https://codeclimate.com/github/bryomckim/DMS-Frontend) [![Coverage Status](https://coveralls.io/repos/github/bryomckim/DMS-Frontend/badge.svg?branch=master)](https://coveralls.io/github/bryomckim/DMS-Frontend?branch=master)
Create, edit and view documents.

The DMS helps you create Documents and view them based on priviledges the user has been given. There are 3 roles allowed: Admin, contributor and viewer.
Each document has an access level based on these 3 roles. Documents can be categorised by type.
The documents created can be shared via facebook and google plus.

### Installation
1. Clone this repo to you computer.
2. Run npm install to install dependencies
3. Ensure that Mongodb is installed. If not checkout this [link](https://docs.mongodb.org/manual/installation/)
4. Edit the `server/config/config.js` file to suite your Mongodb configurations
5. Run by using the `npm start` command in  the terminal/cmd

### Testing
Frontend tests have been done via [mocha](https://mochajs.org/) and [karma-mocha](https://github.com/karma-runner/karma-mocha) as the test runner.
Asssertion library used is Michael Jackson's [expect](https://github.com/mjackson/expect)
* Run `npm test` from the terminal

Backend Tests have been done using `jasmine`.
* Use the `jasmine` or `npm test` command to run the tests.

## other links
* [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/1536437)
* [Live Demo](https://dmsapp.herokuapp.com/)
