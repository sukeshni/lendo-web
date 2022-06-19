export const get = (url: string) => fetch(url).then((res) => res.json());

const post = async (url: string, body: any) => {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  }).then((response) => response.json());
}

export const createLendoLoanApplication = async (payload: any) => {
  return post("api/create_loan_application", payload);
};