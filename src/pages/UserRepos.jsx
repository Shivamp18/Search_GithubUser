

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { FaStar } from 'react-icons/fa'
import ErrorMessage from "../components/ErrorMessage";

function UserRepo({ mode }) {
  const { username } = useParams()
  const [repos, setRepos] = useState([])
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const perPage = 5;
  const navigate = useNavigate()


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
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()

  }, [username, page])



  return (
    <div className={`min-h-screen flex flex-col items-center py-10 px-4 transition-colors duration-300 ${mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}>
      <div className="flex w-full max-w-5xl justify-between items-center">
        <h1 className={`px-4 py-2 rounded-md mb-8 transition cursor-pointer ${mode === "dark"
          ? "bg-white hover:bg-grey-600 text-black"
          : "bg-green-400 hover:bg-green-500 text-white"
        }`}>
        {username}'s Repositories
      </h1>

      <button
        onClick={() => navigate(-1)}
        className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md mb-8 transition cursor-pointer"
      >
        Back
      </button>
      </div>

      <ErrorMessage message={error} />

      <div className="border w-full max-w-5xl rounded-lg">
        <ul>
          {repos.map((repo) => (
            <li key={repo.id} className={`flex justify-between border p-4 items-center transition-colors duration-300 ${mode === "dark"
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
              }`}>
              <div>
                <h2 className="text-xl font-semibold">{repo.name}</h2>
                <p className="mt-4">{repo.description || "No description"}</p>
              </div>
              <div>
                <p className="flex items-center gap-1 justify-end"><FaStar className="text-yellow-600" /> {repo.stargazers_count}</p>
                <p>{repo.language || "NA"}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {totalPages > 1 && (
        <div className="mt-10">
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
    </div>

  )
}

export default UserRepo