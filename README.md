## Endpoint

### 収入

/report/income

GET 全件
GET /:id 1件
POST 登録 { "source": "Youtube", "amount": 3000 }
PUT /:id アップデート { "source": "Youtube", "amount": 3000 }
DELETE /:id

### 出費

/report/expense

GET 全件
GET /:id 1件
POST 登録 { "source": "Youtube", "amount": 3000 }
PUT /:id アップデート { "source": "Youtube", "amount": 3000 }
DELETE /:id

### 合計

/summary

GET 収入, 出費, 差額

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

