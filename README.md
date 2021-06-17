# todo-demo.codelater.de

Simple Express.js demo to demo deployment

## Getting started (locally)

Download and install Docker for your operating system: https://www.docker.com/get-started

Spin up environment:

```
$ docker compose up
```

Visit application in browser: http://localhost:3000. And follow instructions and visit http://localhost:3000/todos. The database is not yet setup!

Run migration script:

```
$ docker compose run --rm web npm run db:migrate
```

Visit http://localhost:3000/todos again. Nothing to see yet, thus let's add some data:

```
curl --location --request POST 'http://localhost:3000/todos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "foobar"
}'
```

We will receive an answer containing the ID of the record we just created:

```
{
  "id": 1
}
```

And we can get that entry under the following URL http://localhost:3000/todos/1 which will yield the result as JSON:

```
{
  "id": 1,
  "title": "foobar",
  "notes": null,
  "due_date": null,
  "created_at": "2021-06-17T08:26:36.040Z"
}
```
