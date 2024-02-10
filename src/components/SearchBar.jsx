import { TextInput, ActionIcon, useMantineTheme, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';

export default function SearchBar() {
    const theme = useMantineTheme();

    return (
        <TextInput pos={'sticky'}
            top={20}
            style={{ zIndex: 10 }}
            radius="xl"
            size="md"
            placeholder="Search users"
            rightSectionWidth={42}
            leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            rightSection={
                <ActionIcon size={32} radius="xl" color={theme.colors.grape[9]} variant="filled">
                    <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                </ActionIcon>
            }
        />
    );
}