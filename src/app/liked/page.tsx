"use client";

import { useEffect, useState } from "react";
import { JobDetails } from "@/types/types";
import JobCard from "@/components/JobCard";
import { getLikedJobs, saveLikedJobs } from "@/utils/likes";
import BackButton from "@/components/BackButton";

export default function LikedPage() {
  const [likedJobs, setLikedJobs] = useState<JobDetails[]>([]);

  useEffect(() => {
    setLikedJobs(getLikedJobs());
  }, []);

  const handleLikeToggle = (jobId: string) => {
    const updated = likedJobs.filter(job => job.job_id !== jobId);
    setLikedJobs(updated);
    saveLikedJobs(updated);
  };

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Liked Jobs 💙</h1>
      {likedJobs.length > 0 ? (
        <div className="grid gap-4">
          {likedJobs.map(job => (
            <JobCard
              key={job.job_id}
              job={job}
              onLikeToggle={handleLikeToggle}
            />
          ))}
        </div>
      ) : (
        <p>No liked jobs yet.</p>
      )}
      <div className="mt-8">
        <BackButton />
      </div>
    </main>
  );
}
