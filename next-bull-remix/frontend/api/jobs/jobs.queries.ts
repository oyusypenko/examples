import { useMutation } from "@tanstack/react-query";
import { Job } from "./jobs.interfaces";

export const useCreateJob = () => {
  return useMutation({
    mutationFn: async (job: Job) => {
      console.log('job111', job);
      await fetch('http://localhost:3001/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });
    },
  });
}