import axios from 'axios';

const fetchContestData = async (platform) => {
    const url = `${import.meta.env.VITE_SERVER_URL}/schedule/${platform}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const fetchRanks = async (url) => {
    try {
        const response = axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const fetchFullRankingData = async (platform, username) => {
    if (!username) return null;
    try {
        const url = `${import.meta.env.VITE_SERVER_URL}/ranking/${platform}/${username}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    } catch (err) {
        console.log(err);
    }
};

const fetchLeaderBoardDataController = async (platform, users) => {
    let response = null;
    try {
        if (platform == 'codeforces') {
            let url = `${import.meta.env.VITE_SERVER_URL}/ranking/${platform}/`;
            users.forEach((element) => {
                url += element + ';';
            });
            response = await fetchRanks(url);

            const rankList = [];
            response?.data?.forEach((element) => {
                rankList.push({
                    handle: element?.handle,
                    rating: element?.rating,
                });
            });
            return rankList;
        } else {
            const prmoiseArr = [];
            users.forEach((element) => {
                const url = `${import.meta.env.VITE_SERVER_URL}/ranking/${platform}/${element}`;
                prmoiseArr.push(fetchRanks(url));
            });
            response = await Promise.all(prmoiseArr);

            const rankList = [];
            response.forEach((element) => {
                if (element.data.handle && element.data.rating != null) {
                    rankList.push({
                        handle: element.data.handle,
                        rating: element.data.rating,
                    });
                }
            });
            return rankList;
        }
    } catch (err) {
        console.log(err);
        return [];
    }
};

export { fetchContestData, fetchLeaderBoardDataController, fetchFullRankingData };
