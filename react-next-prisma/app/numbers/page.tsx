'use server'

import { Suspense } from 'react';
import { Container, Typography, Box, Paper, Skeleton } from '@mui/material';
import NumberForm from '@/features/numbers/components/NumberForm';
import NumberPairsTable from '@/features/numbers/components/NumberPairsTable';
import TableSkeleton from '@/features/numbers/components/NumberPairsTableSkeleton';

export default async function NumbersPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Number Pairs Calculator
      </Typography>

      <NumberForm />

      <Box sx={{ mt: 4 }}>
        <Suspense fallback={<TableSkeleton />}>
          <NumberPairsTable />
        </Suspense>
      </Box>
    </Container>
  );
}