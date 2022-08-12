# Interview Scheduler

## Live Link

For a view of a live link [Scheduler](https://scheduler-appointments.netlify.app/).

## Project Description

Interview Scheduler is a SPA (Single Page Application) for tracking students interviews built with the latest tools and techniques for optimized user experience.
The App utilizes React built-in and custom hooks and allows users to add, edit and delete appointments in real time.
Data is persisted by the API server using a PostgreSQL database. The client application communicates with an API server over HTTP, using the JSON format.
For quality assurance, the project follows best practices of TDD (Test Driven Development), where individual Components are tested in isolation as well as End-to-End testing is performed.

## Project Features

- Appointment days (Monday to Friday) are displayed and colour-coordinated depending on availability
- The days show the number of slots available as a snapshot of the week
- A user can switch between days and see detailed information
- Booked and available slots are clearly differentiated
- A user can book interviews by typing in a student name and clicking on an interviewer from a list of interviewers
- A user can change the details of an existing interview by pressing the edit icon
- A user can cancel an existing interview, a pop-up message will ask to confirm the action before permanently deleting an interview
- Days display currently remaining spots and capture updates after each modification

### New appointment booking

!['book-new-apt'](https://github.com/Cloud9NB/scheduler/blob/master/docs/screenshots/interview-booking.png?raw=true)
_A user can add interviews to available slots by typing a student name and adding interviewer from the list (an error message will be shown if a student name field is left blank)._

### Interview cancelation

!['cancel-apt-confirm-delete'](https://github.com/Cloud9NB/scheduler/blob/master/docs/screenshots/confirm-delete.png?raw=true)
_A user can cancel an existing appointment by pressing the delete icon and interacting with a warning message by pressing a confirm button._

**Note** : _For full functionality both must run concurrently: the client and the API server applications (see database\* setup below)._

## Interview Scheduler Server Side

## Setup

Install dependencies with `npm install`.

## Creating The DB

Use the `psql -U development` command to login to the PostgreSQL server with the username `development` and the password `development`. This command **MUST** be run in a vagrant terminal, we are using the PostgreSQL installation provided in the vagrant environment.

Create a database with the command `CREATE DATABASE scheduler_development;`.

Copy the `.env.example` file to `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```env
PGHOST=localhost
PGUSER=development
PGDATABASE=scheduler_development
PGPASSWORD=development
PGPORT=5432
```

## Seeding

Run a the development server with `npm start` in the Host environment. We are only using vagrant for `psql` this week.

Both of these achieve the same result.

- Make a `GET` request to `/api/debug/reset` with `curl http://localhost:8001/api/debug/reset`.
- Use the browser to navigate to `http://localhost:8001/api/debug/reset`.

The `development` data is random. Each time we seed we expect to see different appointments.

## Run The Server

Running the server normally

```sh
npm start
```

Running the server so it returns an error when saving/deleting for testing the client's error handling capabilities

```sh
npm run error
```

## Client Installation

```sh
cd view && npm install
```

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## API server/\*Database Setup

For full functionality both must run concurrently: the client and the API server applications.

- Start by forking and cloning the scheduler-api server [here](https://github.com/lighthouse-labs/scheduler-api)
- Follow the steps outlined in README to install and setup the database
- Fork and clone this repo
- Navigate to the root directory and install dependencies with `npm install`
- Once you have the database setup and the scheduler-api server running, run the following command from the root directory of the project `npm start`

## Project Stack

**Front-End:** React, Axios, JSX, HTML, SASS, JavaScript

**Back-End:** Express, Node.js, PostgreSQL

**Testing:** Storybook, Webpack Dev Server, Jest, Testing Library and Cypress

## Dependencies

- Axios
- Classnames
- Normalize.css
- React
- React-dom
- React-scripts
- Babel/core
- Storybook/addon-actions
- Storybook/addon-backgrounds
- Storybook/addon-links
- Storybook/addons
- Storybook/react
- Testing-library/jest-dom
- Testing-library/react
- Testing-library/react-hooks
- Babel-loader
- Node-sass
- Prop-types
- React-test-renderer

## Api

### Days

`GET /api/days`

Response

```json
[
  {
    "id": 1,
    "name": "Monday",
    "appointments": [1, 2],
    "interviewers": [1, 2],
    "spots": 0
  }
]
```

### Appointments

`GET /api/appointments`

Response:

```json
{
  "1": {
    "id": 1,
    "time": "12pm",
    "interview": {
      "student": "Lydia Miller-Jones",
      "interviewer": 1
    }
  },
  "2": {
    "id": 2,
    "time": "1pm",
    "interview": {
      "student": "Archie Cohen",
      "interviewer": 2
    }
  }
}
```

`PUT /api/appointments/:id`

Body:

```json
{
  "interview": {
    "student": String,
    "interviewer": Number
  }
}
```

`DELETE /api/appointments/:id`

### Interviewers

`GET /api/interviewers`

Response:

```json
{
  "1": {
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  },
  "2": {
    "id": 2,
    "name": "Tori Malcolm",
    "avatar": "https://i.imgur.com/Nmx0Qxo.png"
  }
}
```
