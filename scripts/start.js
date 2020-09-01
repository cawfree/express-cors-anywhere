import express from "express";
import axios from "axios";
import { json } from "body-parser";

import redirectWithoutCors from "../src";

const { PORT } = process.env;
const port = PORT || 3000;

(async () => {
  await new Promise(
    resolve => express()
      .use(json())
      .use("/anywhere", redirectWithoutCors())
      .use("*", (_, res) => res.status(404).json({ error: "Failed to execute." }))
      .listen(port, resolve),
  );

  const { status, data } = await axios({
    url: `http://localhost:${port}/anywhere/https://www.google.com`,
    method: "get",
  });

  console.log({ status, data });
})();