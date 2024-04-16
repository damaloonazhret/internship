export function slicedData(userInfo, userRepo) {
    const userInfoMy = {
        name: userInfo['name'],
        html_url: userInfo['html_url'],
        avatar_url: userInfo['avatar_url'],
        login: userInfo['login'],
    }
    const userRepoMy = userRepo.map(({full_name, language, visibility, html_url, created_at}) => ({
        full_name,
        language,
        visibility,
        html_url,
        created_at,
    }));
    return {userInfoMy, userRepoMy};
}