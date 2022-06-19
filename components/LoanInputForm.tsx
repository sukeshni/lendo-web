import { Form, FormField, TextInput, Button, Box, Heading } from "grommet";
import { useState } from "react";

type InputFormProps = {
  handleSubmit: (value: any) => void;
};
export const LoanInputForm = ({ handleSubmit }: InputFormProps) => {
  const [value, setValue] = useState({});
  return (
    <>
      <Heading color="#565656" size="xxsmall">
        🤑 Create loan application
      </Heading>
      <Form
        value={value}
        onChange={(nextValue) => setValue(nextValue)}
        onReset={() => setValue({})}
        onSubmit={({ value }) => {
          handleSubmit(value);
        }}
      >
        <FormField
          name="first_name"
          htmlFor="text-input-first-name"
          label="First name"
        >
          <TextInput
            size="medium"
            id="text-input-first-name"
            name="first_name"
            required
          />
        </FormField>
        <FormField
          name="last_name"
          htmlFor="text-input-last-name"
          label="Last name"
        >
          <TextInput
            size="medium"
            id="text-input-last-name"
            name="last_name"
            required
          />
        </FormField>

        <Box direction="row" gap="medium">
          <Button type="submit" primary label="Create" />
          <Button type="reset" label="Reset" />
        </Box>
      </Form>
    </>
  );
};
