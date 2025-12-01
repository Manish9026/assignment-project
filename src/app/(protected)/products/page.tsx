'use client';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
// import Grid  from '@mui/material/Grid2'
import { SearchOutlined } from '@mui/icons-material';
import { Navbar } from '@/common/components/Navbar';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { useProductsStore } from '@/features/products/store/productsStore';


const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    categories,
    selectedCategory,
    searchProducts,
    fetchProducts,
    fetchProductsByCategory,
    fetchCategories,
  } = useProductsStore();

  useEffect(() => {
    fetchCategories();


  }, [fetchCategories]);

  // console.log(categories);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      searchProducts(query);
    } else if (!selectedCategory) {
      fetchProducts();
    }
  };

  const handleCategoryChange = (category: string) => {
    setSearchQuery('');
    if (category && category !== 'all' ) {
      fetchProductsByCategory(category);
    }
    else {
      fetchProducts();
    }
  };

  return (
   
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* <Navbar /> */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom color='text.primary'>
            Products
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Browse our product catalog
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid xs={12} md={8}>

              <TextField
                fullWidth
                placeholder="Search products..."
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
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className='flex-1'
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories?.map((category) => (
                    <MenuItem key={category?.slug} value={category?.slug}>
                      {category?.name?.charAt(0).toUpperCase() + category?.name?.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <ProductGrid />
        </Container>
      </Box>



  );
};

export default Products;
