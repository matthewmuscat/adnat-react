# Adnat (React Challenge)

For this challenge you will be writing your own [ReactJS](https://reactjs.org/) [Single Page App](https://en.wikipedia.org/wiki/Single-page_application) which will operate like a front-end for a JSON version of [the Adnat backend challenge](https://github.com/TandaHQ/work-samples/blob/master/adnat%20(backend)). This is a React challenge, and is not strictly design focused, however, if you'd like to build and style your own components, please go right ahead. If you're not interested or comfortable with doing that, there are plenty of component libraries to help you. [Semantic UI](https://semantic-ui.com/) is a good choice. Additionally, feel free to use any additional libraries you find valuable.

You should use Git as you build your solution. For submission you are asked to push your repo to GitHub and provide us with the link and any necessary instructions.

Your solution should allow you to perform all of the same actions as the backend challenge. Please have a read through [the readme](https://github.com/TandaHQ/work-samples/blob/master/adnat%20(backend)/README.md) to understand more about the tasks to be completed. For this challenge you will be consuming an existing JSON REST API which closely resembles what a backend might look like for the Adnat backend challenge if represented as a JSON API. To setup the backend and start the server, navigate to the root of the repository and run `yarn backend:setup`. To start the backend server, navigate to the root of the repository and run `yarn backend:start`, it will start listening on port 3000 locally, your React SPA should be making requests to it to create, read, update and delete data.

The backend uses a SQLite database to store the data generated by your React application. If you’d like to reset the data, just delete the `backend/db.db` file and restart the server.

Please read the [endpoint documentation](https://github.com/TandaHQ/work-samples/tree/master/adnat%20(react)/backend) for information on the specific requests and responses for the endpoints, and how authentication should work. You’re welcome to extend the functionality of the backend server, however heavily modifying existing logic is discouraged.

Your solution should compile to a single HTML page, and a bundled JS file, you can use any build tools you’d like. [Webpack](https://webpack.js.org/) is not a bad choice.

# Instructions
1. Install concurrently: `pip install concurrently` or `npm install -g concurrently`
2. `cd adnat-react`
3. Launch application concurrently with: `concurrently "yarn backend:setup && yarn backend:start" "cd frontend && npm start"`
