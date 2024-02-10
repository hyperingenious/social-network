import PostCard from "../components/PostCard"
import ContentShell from "./layouts/ContentShell"
import { useSelector } from "react-redux"
import { Group, Loader } from "@mantine/core";

function Home() {
    const { homeFeedPosts, status } = useSelector(store => store.post)

    return (
        <ContentShell>
            {status === 'loading' && <Group justify="center" mt={'xl'}> <Loader color="blue" /></Group>}
            {status === 'finished' && homeFeedPosts.map((postDetails) => <PostCard key={postDetails.postid} postDetails={postDetails} />)}
        </ContentShell>
    )
}

export default Home
