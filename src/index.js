import express from "express";
import cors from "cors";
import axios from "axios";
import { typeCheck } from "type-check";

const defaultOptions = {};

export default (options = defaultOptions) => {

  /* placeholder sanity for future functionality */
  if (!typeCheck("Object", options)) {
    throw new Error(`Expected Object options, encountered ${options}.`);
  } else if (Object.keys(options).length) {
    throw new Error(`Expected an empty Object, encountered ${Object.keys(options).join(",")}.`);
  }

  return express()
    .use(cors({ origin: (origin, callback) => callback(null, true) }))
    .use(
      async (req, res, next) => {
        try {
          const { path, method, headers, body } = req;
          
          const url = path.substring(1);
          const { host: ignored, ...extras } = headers;

          const { data, status } = await axios({
            url,
            method: method.toLowerCase(),
            headers: extras,
            data: body,
          });

          return res
            .status(status)
            .send(data);
        } catch (e) {
          const { response } = e;
          if (response) {
            const { status, data } = response;
            return res
              .status(status)
              .json(data);
          }
          return next(e);
        }
      },
    );
};
