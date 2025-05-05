'use server'

import { Container, Typography, Box, Paper } from '@mui/material';
import GradeForm from '@/features/grades/components/GradeForm';
import GradesFilterControls from '@/features/grades/components/GradesFilterControls';
import { EFilter } from '@/features/grades/grades.types';
import GradesTableContainer from '@/features/grades/components/GradesTableContainer';


export default async function GradesPage({
  searchParams
}: {
  searchParams?: Promise<{ filter?: string }>
}) {
  const data = await searchParams;

  const filter = (data?.filter && Object.values(EFilter).includes(data.filter as EFilter))
    ? data.filter as EFilter
    : EFilter.ALL;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Grades Management
      </Typography>

      <GradeForm />

      <Paper
        elevation={3}
        sx={{
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2
        }}
      >
        <GradesFilterControls currentFilter={filter} />

        <Box sx={{ mt: 2 }}>
          <GradesTableContainer filter={filter} />
        </Box>
      </Paper>
    </Container>
  );
}