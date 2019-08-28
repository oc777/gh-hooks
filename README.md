# oc222ba-examination-3


**What is the URL to your application?**

cscloud307.lnu.se



**Describe what you have done to make your application secure, both in code and when configuring your application server**

The app uses `body-parser` to parse all incoming `json` data to sanitize it.

The sensitive configuration data, e.g. git authorization token, are stored in `.env` and not directly in code. Additionally, the file is added to `gitignore` file so that the sensitive data stays private.

To be able to fetch the issues from my GitHub repo, I authenticate with a personal access token that is used instead of a password for Git over HTTPS. By adding it to the `fetch` header and not url query, I make sure that it will be encrypted when transferred over the web to prevent eavesdropping and exposing my token.

The app uses `helmet` with its default settings to secure the application from several known vulnerabilities, and setting Content Security Policy to `'self'` to protect from XSS.

The application is configured to be available only over HTTPS to protect/encrypt all data transfered between server and client. This is done by using NGINX as a reverse proxy, which redirects all request from port 80 to port 443 (all other ports are closed to the web), as well as handles secure connection over Web Sockets.

The SSL certificate used for securing HTTP connection is issued by Let's Encrypt - a recognised CA.

**Describe the following parts, how you are using them and what their purpose is in your solution:**

**_Reversed proxy_**

I use NGINX as a reverse proxy. It serves as a buffer between the application server and the clients. So all requests to the server first go through proxy server, where it forwards the requests from port 80 to port 443, applies SSL certificates to encrypt the connection and then forwards the request to the app server. Same is done in the opposite direction - the app server sends response to the proxy, and in its turn, the proxy sends encrypted response to the client. In this way the app server communicates only with the proxy.

**_Process manager_**

I use PM2 as a production process manager. It runs on the Ubuntu server and allows to keep the application alive forever and to reload it without downtime. I also use it for logging and monitoring the application. Additionally I use it to automatically restart the app when new code is pushed with Git.

**_TLS certificates_**

The TLS certificates were issued by Let's Encrypt, which is a recognized CA. Using the certificates over HTTPS connection ensures that all communication between the server and other entities (clients, servers) is encrypted, private and protected.

Using secure HTTP connection also builds trust to your application among users.

**_Environment variables_**

When setting up the production server, I have explicitely stated that the application should run only in a production mode by setting a global variable `process.env.NODE_ENV` to `production`.

I have also used env. variables to supply sensitive information to the app, like websocket secret and git authentication token. They are parsed by `dotenv` module from `.env` file.

**What differs in your application when running it in development from running it in production?**

To be able to receive `POST` requests from GitHub on local machine, I use `Ngrok` to expose the app running on my localhost to the public web.
I use `nodemon` in the development to force application restart on each change.
Additionally I use `standard` module for linting.

**Which extra modules did you use in the assignment? Motivate the use of them and how you have make sure that they are secure enough for production**


When installing additional modules, I made sure to run `npm audit` to check for known vulnerabilities and looked up available information and statistics about the modules on the web. 

I use `socket.io` for creating a bi-directional communication between the server and a client. 

The module has 2,641,332 weekly downloads, is regularly updated, has active community and is very extensive in regard to functionality and documentation.

I also use `express-github-webhook` for handling GitHub Webhooks.

This module has significantly less downloads, but is also much simpler, basically consisting of a 100-line script. After evaluating the code, I have concluded that it is safe to use (i.e. it doesn't do anything malicious), and it implements all security checks that are required in given context (E.g. it verifies that the payload comes from Github by verifying the signature and aborts the process in case it is not).
