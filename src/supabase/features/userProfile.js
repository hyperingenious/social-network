import { supabase } from "../supabase"

export async function userProfile({ id }) {

    const { data: [userProfileData], error } = await supabase
        .from('UserTable')
        .select('*')
        .eq('id', id)

    if (error) {
        console.error(error)
        throw error;
    }

    // Getting the followers data
    const { data: followerData, error: followersError } = await supabase
        .from("following")
        .select("count", { count: "exact" })
        .eq("following", id);

    if (followersError) {
        console.error(followersError);
        throw followersError;
    }

    userProfileData.followers = followerData[0].count;

    // Getting the following data
    const { data: followingData, error: followingError } = await supabase.from('following').select("count", { count: "exact" })
        .eq("follower", id)

    if (followingError) {
        console.error(followingError);
        throw followingError;
    }

    userProfileData.following = followingData[0].count;

    // Getting the Posts data
    let { data: postCount, postCountError } = await supabase
        .from('Post')
        .select("count", { count: "exact" })
        .eq("user_id", id)

    if (postCountError) {
        console.error(postCountError);
        throw postCountError;
    }

    userProfileData.posts = postCount[0].count;

    return userProfileData;
}