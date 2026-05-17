"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "../../../../services/api";

interface Job {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  contactName: string;
  contactEmail: string;
  status: string;
}

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [draftJob, setDraftJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchJob = async () => {
    try {
      const { data } = await API.get(`/jobs/${id}`);
      setJob(data);
      setDraftJob(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) fetchJob();
  }, [id]);

  const saveChanges = async () => {
    if (!draftJob) return;

    try {
      setLoading(true);

      const { data } = await API.patch(`/jobs/${id}`, {
        status: draftJob.status,
      });

      setJob(data);
      setDraftJob(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/jobs/${id}`);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!job || !draftJob) {
    return (
      <div className="p-10 text-center text-gray-600">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {job.title}
            </h1>
            <p className="text-gray-500 mt-1">
              Job Details Overview
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            ← Back Home
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          {job.description}
        </p>

        {/* Details Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-medium">{job.category}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium">{job.location}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Contact</p>
            <p className="font-medium">{job.contactName}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{job.contactEmail}</p>
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="font-semibold block mb-2 text-gray-700">
            Status
          </label>

          <select
            value={draftJob.status}
            onChange={(e) =>
              setDraftJob({ ...draftJob, status: e.target.value })
            }
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">

          <button
            onClick={deleteJob}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Delete Job
          </button>

          <button
            onClick={saveChanges}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>
    </div>
  );
}