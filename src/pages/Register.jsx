import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Anchor,
    Stack,
    Box,
} from '@mantine/core';

export default function Register() {
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    return (
        <Box
            style={() => ({
                height: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            })}

        >
            <Paper radius="md" p="xl" mx={'xl'} withBorder maw={320}>
                <Text size="lg" fw={500} mb={'lg'} style={{ textAlign: 'center' }}>
                    Welcome, {type}
                </Text>

                <form onSubmit={form.onSubmit(() => { })}>
                    <Stack>
                        {type === 'register' && (
                            <TextInput
                                color='grape'
                                label="Name"
                                placeholder="Your name"
                                value={form.values.name}
                                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                                radius="md"
                            />
                        )}

                        <TextInput
                            color='grape'

                            required
                            label="Email"
                            placeholder="hello@example.com"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                            radius="md"
                        />

                        <PasswordInput
                            color='grape'

                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                            radius="md"
                        />
                    </Stack>

                    <Group justify="space-between" mt="lg">
                        <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Group justify="flex-end" w={'100%'}>
                            <Button type="submit" color='grape' radius="xl">
                                {upperFirst(type)}
                            </Button>
                        </Group>
                    </Group>
                </form>
            </Paper>
        </Box>
    );
}