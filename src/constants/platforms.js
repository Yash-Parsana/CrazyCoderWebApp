const PLATFORM_SLUGS = {
    codechef: 'code_chef',
    codeforces: 'codeforces',
    leetcode: 'leet_code',
    atcoder: 'at_coder',
};

const getPlatformSlug = (platform) => PLATFORM_SLUGS[platform?.toLowerCase()] ?? null;

export { getPlatformSlug };
