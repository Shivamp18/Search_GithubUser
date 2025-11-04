import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Skeleton from "@mui/material/Skeleton";
import ErrorMessage from "../components/ErrorMessage";

function UserRepo({ mode }) {
  const { username } = useParams();
  const [repoList, setRepoList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [moreData, setMoreData] = useState(true);
  const [error, setError] = useState("");

  const itemsPerPage = 10;

  const loadRepos = async () => {
    if (loading || !moreData) return;

    try {
      setLoading(true);
      const res = await fetch(
        `https:api.github.com/users/${username}/repos?page=${pageNo}&per_page=${itemsPerPage}&sort=updated`
      );

      if (!res.ok) {
        throw new Error("Something went wrong while fetching repos");
      }

      const data = await res.json();

      if (data.length === 0) {
        setMoreData(false);
      } else {
        setRepoList((prev) => [...prev, ...data]);
        setPageNo((prev) => prev + 1);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadRepos();
  }, [username]);


  useEffect(() => {
    const handleScroll = () => {
      const reachedBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;

      if (reachedBottom && !loading && moreData) {
        loadRepos();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, moreData]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-8 px-4 ${mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        }`}
    >
      <h1
        className={`px-4 py-2 rounded-md font-semibold ${mode === "dark"
          ? "bg-white text-black"
          : "bg-green-500 text-white"
          }`}
      >
        {username}'s Repositories
      </h1>

      <ErrorMessage message={error} />

      <div className="w-full max-w-5xl mt-6">
        <ul className="space-y-4">
          {repoList.map((repo) => (
            <li
              key={repo.id}
              className={`border-2 rounded-lg p-4 flex flex-col sm:flex-row justify-between sm:items-center ${mode === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
                }`}
            >
              <div>
                <h2 className="text-lg font-semibold">{repo.name}</h2>
                <p className="text-sm mt-1">
                  {repo.description ? repo.description : "No description"}
                </p>
              </div>
              <div className="mt-2 sm:mt-0 flex flex-col sm:items-end text-sm">
                <p className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" /> {repo.stargazers_count}
                </p>
                <p>{repo.language ? repo.language : "N/A"}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {loading && moreData && (
        <div className="w-full max-w-5xl mt-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`border-2 rounded-lg p-4 ${mode === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
                }`}
            >
              <Skeleton
                variant="text"
                width="60%"
                height={24}
                animation="wave"
                className={mode === "dark" ? "bg-gray-700" : "bg-gray-300"}
              />
              <Skeleton
                variant="text"
                width="90%"
                height={18}
                animation="wave"
                className={`mt-2 ${mode === "dark" ? "bg-gray-700" : "bg-gray-300"
                  }`}
              />
              <Skeleton
                variant="text"
                width="40%"
                height={18}
                animation="wave"
                className={`mt-2 ${mode === "dark" ? "bg-gray-700" : "bg-gray-300"
                  }`}
              />
            </div>
          ))}
        </div>
      )}

      {!moreData && !loading && (
        <p className="text-gray-500 mt-6">No more repositories found.</p>
      )}
    </div>
  );
}

export default UserRepo;
