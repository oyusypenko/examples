import { Box, Container } from "@mui/material";

export default async function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1 className="text-4xl font-bold">Welcome to the Alison Assessment</h1>
        <p className="text-lg">Please select a page from the navigation bar above</p>
      </Box>
    </Container>
  );
}
