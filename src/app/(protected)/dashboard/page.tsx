'use client';

import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { People, Inventory, Dashboard as DashboardIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import Navbar from '@/common/components/Navbar';
import Footer from '@/common/components/Footer';
// import { ROUTES } from '@/common/utils/constants';

const MotionCard = motion.create(Card);

export default function DashboardPage() {
  const router = useRouter();

  const dashboardCards = [
    {
      title: 'Users',
      description: 'Manage and view all users with search and pagination',
      icon: <People sx={{ fontSize: 60, color: 'primary.main' }} />,
      route: '/users',
      color: '#1976d2',
    },
    {
      title: 'Products',
      description: 'Browse products with filters, search, and detailed views',
      icon: <Inventory sx={{ fontSize: 60, color: 'secondary.main' }} />,
      route: '/products',
      color: '#dc004e',
    },
  ];

  return (

      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* <Navbar /> */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <DashboardIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                Dashboard
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Welcome to your admin panel
              </Typography>
            </Box>
          </motion.div>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
            {dashboardCards.map((card, index) => (
              <MotionCard
                key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                  }}
                  elevation={4}
                  sx={{ height: '100%', cursor: 'pointer' }}
                  onClick={() => router.push(card.route)}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {card.icon}
                    </motion.div>
                    <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ mt: 2 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {card.description}
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        mt: 2,
                        px: 4,
                        backgroundColor: card.color,
                        '&:hover': {
                          backgroundColor: card.color,
                          filter: 'brightness(0.9)',
                        },
                      }}
                    >
                      View {card.title}
                    </Button>
                  </CardContent>
                </MotionCard>
            ))}
          </Box>
        </Container>
        <Footer />
      </Box>

  );
}
