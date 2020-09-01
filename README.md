# express-cors-anywhere
An [**express**](https://github.com/expressjs/express) middleware for redirecting requests and avoiding CORS errors when hitting cross-origin APIs.

## 🚀 Getting Started

Using [`yarn`](https://yarnpkg.com):

```sh
yarn add express-cors-anywhere
```

## ✍️ Usage

Just embed the `default` export at the route you wish to redirect requests from:

```javascript
import express from "express";
import axios from "axios";
import { json } from "body-parser";
import anywhere from "express-cors-anywhere";

const { PORT } = process.env;
const port = PORT || 3000;

(async () => {
  /* configure cors */
  await new Promise(
    resolve => express()
      .use(json())
      .use("/cors-anywhere", anywhere())
      .get("/hello", (_, res) => res.status(200).send("Hi!"))
      .listen(port, resolve),
  );
})();
```

Subsequently, all requests made to `http://localhost:3000/cors-anywhere` will be redirected from your server without cors headers using an identical format to [**CORS Anywhere**](https://cors-anywhere.herokuapp.com/). All you need to do is prefix the location of your middleware route to the required target URL.

As an example, say you wish to `POST` to a cross-origin API at `https://some-example-api.com/some-example-endpoint` from your browser. This would not work from your browser because a) it does not exist, and b) it relies on a resource provided by another origin. However, we can just make the same request to the middleware address instead:

```javascript
import axios from "axios";

(async () => {
  const { data, status } = await axios({
    url: "http://localhost:3000/cors-anywhere/https://some-example-api/some-example-endpoint",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      some: "data",
    },
  });
  /* data returned is from https://some-example-api/some-example-endpoint */
  console.log({ data });
});
```

## ✌️ License
[**MIT**](./LICENSE.md)
