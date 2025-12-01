'use client';


import { Box, Container } from '@mui/material';
import { Navbar } from '@/common/components/Navbar';
import { ProductDetail as ProductDetailComponent } from '@/features/products/components/ProductDetail';


const ProductDetail = () => {
  return (

  
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* <Navbar /> */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <ProductDetailComponent />
        </Container>
      </Box>


  );
};

export default ProductDetail;