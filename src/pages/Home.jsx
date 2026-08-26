import { useEffect, useState } from 'react';
import SelectionPanel from '../components/SelectionPanel';
import Board from '../components/Board';
import { fetchContestData } from '../services/fetchData';
import { formatTimestamp } from '../services/timeFormatter';
import SkeletonRows from '../components/SkeletonRows';

const CONTEST_ROW_WIDTHS = ['w-1/2', 'w-1/4', 'w-1/4'];

const PANEL_OBJ = {
    type: 'contest',
    platforms: [
        {
            name: 'Atcoder',
            slug: 'at_coder',
        },
        {
            name: 'Codechef',
            slug: 'code_chef',
        },
        {
            name: 'Codeforces',
            slug: 'codeforces',
        },
        {
            name: 'Hackerrank',
            slug: 'hacker_rank',
        },
        {
            name: 'Hackerearth',
            slug: 'hacker_earth',
        },
        {
            name: 'Leetcode',
            slug: 'leet_code',
        },
    ],
};

const BOARD_HEAD_OBJ = {
    bgc: 'bg-blue',
    px: 'px-2 lg:px-10',
    lipx: '',
    py: 'py-2 lg:py-5',
    fz: 'text-lg lg:text-xl',
    row: [
        {
            text: 'Contest Name',
            width: 'w-1/2',
            ta: 'text-left text-md lg:text-xl',
        },
        {
            text: 'Start Time',
            width: 'w-1/4',
            ta: 'text-center text-md lg:text-xl',
        },
        {
            text: 'End Time',
            width: 'w-1/4',
            ta: ' text-center text-md lg:text-xl',
        },
    ],
};

const makeDefaultContestRow = (text) => ({
    row: [
        { text, width: 'w-1/2', ta: 'text-left' },
        { text: '-', width: 'w-1/4', ta: 'text-center' },
        { text: '-', width: 'w-1/4', ta: ' text-center' },
    ],
});

function Home() {
    const [activePlatform, setActivePlatform] = useState('at_coder');
    const [contestType, setContestType] = useState('Upcoming');
    const [loading, setLoading] = useState(true);
    const [contestData, setContestData] = useState([]);
    const [onGoingContestData, setOnGoingContestData] = useState([]);
    const [upComingContestData, setUpComingContestData] = useState([]);

    const slectPlatform = (currPlatform) => {
        setLoading(true);
        setActivePlatform(currPlatform);
        setContestType('Upcoming');
    };

    const changeContestType = (type) => {
        if (type.toLowerCase() === 'upcoming') {
            setContestType('Ongoing');
            setContestData(onGoingContestData);
        } else {
            setContestType('Upcoming');
            setContestData(upComingContestData);
        }
    };

    const dataConvertor = (dataArray) => {
        const OcontestDataObj = [];
        const UcontestDataObj = [];
        if (dataArray.length) {
            dataArray.forEach((element) => {
                const startTime = formatTimestamp(element?.start_time);
                const endTime = formatTimestamp(element?.end_time);
                const obj = {
                    row: [
                        {
                            text: element?.name,
                            width: 'w-1/2',
                            ta: 'text-left text-sm lg:text-lg',
                        },
                        {
                            text: startTime,
                            width: 'w-1/4',
                            ta: 'text-center text-xs lg:text-lg',
                        },
                        {
                            text: endTime,
                            width: 'w-1/4',
                            ta: 'text-center text-xs lg:text-lg',
                        },
                    ],
                };
                if (element?.start_time > Date.now()) {
                    UcontestDataObj.push(obj);
                } else OcontestDataObj.push(obj);
            });
        }
        if (OcontestDataObj.length) {
            setOnGoingContestData(OcontestDataObj);
        } else {
            setOnGoingContestData([makeDefaultContestRow('No Ongoing Contest')]);
        }
        if (UcontestDataObj.length) {
            setUpComingContestData(UcontestDataObj);
            setContestData(UcontestDataObj);
        } else {
            setUpComingContestData([makeDefaultContestRow('No Upcoming Contest')]);
            setContestData([makeDefaultContestRow('No Upcoming Contest')]);
        }
    };

    useEffect(() => {
        let active = true;
        async function callService() {
            const data = await fetchContestData(activePlatform);
            if (!active) return;
            dataConvertor(data);
            setLoading(false);
        }
        callService();
        return () => {
            active = false;
        };
    }, [activePlatform]);

    return (
        <>
            <div className='sticky top-0 bg-bgcolor'>
                <SelectionPanel
                    cornerButton={contestType}
                    activePlatform={activePlatform}
                    cornerBtnClickFun={changeContestType}
                    slectPlatform={slectPlatform}
                    {...PANEL_OBJ}
                />
                <Board {...BOARD_HEAD_OBJ} />
            </div>
            {loading && <SkeletonRows widths={CONTEST_ROW_WIDTHS} />}
            {!loading && (
                <div className='flex flex-col min-h-96 lg:min-h-screen'>
                    {contestData.map((obj, index) => (
                        <Board key={index} {...obj} px={'lg:px-4'} lipx='px-2 lg:px-3' />
                    ))}
                </div>
            )}
        </>
    );
}

export default Home;
