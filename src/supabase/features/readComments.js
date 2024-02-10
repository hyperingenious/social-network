import { supabase } from "../supabase"

export async function readComments({ postid }) {
    const { data, error } = await supabase.from('Comment').select('*').eq('postid', postid)

    if (error) {
        console.error(error)
        throw error;
    }

    async function fetchNamesOfCommentator(i) {
        // Adding Names
        const { data: nameData, error: nameError } = await supabase
            .from("UserTable")
            .select("name")
            .eq("id", data[i].user_who_commented);
        if (nameError) throw nameError;

        data[i].name = nameData[0].name
    }

    // Using Promise.all to wait for all fetchNamesOfCommentator calls to complete
    await Promise.all(data.map(async (_, i) => {
        await fetchNamesOfCommentator(i);
    }));


    // Sorting post based on date
    const compareDateDesc = (a, b) => new Date(b.created_at) - new Date(a.created_at);

    return data.sort(compareDateDesc);

}