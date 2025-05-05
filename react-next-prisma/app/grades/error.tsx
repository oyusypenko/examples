'use client';

import { useEffect } from 'react';
import { Container, Typography, Button, Paper, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Grades error:', error);
  }, [error]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />

        <Typography variant="h4" component="h1" gutterBottom color="error">
          Something went wrong!
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
          {error.message || "We couldn't load the grades data. Please try again."}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => reset()}
            size="large"
          >
            Try Again
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}