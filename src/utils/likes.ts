import { JobDetails } from "@/types/types";

export const getLikedJobs = (): JobDetails[] => {
  if (typeof window === 'undefined') return [];
  const liked = localStorage.getItem('likedJobs');
  return liked ? JSON.parse(liked) : [];
};

export const saveLikedJobs = (jobs: JobDetails[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('likedJobs', JSON.stringify(jobs));
};

export const toggleLikeJob = (job: JobDetails) => {
  const liked = getLikedJobs();
  const exists = liked.find(j => j.job_id === job.job_id);
  let updated;
  if (exists) {
    updated = liked.filter(j => j.job_id !== job.job_id);
  } else {
    updated = [...liked, job];
  }
  saveLikedJobs(updated);
};

export const isJobLiked = (jobId: string): boolean => {
  const liked = getLikedJobs();
  return liked.some(j => j.job_id === jobId);
};