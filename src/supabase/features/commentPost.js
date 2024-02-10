import { supabase } from "../supabase"

export async function commentPost({ postid, id: user_who_commented, comment, close: closeModal }) {
    const { error } = await supabase
        .from('Comment')
        .insert([
            { postid, user_who_commented, comment },
        ])
        .select()

    closeModal();

    if (error) console.error(error)

    return null;
}