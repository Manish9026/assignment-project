'use client';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Rating } from '@mui/material';
import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
import { Product } from '../services/productsService';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useRouter();

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Card
      component={motion.div}
      // variants={cardVariants}
      initial={{opacity:0,scale:0.9 }}
      animate={{opacity:1,scale:1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, boxShadow: 6 }}
      onClick={() => navigate.push(`/products/${product.id}`)}
      sx={{
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="img"
        height="200"
        // className='h-[200px] sm-[250px]'
        image={product.thumbnail}
        alt={product.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Chip
          label={product.category}
          size="small"
          color="primary"
          sx={{ mb: 1, width: 'fit-content' }}
        />
        
        <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
          {product.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            flexGrow: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" color="primary" fontWeight={700}>
            ${product.price}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Rating value={product.rating} precision={0.1} readOnly size="small" />
            <Typography variant="caption" color="text.secondary">
              ({product.rating})
            </Typography>
          </Box>
        </Box>

        {product.stock < 20 && (
          <Chip
            label={`Only ${product.stock} left`}
            color="warning"
            size="small"
            sx={{ mt: 1, width: 'fit-content' }}
          />
        )}
      </CardContent>
    </Card>
  );
};
