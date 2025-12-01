'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface LoaderProps {
  message?: string;
}

export default function Loader({ message = 'Loading...' }: LoaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <CircularProgress size={60} />
      </motion.div>
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}


export { Loader };