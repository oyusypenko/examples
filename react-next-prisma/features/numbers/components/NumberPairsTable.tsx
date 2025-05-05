'use server'

import { NumbersRepository } from '@/features/numbers/repository/numbers.repository';
import {
  Paper, Typography, TableContainer, Table,
  TableHead, TableRow, TableCell, TableBody
} from '@mui/material';

export default async function NumberPairsTableServer() {
  const numberPairs = await NumbersRepository.findNumberPairs();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2
      }}
    >
      <Typography variant="h6" gutterBottom>
        Adjacent Number Pairs
      </Typography>

      {numberPairs?.length > 0 ? (
        <TableContainer component={Paper} elevation={0}>
          <Table aria-label="number pairs table">
            <TableHead>
              <TableRow>
                <TableCell>ID 1</TableCell>
                <TableCell>Number 1</TableCell>
                <TableCell>ID 2</TableCell>
                <TableCell>Number 2</TableCell>
                <TableCell>Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {numberPairs.map((pair: any) => (
                <TableRow
                  key={`${pair.id_1}-${pair.id_2}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{pair.id_1}</TableCell>
                  <TableCell>{pair.value_1}</TableCell>
                  <TableCell>{pair.id_2}</TableCell>
                  <TableCell>{pair.value_2}</TableCell>
                  <TableCell>{pair.sum}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
          No number pairs found. Add at least two numbers to see pairs.
        </Typography>
      )}
    </Paper>
  );
}