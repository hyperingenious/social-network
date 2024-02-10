import { Box } from "@mantine/core"
import { useEffect, useState } from "react";

function ContentShell({ children }) {
    const [screenSize, setScreenSize] = useState('large');

    useEffect(() => {
        const handleResize = () => {
            const newScreenSize = window.innerWidth <= 740 ? 'small' : 'large';
            setScreenSize(newScreenSize);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Box w={'600px'} ml={screenSize === 'small'? null : '5rem'} mah={'100vh'} style={{ borderRight: '1px solid gray', overflowY: 'scroll' }}>{children}</Box>
        </>
    )
}

export default ContentShell
