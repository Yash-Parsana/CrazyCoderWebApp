import React, { useEffect, useState, useMemo } from 'react';
import SelectionPanel from '../components/SelectionPanel';
import Board from '../components/Board';
import { fetchContestData } from '../services/fetchData';
import { formatTimestamp } from '../services/timeFormatter';
import HomeShimmer from './HomeShimmer';

function Home() {
    
    const {panelObj, boardHeadObj, dataConvertor} = useMemo(() => {
        const panelObj = {
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

        const boardHeadObj = {
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
                defaultValObj.row[0].text = 'No Ongoing Contest';
                setOnGoingContestData([defaultValObj]);
            }
            if (UcontestDataObj.length) {
                setUpComingContestData(UcontestDataObj);
                setContestData(UcontestDataObj);
            } else {
                defaultValObj.row[0].text = 'No Upcoming Contest';
                setUpComingContestData([defaultValObj]);
                setContestData([defaultValObj]);
            }
        };

        return {panelObj, boardHeadObj, dataConvertor}
    }, [])
     
    const defaultValObj = {
        row: [
            {
                text: '',
                width: 'w-1/2',
                ta: 'text-left',
            },
            {
                text: '-',
                width: 'w-1/4',
                ta: 'text-center',
            },
            {
                text: '-',
                width: 'w-1/4',
                ta: ' text-center',
            },
        ],
    };
    
    const [activePlatform, setActivePlatform] = useState('at_coder');
    const [contestType, setContestType] = useState('Upcoming');
    const [loading, setLoading] = useState(true);
    const [contestData, setContestData] = useState([]);
    const [onGoingContestData, setOnGoingContestData] = useState([]);
    const [upComingContestData, setUpComingContestData] = useState([]);

    const slectPlatform = (currPlatform) => {
        if(currPlatform === activePlatform){
            return;
        }
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

    

    useEffect(() => {
        async function callService() {
            const data = await fetchContestData(activePlatform);
            dataConvertor(data);
            setLoading(false);
        }
        callService();
    }, [activePlatform]);

    return (
        <>
            <div className='sticky top-0 bg-bgcolor'>
                <SelectionPanel
                    cornerButton={contestType}
                    activePlatform={activePlatform}
                    cornerBtnClickFun={changeContestType}
                    slectPlatform={slectPlatform}
                    {...panelObj}
                />
                <Board {...boardHeadObj} />
            </div>
            {loading && <HomeShimmer />}
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
