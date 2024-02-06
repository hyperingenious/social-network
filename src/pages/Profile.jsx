import { Divider } from "@mantine/core"
import PostCard from "../components/PostCard"
import ProfileCard from "../components/ProfileCard"
import ContentShell from "./layouts/ContentShell"

function Profile() {
    return (
        <ContentShell>
            <ProfileCard />
            <Divider />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        </ContentShell>
    )
}

export default Profile
