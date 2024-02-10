import { Box, Loader, Title } from "@mantine/core";
import PeopleToFollowCard from "../components/PeopleToFollowCard";
import { useSelector } from "react-redux";

function PeopleToFollow() {
    const { peopleToFollow: { status, peopleToFollow } } = useSelector((store) => store);
    
    return (
        <> {
            status === 'loading' &&
            <Box m={'md'} w={320} style={{ borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} mah={'100%'}>
                <Loader />
            </Box>
        }

            {status === 'finished' &&
                <Box m={'md'} w={320} style={{ borderRadius: '10px' }} mah={'100%'}>
                    <Title ml={'md'} mb={'sm'} order={3}>People to follow</Title>
                    {
                        peopleToFollow.map((toFollow, i) => {
                            if (toFollow.isFollowing) return null;
                            if (!toFollow.isFollowing) { return <PeopleToFollowCard toFollow={toFollow} key={i} /> }
                        })
                    }
                </Box>
            }
        </>
    )
}

export default PeopleToFollow
