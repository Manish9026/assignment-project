'use client';



import { Box, Container } from '@mui/material';
import { Navbar } from '@/common/components/Navbar';
import { UserDetail as UserDetailComponent } from '@/features/users/components/UserDetail';

const UserDetail = () => {
  return (
    
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <UserDetailComponent />
        </Container>
      </Box>



  );
};

export default UserDetail;
