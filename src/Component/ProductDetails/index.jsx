import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Grid, Chip, CircularProgress, Divider, Paper, Stack, Avatar
} from '@mui/material';

import { useParams } from 'react-router-dom';
import { GET_PRODUCT_BY_ID } from '../../api/get';
import Slider from "react-slick";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async () => {
        try {
            const res = await GET_PRODUCT_BY_ID(id);
            console.log(res.data);

            if (res.data?.product) {
                setProduct(res.data.product);
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) return <Box textAlign="center" mt={10}><CircularProgress /></Box>;
    if (!product) return <Typography mt={10} align="center" color="error">Product not found</Typography>;

    const variant = product.variants[0];

    return (
        <Box maxWidth="lg" mx="auto" p={4}>
            <Grid container spacing={4}>
                {/* Image */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Slider
                            fade
                            infinite
                            speed={500}
                            slidesToShow={1}
                            slidesToScroll={1}
                            
                        >
                            {variant.images.map((img, idx) => (
                                <Box key={idx} sx={{ textAlign: "center" }}>
                                    <img
                                        src={img}
                                        alt={`${product.productName} ${idx + 1}`}
                                        style={{ width: '100%', height: 'auto', borderRadius: 8, maxHeight: 500 }}
                                    />
                                </Box>
                            ))}
                        </Slider>
                    </Paper>
                </Grid>

                {/* Info */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" fontWeight="bold">{product.productName}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        Brand: {product.brandName}
                    </Typography>

                    <Stack direction="row" spacing={1} mt={1} mb={2}>
                        <Chip label={product.category} color="primary" />
                        <Chip label={product.subCategory} />
                        <Chip label={`Tag: ${product.productTypeTag}`} variant="outlined" />
                    </Stack>

                    <Typography variant="body2" mb={2} color="text.secondary">
                        Origin: {product.originCountry?.toUpperCase()} | Material: {product.material} | Weight: {product.weight}kg
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                        <Typography variant="h6" gutterBottom>Pricing</Typography>
                        <Typography>
                            <s>₹{variant.mrp}</s> <strong style={{ color: 'green' }}>₹{variant.salePrice}</strong> &nbsp;
                            <small>Incl. {variant.taxRate}% {variant.taxType}</small>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Stock: {variant.stockQuantity}</Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                        <Typography variant="h6" gutterBottom>Available Sizes</Typography>
                        <Stack direction="row" spacing={1}>
                            {variant.size.map((sz) => (
                                <Chip key={sz} label={sz} variant="outlined" />
                            ))}
                        </Stack>
                    </Box>

                    <Box mt={2}>
                        <Typography variant="h6" gutterBottom>Color</Typography>
                        <Avatar
                            sx={{
                                bgcolor: variant.color,
                                width: 32,
                                height: 32,
                                border: '1px solid #ccc'
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>

            {/* Description */}
            <Box mt={6}>
                <Typography variant="h5" gutterBottom>Description</Typography>
                <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    style={{ lineHeight: 1.7, fontSize: '16px' }}
                />
            </Box>
        </Box>
    );
};

export default ProductDetails;
