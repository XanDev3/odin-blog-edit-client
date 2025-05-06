# Odin Blog Edit Client

![Screenshot](./Odin-edit-api.png)



**:point_right: See it live [here](https://xandev3.github.io/odin-blog-edit-client/)**

Odin Blog Edit Client is one of the frontend portions of the blog project that is part of the Odin Node Course. The intention is to allow the blog owner to be able perform CRUD operations through the REST API provided by the backend so long as they have the correct JWT. Anyone visiting the first site will be asked to sign in to verify they are the blog admin. From there they can create or manage posts and comments associated with those post. To use the Editor, you will need to signup with tiny.cloud and receive an API key to include in the .env file. Otherwise no editing to content can be completed.

I created this project mainly to practice full-stack development with a focus on authentication, JSON Web Tokens, and connecting different front ends to a backend api.

## Features

- CRUD operations on Blog posts.
- Create, Read, and Delete on public comments on those posts.
- User authentication with passport and jwt.
- Securing passwords using bcryptjs.
- Schema validation using Mongoose.


### Prerequisites

- You'll need a running MongoDB instance, either locally or deployed in the cloud. You can deploy one easily following this [documentation](https://www.mongodb.com/docs/atlas/getting-started/).
- Nodejs version `20.9.0` or above.

### Cloning the repository

```bash
# Clone this repository
$ git clone https://github.com/XanDev3/odin-blog-edit-client.git

# Go into the repository
$ cd odin-blog-edit-client
```

### Getting the project ready

From `odin-blog-edit-client` directory run the following commands.

```bash
# Install dependencies
$ npm install
```


### Setting up environment variables

- Populate `.env` located in server with the following environment variables:
  - `VITE_TINYMCE_API_KEY` = this is the api key required to use TinyMCE api editor. Sign up at https://www.tiny.cloud/auth/signup/ and register for a key to include here

### Starting the application

From `odin-blog-api` directory, run the following commands:

```bash

# Start the client - dev is a script located in package.json that will use concurrently to run (in parallel) nodemon and tailwindcss
$ npm run dev
```

## Technologies Used

- [Nodejs](https://nodejs.org/)
- [Expressjs](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoosejs](https://mongoosejs.com/)
- [TinyMCE](https://www.tiny.cloud/)

## License

<a href="https://github.com/xandev3/odin-members-only/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="MIT License">
</a>
