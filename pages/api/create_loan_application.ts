// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getDatabaseClient } from "../../utils/databaseClient";
import { sendToSQS, readFromSqs } from "../../utils/sqs";

const tellBanktoCreateApplication = (payload: any) => {
  fetch("http://localhost:8000/api/applications", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const { insert } = getDatabaseClient();
  const { firstName, lastName } = JSON.parse(req.body);

  const payload = {
    first_name: firstName,
    last_name: lastName,
    status: "pending",
  };

  const { data, error } = await insert(payload);
  console.log(data, error);

  if (error) {
    res.status(500).json({ error: error });
  } else {
    res.status(200).json({ application_id: data[0] });
  }

  if (data) {
    const loanApplication = data[0];
    tellBanktoCreateApplication({
      id: loanApplication.application_id,
      first_name: loanApplication.first_name,
      last_name: loanApplication.last_name,
    });
    console.log("----sendMessage1");

    if (loanApplication.application_id) {
      sendToSQS(data);
    }
  }
}
