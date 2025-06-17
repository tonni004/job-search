"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import { getJobDetails } from "@/lib/api";
import Loader from "@/components/Loader";
import BackButton from "@/components/BackButton";

export default function JobDetailsPage() {
  const { id } = useParams();

  const { data, error, isLoading } = useSWR(
    id ? ["job-details", id] : null,
    () => getJobDetails(id as string)
  );

  if (error) return <p className="text-red-500">Failed to load job details.</p>;
  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><Loader /> </div>;

  const job = data?.data?.[0];

  if (!job) return <div className="flex items-center justify-center min-h-screen"><p>No job found.</p></div>;

    return (
    <main className="p-8 max-w-3xl mx-auto">
    <h1 className="text-3xl font-bold mb-2">{job.job_title}</h1>
      {job.employer_logo && (
        <img
          src={job.employer_logo}
          alt={job.employer_name}
          className="w-10 h-10 object-contain mb-4"
        />
      )}
      <p className="text-gray-600 mb-2">{job.job_location}</p>
      <p className="mb-4 whitespace-pre-line">{job.job_description}</p>

      <div className="flex justify-between items-center mt-8">

        <BackButton />

        {job.job_apply_link && (
          <a
            href={job.job_apply_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Apply Now
          </a>
        )}
      </div>
    </main>
  );
}

