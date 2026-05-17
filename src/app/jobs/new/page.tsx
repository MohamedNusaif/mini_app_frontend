"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import API from "../../../../services/api1";

export default function CreateJobPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    contactName: "",
    contactEmail: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>(""); // Added for success message

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage(""); // Clear previous success message

    if (!formData.title || !formData.description) {
      setError("Title and description are required");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/jobs", {
        ...formData,
        postedBy: "guest", // optional tracking
      });

      // Show success alert/message instead of redirecting
      alert("✅ Job posted successfully! Tradespeople will contact you shortly.");
      setSuccessMessage("Job posted successfully!");
      
      // Optional: Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        contactName: "",
        contactEmail: "",
      });

      // If you still want to redirect after 2 seconds, uncomment below:
      // setTimeout(() => {
      //   router.push("/");
      // }, 2000);

    } catch (error: any) {
      console.log(error);
      const errorMsg = error.response?.data?.message || "Something went wrong";
      setError(errorMsg);
      alert(`❌ Error: ${errorMsg}`); // Show error alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 p-6">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Create Service Request
            </h1>
            <p className="text-sm text-gray-500">
              Post your request — no login required
            </p>
            <p className="text-sm text-green-600 font-medium mt-1">
              ✓ Tradespeople will contact you directly
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-white shadow-sm rounded-lg hover:bg-gray-100 transition"
          >
            ← Home
          </button>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg mb-6 text-sm">
              ✅ {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-6 text-sm">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* TITLE */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Need electrician for house wiring"
                value={formData.title}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Description *
              </label>
              <textarea
                name="description"
                placeholder="Describe your requirement in detail..."
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Painting">Painting</option>
                  <option value="Joinery">Joinery</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Your location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Contact Name
                </label>
                <input
                  type="text"
                  name="contactName"
                  placeholder="Your name"
                  value={formData.contactName}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  placeholder="you@example.com"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between pt-4">

              <button
                type="button"
                onClick={() => router.push("/")}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition shadow disabled:opacity-50"
              >
                {loading ? "Posting..." : "Post Request"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}