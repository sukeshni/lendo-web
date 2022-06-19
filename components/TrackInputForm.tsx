import { Form, FormField, TextInput, Button, Box, Heading, Text, CardHeader, CardBody, Card } from "grommet";
import { useState } from "react";
import useSWR from "swr";
import { get } from "../utils/apiCalls";

type TrackInputFormProps = {
  handleSubmit: (value: any) => void;
};
export const TrackInputForm = ({ handleSubmit }: TrackInputFormProps) => {
  const [value, setValue] = useState({application_id: ""});
  const applicationId = value?.application_id;

  let url = applicationId ? "/api/get_loan_application" : null;
  
  if (applicationId !== "") {
    const query = `?attribute=application_id&value=${applicationId}`;
    url = `${url}${query}`;
  }

  const { data, error } = useSWR(url, get);
  
  if (error) return <>An error has occurred.</>;

  let match = null;

  if(data) {
    match = data[0];
  }
  

  return (
    <>
      <Heading color="#565656" size="xxsmall">
        🔎 Track loan application
      </Heading>
      <Form
        value={value}
        onChange={(nextValue) => setValue(nextValue)}
        onReset={() => setValue({application_id: ""})}
        onSubmit={({ value }) => {
          handleSubmit(value);
        }}
      >
        <FormField
          name="application_id"
          htmlFor="text-input-loan-id"
          label="Loan application id"
        >
          <TextInput
            size="medium"
            id="text-input-loan-id"
            name="application_id"
            required
          />
        </FormField>

        <Box direction="row" gap="medium">
          {/* <Button type="submit" primary label="Track" /> */}
          {/* <Button type="reset" label="Reset" /> */}
        </Box>
      </Form>

      {match?.application_id && (

        <Card width="medium" pad="medium" background={match.status === "completed" ? "lightgreen" : "#ff9999"}>
        <CardBody >
          <Text weight="bold" size="large">
            Status: {match.status?.toUpperCase()}
          </Text>
          <Text size="large">
            Name: {`${match.first_name} ${match.last_name}`}
          </Text></CardBody>
</Card>
        
       )}
    </>
  );
};
