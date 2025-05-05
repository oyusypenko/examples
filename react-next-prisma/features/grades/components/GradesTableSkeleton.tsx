'use client';

import { Paper, Typography, Skeleton } from '@mui/material';

export default function GradesTableSkeleton() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Grades Data
      </Typography>
      <Skeleton variant="rectangular" height={300} />
    </Paper>
  );
}