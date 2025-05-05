"use client";

import { useActionState } from 'react';

import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from '@mui/material';
import { addGrade } from '@/features/grades/actions/grades.actions';
import { FormState } from '../grades.types';


export default function GradeForm() {

  const initialState: FormState = { message: '', error: false };
  const [formState, formAction] = useActionState(addGrade, initialState);

  return (
    <>
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
          Add a New Grade
        </Typography>

        <Box component="form" action={formAction} noValidate sx={{ mt: 1 }}>
          <Stack spacing={2}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="class-select-label">Class</InputLabel>
              <Select
                labelId="class-select-label"
                id="class-select"
                name="class"
                label="Class"
                defaultValue=""
              >
                <MenuItem value="Math">Math</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="History">History</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              id="grade"
              label="Grade (0-100)"
              name="grade"
              type="number"
              inputProps={{ min: 0, max: 100 }}
              defaultValue=""
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Grade
            </Button>
          </Stack>
        </Box>
      </Paper>

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
    </>
  );
}