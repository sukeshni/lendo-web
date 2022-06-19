// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabaseClient } from "../../utils/databaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { update } = getDatabaseClient();
  // const {attribute, value} = req.query;
  console.log("---update");
  console.log(req.body);

  const payload = {
    status: req.body.data.status,
  };
  const match = {
    application_id: req.body.data.application_id,
  };
  const { data, error } = await update(payload, match);

  // Handle if no match found
  if (error) {
    res.status(500).json({ error: error });
  } else {
    res.status(200).json(data);
  }
}
