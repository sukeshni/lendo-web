import {
  Box,
  Heading,
  RadioButton,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";
import { useState } from "react";
import { Status } from "../pages";
import { capitalizeFirstLetter } from "../utils/stringUtils";

const Filters = ({ defaultFilter, onChange }: { defaultFilter: Status; onChange?: (status: Status) => void }) => {
  const [selected, setSelected] = useState(defaultFilter);
  return (
    <Box align="start">
      <Text weight={"bolder"} size="medium">Filter by application status</Text>
      {[Status.ALL, Status.PENDING, Status.COMPLETED, Status.REJECTED].map(
        (status) => (
          <Box key={status} margin={{ vertical: "small" }}>
            <RadioButton
              name="prop"
              checked={selected === status}
              label={status}
              onChange={() => {
                setSelected(status);
                onChange?.(status);
              }}
            />
          </Box>
        )
      )}
    </Box>
  );
};

export const LoanList = ({
  data,
  error,
  defaultFilter,
  handleFilterChange,
}: {
  data?: any;
  error?: string;
  defaultFilter: Status;
  handleFilterChange: (status: Status) => void;
}) => {
  if (error) return <>An error has occurred.</>;
  if (!data) return <>Loading...</>;

  return (
    <>
      <Filters defaultFilter={defaultFilter} onChange={handleFilterChange} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              Loan application id
            </TableCell>

            <TableCell scope="col" border="bottom">
              Status
            </TableCell>

            <TableCell scope="col" border="bottom">
              First name
            </TableCell>
            <TableCell scope="col" border="bottom">
              Last name
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell scope="row">
                <strong>{row.application_id}</strong>
              </TableCell>
              <TableCell>{row.status?.toUpperCase()}</TableCell>
              <TableCell>{capitalizeFirstLetter(row.first_name)}</TableCell>
              <TableCell>{capitalizeFirstLetter(row.last_name)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
