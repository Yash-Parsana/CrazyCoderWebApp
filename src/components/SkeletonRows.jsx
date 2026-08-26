function SkeletonRow({ widths }) {
    return (
        <ul className='flex h-auto my-5'>
            {widths.map((width, index) => (
                <li key={index} className={`${width} h-5 animate-pulse bg-blue rounded-2xl mx-3`}></li>
            ))}
        </ul>
    );
}

function SkeletonRows({ widths, count = 10 }) {
    return (
        <div className='flex flex-col h-full px-2 lg:px-8'>
            {Array.from({ length: count }, (_, index) => (
                <SkeletonRow key={index} widths={widths} />
            ))}
        </div>
    );
}

export default SkeletonRows;
