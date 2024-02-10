import { supabase } from "../supabase";

export async function peopleToFollow({ id }) {
    const { data, error } = await supabase
        .from('UserTable')
        .select('*')
        .neq('id', id)

    if (error) {
        console.error(error);
        throw error;
    }

    // Get the list of users the current user is following
    const { data: followingList, error: followingError } = await supabase
        .from('following')
        .select('following')
        .eq('follower', id);

    if (followingError) {
        console.error(followingError);
        throw followingError;
    }

    // Map through the users and check if the current user follows each of them
    const result = data.map(user => {
        const isFollowing = followingList.some(following => following.following === user.id);
        return {
            ...user,
            isFollowing,
        };
    });

    return result;
} 