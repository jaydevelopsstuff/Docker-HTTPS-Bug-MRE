# Docker/Node/NextJS Bug MRE
This is a minimal reproducible example for the issue
described in [this StackOverflow question](https://stackoverflow.com/questions/74622461/nodejs-https-server-serving-over-http-instead-of-https-when-running-inside-docke).

## Setup
This example uses Yarn.
Clone the repository to your locker machine and run `yarn install`.
Add a sample `privkey.pem` and `fullchain.pem` into the `cert` directory (found under the root dir, create it if it's not there).
Finally, make sure you have Docker installed.

## Running
First, run the server using `yarn dev`, or optionally `yarn build`, and `yarn start`.
This should result in the server running as expected and using HTTPS protocol. Open
`http://localhost:3000` in your browser, you should not get a response, then, open
`https://localhost:3000`, you should get a response with the default Next landing page.

The above demonstrates how this app should run, and how it does run in a non-containerized
environment. Now lets move onto the unexpected behaviour that occurs in a Docker container.

Making sure you have Docker installed, run `docker build -t https-bug-mre .` in the root directory.
This should generate an image with the tag `https-bug-mre`. Now, you can run the image with
`docker run -p 3000:3000 https-bug-mre`, this should start the image and output its stdout into your
console, if not you can find the container id of the running container with `docker ps` and then check the
logs with `docker logs -f <container-id>`. You should find that the only output is `Listening on port 3000 url: http://localhost:3000`.