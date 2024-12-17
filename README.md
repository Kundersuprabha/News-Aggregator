# News Aggregator Application
React.js was used in the creation of this news aggregation website. The program gathers items from a variety of sources and presents them in an organized, readable manner. In addition to creating a customized news feed, users can filter results by date, topic, and source and search for items by keyword.

# Features
Article Search and Filtering Users can search for articles by entering keywords. Filtering options are available by date, category, and source.
Personalized News Feed Users can customize their news feed by selecting preferred sources, categories, and authors.
Mobile-Responsive Design The website is optimized for both desktop and mobile devices.

Data Sources The application uses the following data sources:
NewsAPI: Provides access to a wide range of news articles from various sources.
The Guardian API: Fetches articles from The Guardian.
New York Times API: Retrieves articles from The New York Times.

# Technologies Used
React.js: A JavaScript library for building user interfaces.
Axios: For making HTTP requests to fetch data from APIs.
MUI: For UI components and styling.
Docker: For containerizing the application.

# Dockerization
Dockerfile
The Dockerfile defines the steps to build the Docker image for the application.

Use an official Node.js runtime as a parent image
FROM node:18 AS build

Set the working directory in the container
WORKDIR /app

Copy package.json and package-lock.json files
COPY package*.json ./

Install the dependencies
RUN npm install

Copy the rest of the application files
COPY . .

Run the React app
RUN npm start

# Build and Run the Docker Container
Build the Docker Image: Open a terminal in the root directory of your project and run:

docker build -t news:start .

Run the Docker Container: To start a container from your image, run: docker run -p 3000:3000 news:start 


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting



### Analyzing the Bundle Size



### Making a Progressive Web App



### Advanced Configuration



### Deployment



### `npm run build` fails to minify

=======
# News-Aggregator
>>>>>>> 65f03d547c435748f0c4c00b8d12e723c2f1938b
