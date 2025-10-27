import { useNavigate } from "react-router-dom"

function UserDetails({ userData }) {

const navigate = useNavigate();

const handleSubmit =() =>{
    navigate(`/user/${userData.login}`);
}

    if (userData) {
        return (
            <div className='flex bg-white rounded-2xl p-20 my-15'>
                <img src={userData.avatar_url}
                    alt="Avatar"
                    width="200" />
                <div className='px-20 py-4 border border-gray-300 ml-10'>
                    <h2 className='font-semibold text-3xl'>{userData.name || "No name available"}</h2>
                    <p className="flex mb-2 gap-8 mt-6"><span className="text-xl text-blue-900 font-semibold">Followers: </span><span className="font-bold text-xl">{userData.followers}</span></p>
                    <p className="flex mb-4 gap-7.5"><span className="text-xl font-semibold text-red-800">Following:</span> <span className="font-bold text-xl">{userData.following}</span></p>
                    <p className="text-lg font-semibold text-green-700">{userData.bio || "No bio available"}</p>
                </div>

             <button onClick={handleSubmit} className="bg-blue-500 cursor-pointer hover:bg-red-200 rounded min-h-10 m-15 px-4 py-1 w-30 text-white"> 
                View Repositories
             </button>

            </div>
        )
    }
}

export default UserDetails