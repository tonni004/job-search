"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { searchJobs } from "@/lib/api";
import JobCard from "@/components/JobCard";
import { JobDetails} from "@/types/types";
import Loader from "@/components/Loader";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import {useRouter} from "next/navigation";

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [profileName, setProfileName] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const profileData = localStorage.getItem("profile");
    if (profileData) {
      const parsed = JSON.parse(profileData);
      setProfileName(parsed.name || "");
      if (!query) setQuery(parsed.desiredJob || "");
    }
  }, []);

  const { data, error, isLoading } = useSWR(
    debouncedQuery ? ["searchJobs", debouncedQuery] : null,
    () => searchJobs(debouncedQuery)
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  if (isCheckingAuth) return <div className="flex items-center justify-center min-h-screen"><Loader/></div>;

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <div className="flex justify-end mb-10">
        <Link
          href="/create-profile"
          className="inline-block mr-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
        >
          {profileName ? `Hi, ${profileName}!` : "Create Profile"}
        </Link>

      <Link
        href="/liked"
        className="inline-block mr-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
      >
        Liked 💙
      </Link>

        <LogoutButton />
      </div>

      <h1 className="text-2xl font-bold mb-8 text-center">Find Your <span className='text-blue-500'>Job</span> 👀</h1>
      <input
        type="text"
        className="w-full border p-2 rounded mb-4"
        placeholder="Enter job title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading && <Loader />}
      {error && <p>Error loading jobs</p>}
      {data?.data?.length > 0 ? (
        <div className="grid gap-4">
          {data.data.map((job: JobDetails) => (
            <JobCard key={job.job_id} job={job} />
          ))}
        </div>
      ) : (
        !isLoading && query && <p>No results</p>
      )}
    </main>
  );
}

