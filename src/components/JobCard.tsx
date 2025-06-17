"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { JobDetails } from "@/types/types";
import { isJobLiked, toggleLikeJob } from "@/utils/likes";

interface JobCardProps {
  job: JobDetails;
  onLikeToggle?: (jobId: string) => void;
}

export default function JobCard({ job, onLikeToggle }: JobCardProps) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isJobLiked(job.job_id));
  }, [job.job_id]);

  const handleLike = () => {
    toggleLikeJob(job);
    setLiked(prev => !prev);
    onLikeToggle?.(job.job_id); // повідомити батька
  };

  return (
    <div className="border p-4 rounded shadow flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">{job.job_title}</h2>
        <p className="text-sm text-gray-600">{job.employer_name}</p>
      </div>

      <div className="flex gap-2 items-center">
        <Link href={`/job-details/${job.job_id}`}>
          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            Details
          </button>
        </Link>

        <button
          onClick={handleLike}
          className={`px-3 py-1 rounded transition-colors duration-200 
            ${liked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'} 
            hover:bg-blue-200 hover:text-blue-700`}
        >
          {liked ? "💙" : "🤍"}
        </button>
      </div>
    </div>
  );
}
