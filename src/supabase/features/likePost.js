import { supabase } from "../supabase";

export async function likePost({ id: user_who_liked, postid }) {
    const { data, error } = await supabase
        .from('Likes')
        .select()
        .eq('user_who_liked', user_who_liked)
        .eq('postid', postid);

    if (error) {
        console.error(error)
    } else if (data.length > 0) {
        return null;
    } else {
        const { error } = await supabase
            .from('Likes')
            .insert([
                { user_who_liked, postid, id: crypto.randomUUID() },
            ])
            .select()

        if (error) console.error(error);
    }
}

export async function unLikePost({ id: user_who_liked, postid }) {
    const { error } = await supabase
        .from('Likes')
        .delete()
        .eq('user_who_liked', user_who_liked)
        .eq('postid', postid)

    if (error) console.error(error)
    return null
}