import { Box } from "@mantine/core"

function ContentShell({ children }) {
    return (
        <>
            <Box w={'600px'} ml={'5rem'} mah={'100vh'} style={{ borderRight: '1px solid gray', overflowY: 'scroll' }}>{children}</Box>
        </>
    )
}

export default ContentShell
