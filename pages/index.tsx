import { Heading, Main, Text } from "grommet";
import type { NextPage } from "next";
import { useState } from "react";
import useSWR from "swr";
import { LoanInputForm } from "../components/LoanInputForm";
import { LoanList } from "../components/LoanList";
import { TrackInputForm } from "../components/TrackInputForm";
import { createLendoLoanApplication, get } from "../utils/apiCalls";


export enum Status {
  ALL = "all",
  PENDING = "pending",
  COMPLETED = "completed",
  REJECTED = "rejected",
}

const Home: NextPage = () => {
  const [applicationData, setApplicationData] = useState({
    application_id: "",
  });

  const [filterByStatus, setFilterByStatus] = useState(Status.ALL);

  let url = "/api/get_loan_application";

  if (filterByStatus !== Status.ALL) {
    const query = `?attribute=status&value=${filterByStatus}`;
    url = `${url}${query}`;
  }

  const { data, error } = useSWR(url, get);

  const handleCreate = async (payload: any) => {
    const data = await createLendoLoanApplication(payload);
    setApplicationData(data.application_id);
  };

  const handleUpdate = async () => {
    console.log("updated");
    const response = await fetch("api/update_loan_application", {
      method: "POST",
      body: JSON.stringify({
        application_id: "75df59f1-fb87-4905-af49-aad0317ec99f",
        status: "completed",
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const data = await response.json();
  };

  const handleSubmit = (value: any) => {
    handleCreate({
      firstName: value.first_name,
      lastName: value.last_name,
    });
  };

  const handleStatusChange = (status: Status) => {
    setFilterByStatus(status);
  };

  return (
    <Main pad="large">
      <Heading margin="none" color="#2ac768">
        Lendo
      </Heading>

      {applicationData?.application_id && (
        <>
          <br />
          <br />
          <Text color={"green"} weight="bold" size="large">
            Your Loan application received: {applicationData?.application_id}
          </Text>
        </>
      )}

      <br />
      <br />
      <LoanInputForm handleSubmit={handleSubmit} />

      <br />
      <br />
      <br />
      <br />
      <TrackInputForm handleSubmit={(value: any) => {console.log(value.application_id);
      }} />

      <br />
      <br />
      <br />
      <br />

      <LoanList
        data={data}
        error={error}
        defaultFilter={filterByStatus}
        handleFilterChange={handleStatusChange}
      />
    </Main>
  );
};

export default Home;
