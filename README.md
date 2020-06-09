# LolBans-API

![Master](https://github.com/NotZachery/LolBans-API/workflows/Master/badge.svg)

TypeScript API backend for LolBans.

## Configuration

```env
# Example Environment Setup

API_PORT=3000
API_LOGLEVEL="info"
# How long the statistics cache should last.
API_CACHE_LIFETIME=5

# Database Configuration
TYPEORM_CONNECTION=mysql
TYPEORM_HOST=localhost
TYPEORM_USERNAME=root
TYPEORM_PASSWORD=my-secret-pw
TYPEORM_DATABASE=test
TYPEORM_PORT=3306

# Whether or not to synchronize the database - WARNING!! This has
# potential side effects.
TYPEORM_SYNCHRONIZE=true

TYPEORM_LOGGING=true
TYPEORM_ENTITIES=src/entities/*.ts
```

## Running

When running for production use, please make sure `NODE_ENV` is set to `production` - this attaches security middleware to the server which isn't attached otherwise.

### Development

By default, the API will try to load variables stored in `.env`. It will fall back to process environment if this fails.

```bash
$ yarn
// bla bla bla
$ yarn start
```

### Production

For production, a Dockerfile is provided for building an image of the API. The environment variables listed above can then be passed to the container.

## Routes

### GET /

Utility route to check the API is alive - returns the current version ;3

### GET /punishments

Return an array of all punishments, ordered by date of creation. Limited to 100 per request, support pagination.

#### Query Params

-   `page` - The page of punishments to retrieve. Pages are 100 punishments in size when full. **Default:** 1
-   `limit` - The maximum number of items to return. **Default:** 100
-   `type` - The type of punishments to retrieve. If not specified, the API will return all punishments.
    -   `0` - Ban
    -   `1` - Kick
    -   `2` - Mute
    -   `3` - Warn

### GET /punishments/:id

Return the punishment with the specified ID. Supports both sequential numeric, and LolBans Punishment ID as a request parameter.

### GET /users/:uuid

Return the details of the user with the given UUID.

> Potential security ramifications?

### GET /statistics

Returns detailed statistics concerning all punishments. **This endpoint is cached** - it will only update every 5 minutes (by default). This value can be changed in the environment configuration.

### GET /statistics/timed

Fetches punishment counts over a period of time, grouped by days.

#### Query Params

-   `start` - The first dates to retrieve. **Default:** One week ago
-   `end` - The last date to retrieve. **Default:** Now

Both times are JavaScript timestamps (time since 1970 in milliseconds, or Unix timestamp \* 1000).

> To-do: Force endpoint to use beginning of the current day, regardless of input - allows for caching.

#### Example Response

```json
[
    {
        "date": "2020-06-06T23:14:07.370Z",
        "bans": 26,
        "kicks": 49,
        "mutes": 13,
        "warns": 12
    },
    {
        "date": "2020-06-07T23:14:07.370Z",
        "bans": 69,
        "kicks": 420,
        "mutes": 621,
        "warns": 12
    }
]
```

## License

made with 💜 by skye
