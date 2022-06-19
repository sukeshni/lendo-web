// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabaseClient } from "../../utils/databaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { select } = getDatabaseClient();
  const { attribute, value } = req.query;

  const { data, error } = await select([attribute, value]);

  if (error) {
    res.status(500).json({ error: error });
  } else {
    res.status(200).json(data);
  }
}
