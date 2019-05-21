# WeatherNote

A web app that combines the features of the weather forecast and to-do list.

## Features

WeatherNote is able to:

* Get your current position when you open the app for the first time.

* Show today's weather information and the weather forecast in the next five days of **any location** you want.(ex: ntu, 101)

* Create, organize your todos with schedule and project management.

## Demo Link

<http://weathernote-server-dev.us-west-2.elasticbeanstalk.com/>

## Install and Run

Please first clone this repo, and then take the following steps to run the application on your computer:

### Under `weathernote-client/`

1. `npm install`

2. In `src/api/projects.js`, set `projectBaseUrl` from staging version to develop version.

3. In `src/api/todos.js`, set `todoBaseUrl` from staging version to develop version.

4. `npm run build`

5. Copy the folder `build` to `weathernote-server/`.

### Under `weathernote-server/`

1. `npm install`

2. Rename the folder `build` to `public` to replace the original `public` folder.

3. In `server.js`, set `DB_URL` from staging version to develop version.
(Please paste your own mongodb connection url to replace `<MLAB_MONGODB_URL>`)

4. `npm start`

Now, you can open your browser and type the url `localhost:3000` to use this application.

## Framework Used

* React.js

* Bootstrap and Reactstrap

* Node.js

* Express.js

## Module Used

### Client-side code

* axios
* dateformat
* moment
* react-datepicker
* react-redux
* redux
* redux-thunk

### Server-side code

* body-parser
* moment
* mongoose
* uuid
  
## Source Code Reference

* <https://shwu10.cs.nthu.edu.tw/courses/web-app/2019-spring/weathermood>

* <https://shwu10.cs.nthu.edu.tw/courses/web-app/2019-spring/weathermood-server>

## My Contribution

### Modifications

* Change client-side code to a create-react-app version.

* Combine today's weather and forecast to the same page.

* Modify forecast to show both maximum and minimum temperature.

* Remove all features about post and mood.

* Remove the feature of searching the specific text of todos.

* Modify openweathermap's api to get the weather information by geographic coordinate rather than city name.

* Modify todo list's client-side api code by using RESTful api to communicate with backend rather than using localStorage.

* Finish todo list's server-side code, and use mongodb as a database rather than postgreSQL.

* Finish online deployment.

### Additional Features

* Add [Google Geolocation API](https://developers.google.com/maps/documentation/geolocation/intro) to get current location of the user when the user opens the app for the first time.

* Add [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/start) to provide geocoding and reverse geocoding of addresses, so that users can search for the weather by any place name rather than just city name.

* Add the filter(all, active, completed) of the todo list.

* Add the feature of unaccomplishing a single todo item.

* Add the feature of deleting a single todo item.

* Add the feature of date selection to perform the schedule management of todo items.

* Add the feature of project group to perform the project management of todo items.

## Remarks

1. Since the deploy version is using a single database, there might be some errors if more than 1 user performs operations on the todo list at the same time.

2. The deploy version might have some loading delay of the background image.

3. Haven't done the RWD yet, so it is suggested to open the app on a desktop or PC.

---

## 心得

這次的期中project其實是根據清大資工web programming的作業來做修改及新增的([課程網頁連結](https://nthu-datalab.github.io/webapp/index.html))，主要是想藉著這次的機會跟完所有的課程及實做來幫助自己更加熟悉web app development。

藉由這份project，我除了對整個react, redux, RESTful api, backend server, DB等一連串的串接更加熟悉了之外，在trace這份code的過程中也學到了許多coding convention及開發web應用的技巧，最後，也學到了一些docker的應用以及deploy到網路上的操作。希望能在期末project中藉由這次所學，開發出一個更完整的應用。
