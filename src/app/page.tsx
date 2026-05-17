"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API from "../../services/api";
import JobCard from "./jobs/components/JobCard";

interface Job {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  contactName: string;
  contactEmail: string;
  status: string;
  userId?: string;
}

export default function HomePage() {
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    const u = localStorage.getItem("user");
    setUser(u ? JSON.parse(u) : null);
  }, []);

  const fetchJobs = async () => {
    try {
      let url = "/jobs";
      const params: string[] = [];

      if (category) params.push(`category=${category}`);
      if (search) params.push(`search=${search}`);

      if (params.length > 0) url += `?${params.join("&")}`;

      const { data } = await API.get(url);
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [category, search]);

  const handleCreateJob = () => {
    router.push("/jobs/new");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeDetails = () => {
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">

      <div className="max-w-6xl mx-auto px-6 py-8">

        

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex justify-between items-center">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">

            {/* PROFILE */}
            {token && user ? (
              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center text-lg font-bold shadow-md">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "T"}
                </div>

                <div className="hidden sm:block">
                  <p className="text-xs text-gray-500">Logged in as Tradesperson</p>
                  <p className="font-semibold text-gray-800">
                    {user?.name || "User"}
                  </p>
                </div>

              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white">
                G
              </div>
            )}

            {/* TITLE */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Service Request Board
              </h1>

              <p className="text-gray-500 text-sm">
                Householders post jobs • Tradespeople respond
              </p>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex gap-3">

            {!token ? (
              <Link
                href="/login"
                className="px-4 py-2 bg-gray-800 text-white rounded-lg"
              >
                Trades Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Logout
              </button>
            )}

            <button
              onClick={handleCreateJob}
              className="px-4 py-2 bg-black text-white rounded-lg"
            >
              + Post Job (Free)
            </button>

          </div>

        </div>
        {/* 📌 INFO BANNER */}
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-2xl mb-6 text-sm">
          <p className="font-semibold mb-1">How this platform works:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li><b>Householders:</b> No login required — can post service requests freely.</li>
            <li><b>Tradespeople:</b> Must login to view full details and manage jobs.</li>
          </ul>
        </div>

        {/* FILTER */}
        <div className="bg-white p-4 rounded-2xl mb-6 grid md:grid-cols-3 gap-4">

          <input
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Painting">Painting</option>
            <option value="Joinery">Joinery</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setCategory("");
            }}
            className="bg-gray-100 rounded-lg"
          >
            Reset
          </button>

        </div>

        {/* JOB LIST */}
        <div className="grid md:grid-cols-3 gap-6">

          {jobs.map((job) => (
            <div
              key={job._id}
              onClick={() => handleViewDetails(job)}
              className="cursor-pointer hover:-translate-y-1 transition"
            >
              <JobCard job={job} user={user} token={token} />
            </div>
          ))}

        </div>

      </div>

      {/* MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl rounded-2xl p-6">

            <h2 className="text-2xl font-bold">{selectedJob.title}</h2>

            <p className="text-gray-600 mt-2">
              {selectedJob.description}
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <p><b>Category:</b> {selectedJob.category}</p>
              <p><b>Location:</b> {selectedJob.location}</p>
              <p><b>Contact:</b> {selectedJob.contactName}</p>
              <p><b>Email:</b> {selectedJob.contactEmail}</p>
              <p><b>Status:</b> {selectedJob.status}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeDetails}
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Close
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}