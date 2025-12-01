'use client';


import { useEffect } from 'react';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useUsersStore } from '../store/usersStore';
import { Loader } from '@/common/components/Loader';
import { ArrowBackOutlined, EmailOutlined, PhoneOutlined, BusinessOutlined, SchoolOutlined } from '@mui/icons-material';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useRouter();
  const { selectedUser, isLoading, fetchUserById, clearSelectedUser } = useUsersStore();

  useEffect(() => {
    if (id) {
      fetchUserById(parseInt(id));
    }
    return () => clearSelectedUser();
  }, [id, fetchUserById, clearSelectedUser]);

  if (isLoading || !selectedUser) {
    return <Loader message="Loading user details..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackOutlined />}
          onClick={() => navigate.push('/users')}
          component={motion.button}
          whileHover={{ scale: 1.05 }}
        >
          Back to Users
        </Button>
      </Box>

      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          {/* Header Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
            <Avatar
              src={selectedUser.image}
              alt={selectedUser.firstName}
              sx={{ width: 120, height: 120 }}
            />
            <Box>
              <Typography variant="h4" fontWeight={600} gutterBottom>
                {selectedUser.firstName} {selectedUser.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                @{selectedUser.username}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip label={selectedUser.gender} color="primary" size="small" />
                <Chip label={`${selectedUser.age} years old`} variant="outlined" size="small" />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Contact Information */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <EmailOutlined color="primary" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{selectedUser.email}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <PhoneOutlined color="primary" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">{selectedUser.phone}</Typography>
                </Box>
              </Box>
            </Box>

            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <BusinessOutlined color="primary" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Company
                  </Typography>
                  <Typography variant="body1">{selectedUser.company.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedUser.company.title} - {selectedUser.company.department}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <SchoolOutlined color="primary" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    University
                  </Typography>
                  <Typography variant="body1">{selectedUser.university}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>


          <Divider sx={{ my: 3 }} />

          {/* Address */}
          <Box>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Address
            </Typography>
            <Typography variant="body1">
              {selectedUser.address.address}
            </Typography>
            <Typography variant="body1">
              {selectedUser.address.city}, {selectedUser.address.state} {selectedUser.address.postalCode}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Additional Details */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",   // 2 columns on mobile
                sm: "repeat(3, 1fr)",   // 3 columns on small screens+
              },
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">
                Blood Group
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {selectedUser.bloodGroup}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Height
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {selectedUser.height} cm
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Weight
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {selectedUser.weight} kg
              </Typography>
            </Box>
          </Box>

        </CardContent>
      </Card>
    </motion.div>
  );
};
