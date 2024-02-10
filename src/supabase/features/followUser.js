import { supabase } from "../supabase";

export async function followUser({ follower, following }) {
    const { error } = await supabase
        .from('following')
        .insert([
            { follower, following },
        ])
        .select()

    if (error) {
        console.error(error);
        return null;
    }
    return null;
}

export async function unfollowUser({ follower, following }) {
    const { error } = await supabase
        .from('following')
        .delete()
        .eq('follower', follower)
        .eq('following', following)

    if (error) {
        console.error(error)
        return null
    }
    return null
}