import { useEffect, useState } from 'react';
import SelectionPanel from '../../components/SelectionPanel';
import InputPopUpForm from '../../components/InputPopUpForm';
import Board from '../../components/Board';
import SkeletonRows from '../../components/SkeletonRows';
import { getDocumentFromFireStore, setDocumentInFirestore } from '../../services/firebaseService';
import { useSelector } from 'react-redux';
import { fetchLeaderBoardDataController } from '../../services/fetchData';
import { getPlatformSlug } from '../../constants/platforms';

const RANK_ROW_WIDTHS = ['w-3/4', 'w-1/4'];

const PANEL_OBJ = {
    type: 'leaderboard',
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
            name: 'Leetcode',
            slug: 'leet_code',
        },
    ],
    cornerButton: 'Add Friend',
};

const BOARD_HEAD_OBJ = {
    bgc: 'bg-blue',
    px: 'px-6 lg:px-10',
    lipx: '',
    py: 'py-5 lg:py-5',
    fz: 'text-lg lg:text-xl',
    row: [
        {
            text: 'User Handle',
            width: 'w-3/4',
            ta: 'text-left',
        },
        {
            text: 'Rating',
            width: 'w-1/4',
            ta: 'text-center',
        },
    ],
};

function LeaderBoard() {
    const [activePlatform, setActivePlatform] = useState('at_coder');
    const [addFriendPopUp, setAddfriendPopUp] = useState(false);
    const [loading, setLoading] = useState(true);
    const [rankList, setRankList] = useState([]);
    const [handlesFb, setHandlesFb] = useState({}); //{myhandles:{code_chef:xyz,...}, friendshandles:{code_chef:[],...}}
    const userData = useSelector((state) => state.auth.userData);

    const slectPlatform = (currPlatform) => {
        setLoading(true);
        setAddfriendPopUp(false);
        setActivePlatform(currPlatform);
    };

    const showAddFriendPopup = async () => {
        setAddfriendPopUp(true);
    };

    const dataConvertor = (dataArray, mycurrhandle) => {
        const finalRankList = [];
        if (dataArray.length) {
            dataArray.forEach((element) => {
                const obj = {
                    row: [
                        {
                            text: '<span className="relative flex h-3 w-3 z-0"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-blue"></span></span>',
                            width: 'w-10',
                            ta: 'text-left',
                            visible: 'invisible',
                        },
                        {
                            text: element?.handle,
                            width: 'w-3/4',
                            ta: 'text-left',
                        },
                        {
                            text: element?.rating == '' ? 0 : element?.rating,
                            width: 'w-1/4',
                            ta: 'text-center',
                        },
                        {
                            text: '<span><img className="h-10" src="./delete.svg" /> </span>',
                            width: 'w-10',
                            ta: 'text-center',
                            visible: 'd',
                        },
                    ],
                };
                if (mycurrhandle?.toLowerCase() == element.handle?.toLowerCase()) {
                    obj.row[0].visible = 'visible';
                }
                finalRankList.push(obj);
            });
        }
        setRankList(finalRankList);
    };

    useEffect(() => {
        async function getHandles() {
            setLoading(true);
            const handles = await getDocumentFromFireStore('handles', userData.uid);
            setHandlesFb(handles ?? {});
        }
        getHandles();
        // Runs once for the session this component is mounted under; userData is
        // intentionally excluded so this doesn't re-fetch on every re-render.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        async function prapreRankList() {
            if (Object.keys(handlesFb).length) {
                setLoading(true);
                try {
                    const userList = [];
                    let mycurrhandle = null;
                    if (handlesFb.friendshandles?.[activePlatform])
                        userList.push(...handlesFb.friendshandles[activePlatform]);
                    if (handlesFb.myhandles?.[activePlatform]) {
                        mycurrhandle = handlesFb.myhandles[activePlatform];
                        userList.push(handlesFb.myhandles[activePlatform]);
                    }
                    const data = await fetchLeaderBoardDataController(activePlatform, userList);
                    dataConvertor(data.toSorted((a, b) => b?.rating - a?.rating), mycurrhandle);
                } catch (err) {
                    console.log(err);
                } finally {
                    setLoading(false);
                }
            } else {
                //handles is null
                setLoading(false);
            }
        }
        prapreRankList();
        // Depending on the active platform's own handle/friend-handle values (not
        // the whole handlesFb object) so this only re-fetches when those change.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handlesFb.friendshandles?.[activePlatform], handlesFb.myhandles?.[activePlatform], activePlatform]);

    function setPlatformHandles(handles, platform, platformArray) {
        handles.friendshandles = handles.friendshandles ?? {};
        handles.friendshandles[platform] = platformArray;
        return handles;
    }

    const isAddableAcc = async (platform, handle) => {
        const checkHandleExist = await fetchLeaderBoardDataController(platform, [handle]);
        let isUserExistOnPlatform = checkHandleExist.length && checkHandleExist[0].rating != null;
        let alreadyIncluded = false;
        if (handlesFb.friendshandles?.[platform]) {
            alreadyIncluded = ((handlesFb.friendshandles[platform].filter((ele)=> ele.toLowerCase() == handle.toLowerCase())).length > 0) || (handlesFb?.myhandles?.[platform])
        }
        return [isUserExistOnPlatform, alreadyIncluded];
    };

    const handleAddHandlepopupBtn = async (data) => {
        try {
            const platform = getPlatformSlug(data.platform);
            const handle = data?.handle?.trim();
            const isAddable = await isAddableAcc(platform, handle);
            console.log(isAddable);
            if (isAddable[0]) {
                if (isAddable[1]) {
                    setAddfriendPopUp(false);
                    return;
                }
                const platformArray = [handle];
                if (handlesFb.friendshandles?.[platform]) platformArray.push(...handlesFb.friendshandles[platform]);
                const updatedPlatformFb = setPlatformHandles(handlesFb, platform, platformArray);
                await setDocumentInFirestore('handles', userData.uid, updatedPlatformFb);
                setHandlesFb(updatedPlatformFb);
                setAddfriendPopUp(false);
            } else {
                throw new Error(`Handle ${handle} does not exist on ${platform}`);
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const closePopUp = () => {
        setAddfriendPopUp(false);
    };

    const handleDeleteClick = async (handle,isMyhandles) => {
        try {
            let obj = { ...handlesFb };
            if (isMyhandles) {
                delete obj.myhandles?.[activePlatform];
            }
            else {
                obj.friendshandles[activePlatform] = obj.friendshandles?.[activePlatform].filter((ele) => 
                    ele.trim().toLowerCase() != handle.trim().toLowerCase()
                )
            }
            setHandlesFb(obj);
            await setDocumentInFirestore('handles', userData.uid, obj);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className='sticky top-0 bg-bgcolor'>
                <SelectionPanel
                    {...PANEL_OBJ}
                    activePlatform={activePlatform}
                    slectPlatform={slectPlatform}
                    cornerBtnClickFun={showAddFriendPopup}
                />
                <Board {...BOARD_HEAD_OBJ} />
            </div>
            {addFriendPopUp && (
                <div className='absolute w-full bg-transparent'>
                    <InputPopUpForm
                        title={"Add Friend's Handle"}
                        element={{ label: 'User Handle', placeholder: ' ', field: 'handle' }}
                        optionManu={true}
                        btnClick={handleAddHandlepopupBtn}
                        closeBtn={closePopUp}
                    />
                </div>
            )}
            {loading && <SkeletonRows widths={RANK_ROW_WIDTHS} />}
            {!loading &&
                (rankList.length ? (
                    <div className='flex flex-col min-h-96 lg:min-h-screen'>
                        {rankList.map((obj, index) => (
                            <Board key={index} {...obj} px={''} lipx={''} deleteBtnClick={handleDeleteClick} />
                        ))}
                    </div>
                ) : (
                    <div className='min-h-96 lg:min-h-screen flex flex-col py-24 px-8'>
                        <h1 className='text-white text-3xl text-center h-fit'>
                            Please add your and your friend&apos;s platform handles.
                        </h1>
                        <h2 className='text-white text-xl text-center h-fit p-2'>
                            You can add your handle in profile section and your friend&apos;s handle at top left corner.
                        </h2>
                    </div>
                ))}
        </>
    );
}

export default LeaderBoard;
