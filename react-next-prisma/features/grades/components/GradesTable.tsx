'use client';

import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { EFilter, Grade, ClassAverage } from '../grades.types';

interface GradesTableProps {
  data: Grade[] | ClassAverage[];
  filter: EFilter;
}

export default function GradesTable({ data, filter = EFilter.ALL }: GradesTableProps) {
  const getColumnHeaders = () => {
    switch (filter) {
      case EFilter.CLASS_AVERAGES:
      case EFilter.PASSING_AVERAGE:
      case EFilter.HIGH_PERFORMING:
        return ['Class', 'Average Grade'];
      case EFilter.ALL:
      default:
        return ['ID', 'Class', 'Grade'];
    }
  };

  const renderTableRows = () => {
    if (data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={getColumnHeaders().length} align="center">
            No data available
          </TableCell>
        </TableRow>
      );
    }

    switch (filter) {
      case EFilter.CLASS_AVERAGES:
      case EFilter.PASSING_AVERAGE:
      case EFilter.HIGH_PERFORMING:
        return (data as ClassAverage[]).map((avg, index) => (
          <TableRow key={`${avg.class}-${index}`}>
            <TableCell>{avg.class}</TableCell>
            <TableCell>{Number(avg.average_grade).toFixed(2)}</TableCell>
          </TableRow>
        ));
      case EFilter.ALL:
      default:
        return (data as Grade[]).map((grade) => (
          <TableRow key={grade.id}>
            <TableCell>{grade.id}</TableCell>
            <TableCell>{grade.class}</TableCell>
            <TableCell>{grade.grade}</TableCell>
          </TableRow>
        ));
    }
  }

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
        Grades Data
      </Typography>

      <TableContainer component={Paper} elevation={0}>
        <Table aria-label="grades table">
          <TableHead>
            <TableRow>
              {getColumnHeaders().map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}