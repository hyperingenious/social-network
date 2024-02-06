import { Box } from "@mantine/core"
import ContentShell from "./layouts/ContentShell"
import SearchBar from "../components/SearchBar"
import PeopleToFollowCard from "../components/PeopleToFollowCard"

function Search() {
    return (
        <ContentShell>
            <Box p={'md'}>
                <SearchBar />
                <PeopleToFollowCard />
                <PeopleToFollowCard />
                <PeopleToFollowCard />
                <PeopleToFollowCard />
                <PeopleToFollowCard />
                <PeopleToFollowCard />
                <PeopleToFollowCard />
            </Box>
        </ContentShell>
    )
}

export default Search
