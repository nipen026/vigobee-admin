import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Dialog,
  DialogTitle, DialogContent, TextField, IconButton, MenuItem, Rating,Tooltip
} from '@mui/material';
import { Plus, Trash2, Star, UploadCloud,X } from 'lucide-react';
import axios from 'axios';
import { GET_PRODUCT, GET_REVIEW } from '../../api/get';
import { ADD_REVIEW } from '../../api/post';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [productId, setProductId] = useState('');
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  useEffect(() => {
    fetchReviews();
    fetchProducts();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await GET_REVIEW();
      console.log(res,"res");
      
      setReviews(res.data.reviews);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await GET_PRODUCT() // adjust your route
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setRating(0);
    setComment('');
    setProductId('');
    setImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId || !rating || !comment) {
      alert('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('rating', rating);
    formData.append('comment', comment);
    formData.append('productId', productId);
    for (let file of images) {
      formData.append('images', file);
    }

    try {
      const res = await ADD_REVIEW(formData)
    setReviews(prev => (Array.isArray(prev) ? [...prev, res.data.review] : [res.data.review]));
      handleClose();
    } catch (err) {
      console.error('Review upload failed', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await axios.delete(`/api/reviews/${id}`);
      setReviews(reviews.filter(r => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">Product Reviews</Typography>
        <Button variant="contained" startIcon={<Plus size={18} />} onClick={handleOpen}>
          Add Review
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Images</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.length > 0 && reviews?.map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.Product?.productName}</TableCell>
                <TableCell>
                  <Rating value={review.rating} readOnly size="small" />
                </TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>
                  {review.images && review.images.length > 0 && (
                    <Box display="flex" gap={1}>
                      {review.images.slice(0, 2).map((img, i) => (
                        <img
                          key={i}
                          src={img.secure_url || img}
                          alt="review"
                          style={{ width: 40, height: 40, borderRadius: 4,objectFit:'cover' }}
                        />
                      ))}
                      {review.images.length > 2 && <Typography variant="caption">+{review.images.length - 2}</Typography>}
                    </Box>
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={() => handleDelete(review.id)}>
                    <Trash2 size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {reviews.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">No reviews found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Review Form Dialog */}
   <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className="text-xl font-semibold">Add Product Review</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          mt={2}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            select
            label="Select Product"
            fullWidth
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.productName}
              </MenuItem>
            ))}
          </TextField>

          <Box display="flex" alignItems="center" gap={2}>
            <Typography>Rating</Typography>
            <Rating
              name="review-rating"
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
            />
          </Box>

          <TextField
            label="Comment"
            fullWidth
            multiline
            minRows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />

          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadCloud size={18} />}
          >
            Upload Images
            <input
              type="file"
              accept="image/*"
              hidden
              multiple
              onChange={handleImageUpload}
            />
          </Button>

          {/* Image Preview */}
          {images.length > 0 && (
            <Box display="flex" flexWrap="wrap" gap={2}>
              {images.map((img, i) => (
                <Box
                  key={i}
                  position="relative"
                  width={80}
                  height={80}
                  borderRadius={1}
                  overflow="hidden"
                  border="1px solid #ccc"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`review-${i}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Tooltip title="Remove">
                    <IconButton
                      size="small"
                      onClick={() => removeImage(i)}
                      sx={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        backgroundColor: 'rgba(255,255,255,0.8)',
                      }}
                    >
                      <X size={14} />
                    </IconButton>
                  </Tooltip>
                </Box>
              ))}
            </Box>
          )}

          <Box textAlign="right" mt={1}>
            <Button type="submit" variant="contained" color="primary">
              Submit Review
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
    </Box>
  );
};

export default Review;
