import { Divider, Group, Loader } from "@mantine/core"
import PostCard from "../components/PostCard"
import ProfileCard from "../components/ProfileCard"
import ContentShell from "./layouts/ContentShell"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchProfilePosts } from "../redux/postSlice"
import { fetchProfileBio } from "../redux/profileSlice"

function Profile() {
    const { auth: { authDetails: { id } }, post: { status: postStatus, profilePosts }, profile: { status: profileStatus, profileBio } } = useSelector(store => store);
    const dispatch = useDispatch()

    useEffect(function () {
        if (!id) return;
        dispatch(fetchProfilePosts(id))
        dispatch(fetchProfileBio(id))
    }, [dispatch, id])

    return (
        <ContentShell>
            {profileStatus === 'loading' &&
                <Group justify="center" mt={"md"}><Loader /></Group>}
            {profileStatus === 'finished' && <ProfileCard profileBio={profileBio} />}

            <Divider />

            {postStatus === 'loading' &&
                <Group justify="center" mt={"md"}><Loader /></Group>}
            {postStatus === 'finished' && profilePosts.map((postDetails, i) => <PostCard key={i} postDetails={postDetails} />)}
        </ContentShell>
    )
}

export default Profile
