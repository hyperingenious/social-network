import { supabase } from "../supabase";

export async function profilePosts({ id }) {
    // 1 fetch all my posts
    let { data: Post, error } = await supabase.from("Post").select("*").eq('user_id', id);

    if (error) {
        console.error(error)
        throw error;
    }

    async function fetchInteractions(e, i) {
        // Adding likes
        const { data: likeData, error: likeError } = await supabase
            .from("Likes")
            .select("count", { count: "exact" })
            .eq("postid", e.postid);

        if (likeError) {
            console.error(likeError);
            throw likeError;
        }

        Post[i].like = likeData[0].count;

        // Adding comments
        const { data: commentData, error: commentsError } = await supabase
            .from("Comment")
            .select("count", { count: "exact" })
            .eq("postid", e.postid);

        if (commentsError) {
            console.error(commentsError);
            throw commentsError;
        }

        Post[i].comment = commentData[0].count;

        // Adding Names
        const { data: nameData, error: nameError } = await supabase
            .from("UserTable")
            .select("name")
            .eq("id", Post[i].user_id);

        if (nameError) {
            console.error(nameError);
            throw nameError
        }

        Post[i].name = nameData[0].name
    }

    // Using Promise.all to wait for all fetchInteractions calls to complete
    await Promise.all(Post.map(async (e, i) => {
        await fetchInteractions(e, i);
    }));

    // Sorting post based on date
    const compareDateDesc = (a, b) => new Date(b.created_at) - new Date(a.created_at);

    return Post.sort(compareDateDesc);

}