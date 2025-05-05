'use client';

import { Paper, Typography, Skeleton } from '@mui/material';

export default function TableSkeleton() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Adjacent Number Pairs
      </Typography>
      <Skeleton variant="rectangular" height={300} />
    </Paper>
  );
}