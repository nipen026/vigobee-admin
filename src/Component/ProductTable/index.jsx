// import React from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   Chip,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Paper,
//   Stack,
//   Pagination,
//   InputAdornment,
// } from '@mui/material';

// import {
//   Plus,
//   Filter,
//   Eye,
//   Pencil,
//   Trash,
//   Import,
// //   Export,
//   Search,
//   LayoutList,
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// // Theme colors
// const royalGreen = '#014421';
// const white = '#ffffff';

// const products = [
//   {
//     id: 'PRD001',
//     name: 'Classic Cotton T-Shirt',
//     category: 'T-Shirts',
//     price: '$29.99',
//     stock: 150,
//     status: 'In Stock',
//     image: '/images/shirt1.jpg',
//   },

// ];

// const getStatusChip = (status) => {
//   if (status === 'In Stock')
//     return <Chip label="In Stock" sx={{ bgcolor: '#d1fae5', color: royalGreen }} />;
//   if (status === 'Low Stock')
//     return <Chip label="Low Stock" sx={{ bgcolor: '#fef3c7', color: '#92400e' }} />;
//   return <Chip label="Out of Stock" sx={{ bgcolor: '#fee2e2', color: '#991b1b' }} />;
// };

// const ProductTable = () => {
//   const navigate = useNavigate()
//   return (
//     <Box>
//       <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Typography variant="h6" fontWeight={600}>
//           Products Management
//         </Typography>

//         <Stack direction="row" spacing={1}>
//           <Button variant="contained" onClick={()=>navigate('/product-form')} startIcon={<Plus size={18} />} sx={{ bgcolor: royalGreen }}>
//             Add New Product
//           </Button>
//           <Button variant="outlined"
//         //    startIcon={<Export size={18} />}
//            sx={{ color: royalGreen, borderColor: royalGreen }}>
//             Export
//           </Button>
//           <Button variant="outlined" startIcon={<Import size={18} />} sx={{ color: royalGreen, borderColor: royalGreen }}>
//             Import
//           </Button>
//           <IconButton>
//             <LayoutList size={20} />
//           </IconButton>
//         </Stack>
//       </Box>

//       <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
//         <TextField
//           size="small"
//           placeholder="Search products..."
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Search size={18} />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ width: 300, bgcolor: white }}
//         />
//         <Button startIcon={<Filter size={18} />} variant="outlined" sx={{ color: royalGreen, borderColor: royalGreen }}>
//           Filters
//         </Button>
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ backgroundColor: '#f8f8f8' }}>
//             <TableRow>
//               <TableCell>Product ID</TableCell>
//               <TableCell>Product</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Stock</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {products.map((product) => (
//               <TableRow key={product.id}>
//                 <TableCell>{product.id}</TableCell>
//                 <TableCell>
//                   <Stack direction="row" spacing={1} alignItems="center">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       style={{ width: 32, height: 32, borderRadius: 4, objectFit: 'cover' }}
//                     />
//                     <Typography>{product.name}</Typography>
//                   </Stack>
//                 </TableCell>
//                 <TableCell>{product.category}</TableCell>
//                 <TableCell>{product.price}</TableCell>
//                 <TableCell>{product.stock}</TableCell>
//                 <TableCell>{getStatusChip(product.status)}</TableCell>
//                 <TableCell align="center">
//                   <Stack direction="row" spacing={1} justifyContent="center">
//                     <IconButton size="small" color="inherit"><Eye size={16} /></IconButton>
//                     <IconButton size="small" color="inherit"><Pencil size={16} /></IconButton>
//                     <IconButton size="small" color="inherit"><Trash size={16} /></IconButton>
//                   </Stack>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box
//         sx={{
//           mt: 2,
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           fontSize: 14,
//         }}
//       >
//         <Typography>Showing 1 to 5 of 25 entries</Typography>
//         <Pagination count={5} page={1} shape="rounded" color="primary" />
//       </Box>
//     </Box>
//   );
// };

// export default ProductTable;
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Stack,
  Pagination,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Plus,
  Filter,
  Eye,
  Pencil,
  Trash,
  Import,
  Search,
  LayoutList,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_PRODUCT } from '../../api/get';

const royalGreen = '#014421';
const white = '#ffffff';

const getStatusChip = (stock) => {
  if (stock > 20) return <Chip label="In Stock" sx={{ bgcolor: '#d1fae5', color: royalGreen }} />;
  if (stock > 0) return <Chip label="Low Stock" sx={{ bgcolor: '#fef3c7', color: '#92400e' }} />;
  return <Chip label="Out of Stock" sx={{ bgcolor: '#fee2e2', color: '#991b1b' }} />;
};

const ProductTable = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await GET_PRODUCT();
      setProducts(res.data.products || []);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight={600}>
          Products Management
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => navigate('/product-form')} startIcon={<Plus size={18} />} sx={{ bgcolor: royalGreen }}>
            Add New Product
          </Button>
          <Button variant="outlined" sx={{ color: royalGreen, borderColor: royalGreen }}>
            Export
          </Button>
          <Button variant="outlined" startIcon={<Import size={18} />} sx={{ color: royalGreen, borderColor: royalGreen }}>
            Import
          </Button>
          <IconButton><LayoutList size={20} /></IconButton>
        </Stack>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <TextField
          size="small"
          placeholder="Search products..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300, bgcolor: white }}
        />
        <Button startIcon={<Filter size={18} />} variant="outlined" sx={{ color: royalGreen, borderColor: royalGreen }}>
          Filters
        </Button>
      </Box>

      {/* Product Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f8f8f8' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              const variant = product.variants?.[0] || {};
              return (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell> <img
                        src={variant.images?.[0] || '/placeholder.png'}
                        alt={product.productType}
                        style={{ width: 50 , height: 50, borderRadius: 4, objectFit: 'cover' }}
                      /></TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                     
                      <Box>
                        <Typography>{product.productType}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {product.brandName}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>{product.category} / {product.subCategory}</TableCell>
                  <TableCell>₹{variant.salePrice ?? '-'}</TableCell>
                  <TableCell>{variant.stockQuantity ?? '-'}</TableCell>
                  <TableCell>{getStatusChip(variant.stockQuantity ?? 0)}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton size="small" color="inherit" onClick={()=>{navigate(`/productDetails/${product.id}`)}}><Eye size={16} /></IconButton>
                      <IconButton size="small" color="inherit" onClick={() => navigate(`/product-form?id=${product.id}`)}>
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton size="small" color="inherit"><Trash size={16} /></IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }}>
        <Typography>Showing {products.length} entries</Typography>
        <Pagination count={1} page={1} shape="rounded" color="primary" />
      </Box>
    </Box>
  );
};

export default ProductTable;
