
function ErrorMessage({ message }) {

    if (message) {
        return (
            <p className='border border-red-500 bg-red-300 text-red-900 my-6 px-2 py-2 rounded'>{message}</p>
        )
    }

}

export default ErrorMessage