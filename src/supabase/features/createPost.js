import { supabase } from "../supabase";

export async function createPost({ id: user_id, postContent: post_content, close: closeModal,  }) {

    const { error } = await supabase
        .from('Post')
        .insert([
            { user_id, post_content },
        ])
        .select()


    if (error) { throw error; }
    closeModal()
    return;
}