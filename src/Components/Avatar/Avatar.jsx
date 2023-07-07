

export default function Avatar({ username, userIndex }) {
    const colors = ['bg-red-200', 'bg-green-200', 'bg-purple-200', 'bg-blue-200','bg-yellow-200', 'bg-teal-200']
    const colorInd = userIndex % colors.length
    const color = colors[colorInd]
    return (
        <div className={"w-8 h-8 rounded-full flex items-center "+ color}>
            <div className="text-center w-full opacity-70">
                {username[0]}
            </div>

        </div>
    )
}