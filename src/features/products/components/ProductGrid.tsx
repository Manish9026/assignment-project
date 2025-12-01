'use client';



import { useEffect } from 'react';
import { Box, Pagination } from '@mui/material';
import { motion } from 'framer-motion';
import { useProductsStore } from '../store/productsStore';
import { Loader } from '@/common/components/Loader';
import { ProductCard } from './ProductCard';

export const ProductGrid = () => {
  const { products, total, skip, limit, isLoading, fetchProducts, setPage } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

  if (isLoading ) {
    return <Loader message="Loading products..." />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  return (
    <Box>
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3,
        }}
      >
        {products.map((product) => (
          <Box key={product.id}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Box>
  );
};
