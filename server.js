import {getPrompts} from "./src/backend/utils.js";
import express from "express";
import {fileURLToPath} from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const port = 3000;
server.use(express.static(path.join(__dirname, "src/frontend")));

server.get("/", (req, res) =>
{
  //res.sendFile(path.join(__dirname, "/src/frontend/index.html"));
  res.sendFile("src/frontend/index.html", {root: __dirname});
});

server.get("/getData", async(req, res) =>
{
  try
  {
    const prefixTerms = req.query.prefixes.split(",");
    const pages = [1, 2, 3, 4, 5];
    const perPage = 50;
    const responseData = [];

    for(const prefixTerm of prefixTerms)
    {
      const storeObj = {prefixTerm, skus: []};
      for(const page of pages)
      {
        const apiUrl = `https://www.1mg.com/pharmacy_api_gateway/v4/drug_skus/by_prefix?prefix_term=${prefixTerm}&page=${page}&per_page=${perPage}`;
        const response = await fetch(apiUrl);
        const result = await response.json();
        let skus = result?.data?.skus;
        if(skus)
        {
          const prompts = getPrompts(skus);
          storeObj.skus.push(...prompts);
        }

      }
      responseData.push(storeObj);
    }

    res.json(responseData);
  }
  catch(error)
  {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

server.listen(port, () =>
{
  console.log(`Example app listening on port ${port}`);
});

