const formatTimestamp = (timestamp)=> {
    const date = new Date(timestamp);

    // Format date using Intl.DateTimeFormat (user's locale)
    const formatter = new Intl.DateTimeFormat('en-US', {
        // Specify locale for consistent formatting (optional)
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });
    const formattedDate = formatter.format(date);

    // Format time using toLocaleTimeString with 12-hour clock
    const formattedTime = date.toLocaleTimeString('en-US', {
        // Specify locale for consistent formatting (optional)
        hour12: true,
        minute: 'numeric',
    });

    return {
        date: formattedDate,
        time: formattedTime,
    };
}

export {
    formatTimestamp
}
