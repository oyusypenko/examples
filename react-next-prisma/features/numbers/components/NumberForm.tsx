'use client';

import { Typography, TextField, Button, Paper, Alert, Snackbar } from '@mui/material';
import { addNumber } from '@/features/numbers/actions/numbers.actions';
import { useActionState, useState } from 'react';
import { FormState } from '@/features/numbers/numbers.types';

export default function NumberForm() {
  const [success, setSuccess] = useState<boolean>(false);

  const initialState: FormState = { message: '', error: false };
  const [formState, formAction] = useActionState(addNumber, initialState);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 4,
        bgcolor: 'background.paper',
        borderRadius: 2
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add a New Number
      </Typography>

      <form action={formAction} style={{ marginTop: '8px' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="number"
          label="Enter a number"
          name="number"
          type="number"
          autoFocus
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 1, mb: 2 }}
        >
          Add Number
        </Button>
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
        >
          <Alert
            onClose={() => setSuccess(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            Grade added successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!formState.error}
          autoHideDuration={6000}
          onClose={() => formAction(new FormData())}
        >
          <Alert
            onClose={() => formAction(new FormData())}
            severity="error"
            sx={{ width: '100%' }}
          >
            {formState.message}
          </Alert>
        </Snackbar>
      </form>
    </Paper>
  );
}