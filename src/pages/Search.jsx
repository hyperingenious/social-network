import { Box } from "@mantine/core"
import ContentShell from "./layouts/ContentShell"
import SearchBar from "../components/SearchBar"

function Search() {
    return (
        <ContentShell>
            <Box p={'md'}>
                <SearchBar />
            </Box>
        </ContentShell>
    )
}

export default Search
