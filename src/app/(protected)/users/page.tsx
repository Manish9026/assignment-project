'use client';



import { useState } from 'react';
import { Box, Container, Typography, TextField, InputAdornment } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { UserTable } from '@/features/users/components/UserTable';
import { useUsersStore } from '@/features/users/store/usersStore';


const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchUsers, fetchUsers } = useUsersStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      searchUsers(query);
    } else {
      fetchUsers();
    }
  };

  return (

      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* <Navbar /> */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Users
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Browse and search through user profiles
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search users by name..."
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <UserTable />
      </Container>
    </Box>

    
  );
};

export default Users;
