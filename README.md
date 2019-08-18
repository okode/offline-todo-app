# Offline ToDo App

Ionic Shared List stored on PouchDB / CouchDB:

* CouchDB Backend
* Ionic Frontend with PouchDB

## Requirements

* Ionic
* Docker

## Building and Running

* Backend build & run

```
$ cd backend
$ docker-compose up -d
```

Open the following URL:

    http://localhost:5984/_utils

* Frontend build & run

```
$ cd frontend
$ npm install
$ ionic serve
```