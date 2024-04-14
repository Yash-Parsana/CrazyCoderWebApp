function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    const formattedDate = date.toLocaleString('en-GB', options);
    return formattedDate;
}

export {formatTimestamp}