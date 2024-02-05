import { Outlet } from "react-router-dom"
import { AppShell as Shell } from "@mantine/core"


function AppShell() {
    return (
        <>
            <Shell h={'100vh'} w={'100%'}>
                <Outlet />
            </Shell>
        </>
    )
}

export default AppShell
