import Link from "next/link";

interface Job {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: string;
}

interface JobCardProps {
  job: Job;
  token: string | null;   // ✅ added
  user?: any;             // optional (if you use later)
}

export default function JobCard({ job, token, user }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-5">

      <h2 className="text-xl font-semibold mb-2">
        {job.title}
      </h2>

      <p className="text-gray-600 mb-3">
        {job.description}
      </p>

      <div className="space-y-1 mb-4 text-sm">

        <p>
          <span className="font-semibold">Category:</span> {job.category}
        </p>

        <p>
          <span className="font-semibold">Location:</span> {job.location}
        </p>

        <p>
          <span className="font-semibold">Status:</span> {job.status}
        </p>

      </div>

      {/* ✅ CONDITIONAL UI BASED ON TOKEN */}
      {token ? (
        <Link
          href={`/jobs/${job._id}`}
          className="bg-black text-white px-4 py-2 rounded inline-block"
        >
          View & Edit Details
        </Link>
      ) : (
        <Link
          href="/login"
          className="bg-gray-400 text-white px-4 py-2 rounded inline-block"
        >
          Login to View Details
        </Link>
      )}

    </div>
  );
}