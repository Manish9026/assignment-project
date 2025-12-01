'use client';


import { useEffect, useState } from 'react';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Rating,
  Divider,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductsStore } from '../store/productsStore';
import { Loader } from '@/common/components/Loader';
import { ArrowBackOutlined, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useRouter();
  const { selectedProduct, isLoading, fetchProductById, clearSelectedProduct } = useProductsStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProductById(parseInt(id));
    }
    return () => clearSelectedProduct();
  }, [id, fetchProductById, clearSelectedProduct]);

  if (isLoading || !selectedProduct) {
    return <Loader message="Loading product details..." />;
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackOutlined />}
          onClick={() => navigate.push('/products')}
          component={motion.button}
          whileHover={{ scale: 1.05 }}
        >
          Back to Products
        </Button>
      </Box>

      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            {/* Image Carousel */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ position: 'relative' }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedProduct.images[currentImageIndex]}
                    alt={selectedProduct.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </AnimatePresence>

                {selectedProduct.images.length > 1 && (
                  <>
                    <Button
                      onClick={handlePrevImage}
                      sx={{
                        position: 'absolute',
                        left: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        minWidth: 'auto',
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': { bgcolor: 'white' },
                      }}
                    >
                      <ChevronLeft />
                    </Button>
                    <Button
                      onClick={handleNextImage}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        minWidth: 'auto',
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': { bgcolor: 'white' },
                      }}
                    >
                      <ChevronRight />
                    </Button>
                  </>
                )}
              </Box>

              {selectedProduct.images.length > 1 && (
                <Box sx={{ display: 'flex', gap: 1, mt: 2, overflowX: 'auto' }}>
                  {selectedProduct.images.map((img, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={img}
                      alt={`${selectedProduct.title} ${index + 1}`}
                      onClick={() => setCurrentImageIndex(index)}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 1,
                        cursor: 'pointer',
                        border: currentImageIndex === index ? '2px solid' : '2px solid transparent',
                        borderColor: 'primary.main',
                        opacity: currentImageIndex === index ? 1 : 0.6,
                        transition: 'all 0.2s',
                        '&:hover': { opacity: 1 },
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>

            {/* Product Info */}
            <Box sx={{ flex: 1 }}>
              <Chip label={selectedProduct.category} color="primary" sx={{ mb: 2 }} />
              
              <Typography variant="h3" fontWeight={700} gutterBottom>
                {selectedProduct.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Rating value={selectedProduct.rating} precision={0.1} readOnly />
                <Typography variant="body1" color="text.secondary">
                  ({selectedProduct.rating} rating)
                </Typography>
              </Box>

              <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
                ${selectedProduct.price}
              </Typography>

              {selectedProduct.discountPercentage > 0 && (
                <Chip
                  label={`${selectedProduct.discountPercentage}% OFF`}
                  color="success"
                  sx={{ mb: 2 }}
                />
              )}

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom fontWeight={600}>
                Description
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {selectedProduct.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', gap: 4 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Brand
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {selectedProduct.brand}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Stock
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {selectedProduct.stock} units
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
