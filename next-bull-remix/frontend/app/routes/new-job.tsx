import { SubmitHandler, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Job } from "../../api/jobs/jobs.interfaces";
import { useCreateJob } from "../../api/jobs/jobs.queries";

const schema = z.object({
  user_id: z.string().min(1),
  prompt: z.string().min(1),
});

function NewJob() {
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });
  const { mutate } = useCreateJob();
  const onSubmit: SubmitHandler<Job> = (data: Job) => {
    mutate(data);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Job</h2>
        <form method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="user_id" className="block mb-2 text-sm font-medium text-gray-300">
              User ID
            </label>
            <input
              id="user_id"
              type="text"
              {...register("user_id")}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder="Enter user ID"
            />
          </div>
          <div>
            <label htmlFor="prompt" className="block mb-2 text-sm font-medium text-gray-300">
              Prompt
            </label>
            <input
              id="prompt"
              type="text"
              {...register("prompt")}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              placeholder="Enter your prompt"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md text-white font-medium transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewJob;
