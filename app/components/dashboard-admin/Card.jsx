export function Card({ title, value }) {
    return (
        <div
            className="
                p-6 rounded-2xl bg-white border border-gray-200 
                shadow-sm hover:shadow-md transition-all duration-200
                flex flex-col items-center text-center
            "
        >
            <p className="text-gray-500 text-sm font-medium">{title}</p>

            <p className="text-3xl font-semibold mt-1 tracking-wide text-gray-900">
                {value}
            </p>
        </div>
    );
}
