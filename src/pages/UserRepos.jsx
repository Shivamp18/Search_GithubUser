import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { FaStar } from "react-icons/fa";
import ErrorMessage from "../components/ErrorMessage";

function UserRepo({ mode }) {
  const { username } = useParams();
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const perPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.github.com/users/${username}`)
        if (!res.ok) {
          setError("User Not Found")
        }
        const data = await res.json();
        const repoCount = data.public_repos;
        setTotalPages(Math.ceil(repoCount / perPage));
        const repoRes = await fetch(
          `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`
        );
        if (!repoRes.ok) throw new Error("Failed to load repositories");
        const repoData = await repoRes.json();
        setRepos(repoData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [username, page]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-8 px-4 transition-colors duration-300 ${
        mode === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="flex flex-col sm:flex-row w-full max-w-5xl justify-between items-center gap-4 sm:gap-0">
        <h1
          className={`px-4 py-2 rounded-md transition ${
            mode === "dark"
              ? "bg-white text-black"
              : "bg-green-400 text-white"
          }`}
        >
          {username}'s Repositories
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition cursor-pointer w-full sm:w-auto"
        >
          Back
        </button>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <div className="flex justify-center items-center flex-1 mt-20">
          <CircularProgress
            size={60}
            thickness={5}
            color={mode === "dark" ? "inherit" : "primary"}
          />
        </div>
      ) : (
        <>
          <div className="w-full max-w-5xl mt-6">
            <ul className="space-y-4">
              {repos.map((repo) => (
                <li
                  key={repo.id}
                  className={`flex flex-col sm:flex-row justify-between border-2 rounded-lg p-4 items-start sm:items-center transition-colors duration-300 ${
                    mode === "dark"
                      ? "bg-gray-800 border-gray-400 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                >
                  <div className="w-full sm:w-auto">
                    <h2 className="text-lg sm:text-xl font-semibold wrap-break-word">
                      {repo.name}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base wrap-break-word">
                      {repo.description || "No description"}
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-0 flex flex-col lg:items-end md:items-end text-sm sm:text-base">
                    <p className="flex items-center gap-1">
                      <FaStar className="text-yellow-600" /> {repo.stargazers_count}
                    </p>
                    <p>{repo.language || "NA"}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {totalPages > 1 && (
            <div className="mt-8">
              <Stack spacing={2} alignItems="center">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                  color="primary"
                />
              </Stack>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserRepo;
