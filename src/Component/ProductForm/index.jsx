import React, { useEffect, useState } from 'react';
import {
    Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem,
    Button, IconButton, Checkbox, FormControlLabel
} from '@mui/material';
import { UploadCloud, X, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { GET_PRODUCT_BY_ID } from '../../api/get';
import { UPDATE_PRODUCT } from '../../api/put';
import { ADD_PRODUCT } from '../../api/post';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'video/mp4'];
const SIZE_LIST = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const ALL_COLORS = [
  // Basics
  '#000000', // Black
  '#ffffff', // White
  '#808080', // Gray
  '#C0C0C0', // Silver

  // Neutrals & Earth tones
  '#A0522D', // Sienna
  '#8B4513', // Saddle Brown
  '#D2B48C', // Tan
  '#F5DEB3', // Wheat
  '#C19A6B', // Khaki

  // Blues
  '#0000ff', // Blue
  '#1E90FF', // Dodger Blue
  '#4682B4', // Steel Blue
  '#87CEEB', // Sky Blue
  '#191970', // Midnight Blue
  '#5F9EA0', // Cadet Blue
  '#00BFFF', // Deep Sky Blue

  // Reds & Pinks
  '#ff0000', // Red
  '#B22222', // Firebrick
  '#8B0000', // Dark Red
  '#FF6347', // Tomato
  '#FF7F7F', // Light Red
  '#FFC0CB', // Pink
  '#FF69B4', // Hot Pink
  '#C71585', // Medium Violet Red

  // Greens
  '#008000', // Green
  '#006400', // Dark Green
  '#32CD32', // Lime Green
  '#00FA9A', // Medium Spring Green
  '#2E8B57', // Sea Green
  '#9ACD32', // Yellow Green
  '#7FFF00', // Chartreuse

  // Yellows & Oranges
  '#FFD700', // Gold
  '#FFA500', // Orange
  '#FF8C00', // Dark Orange
  '#FFFF00', // Yellow
  '#F0E68C', // Khaki
  '#EEE8AA', // Pale Goldenrod

  // Purples
  '#800080', // Purple
  '#4B0082', // Indigo
  '#8A2BE2', // Blue Violet
  '#9370DB', // Medium Purple
  '#D8BFD8', // Thistle
  '#E6E6FA', // Lavender

  // Browns
  '#A52A2A', // Brown
  '#8B4513', // Saddle Brown
  '#654321', // Dark Brown
  '#DEB887', // Burly Wood
  '#F4A460', // Sandy Brown

  // Trend / Fashion tones
  '#B0E0E6', // Powder Blue
  '#FFE4E1', // Misty Rose
  '#FAEBD7', // Antique White
  '#FFF5EE', // Seashell
  '#F5F5DC', // Beige
  '#E0FFFF', // Light Cyan
  '#F0FFFF', // Azure
  '#FFF0F5', // Lavender Blush
];

const subCategories = {
    "Men's Wear": ['T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Jackets', 'Suits', 'Kurta', 'Sherwani', 'Blazer'],
    "Women's Wear": ['Dresses', 'Tops', 'Sarees', 'Salwar Kameez', 'Lehengas', 'Skirts', 'Blouses', 'Kurtis', 'Jackets']
};

const ProductForm = () => {
    const [searchParams] = useSearchParams();
    const editId = searchParams.get('id');

    const [form, setForm] = useState({
        productName: '', productType: '', brandName: '', description: '',
        category: 'Men\'s Wear', subCategory: '', material: '', weight: '',
        originCountry: '', productTypeTag: '', deliveryTime: '',
        seoKeywords: '', tags: '', notes: '', status: 'active',
    });

    const [variants, setVariants] = useState([{
        color: '', size: [], images: [], videos: [],
        mrp: '', salePrice: '', taxRate: '18', taxType: 'GST', stockQuantity: ''
    }]);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleVariantChange = (index, field, value) => {
        const updated = [...variants];
        updated[index][field] = value;
        setVariants(updated);
    };

    const toggleSize = (index, sizeVal) => {
        const updated = [...variants];
        const exists = updated[index].size.includes(sizeVal);
        updated[index].size = exists
            ? updated[index].size.filter(s => s !== sizeVal)
            : [...updated[index].size, sizeVal];
        setVariants(updated);
    };

    const handleVariantMedia = (index, files) => {
        const valid = Array.from(files).filter(file => ACCEPTED_TYPES.includes(file.type));
        const updated = [...variants];
        const images = valid.filter(f => f.type.startsWith('image'));
        const videos = valid.filter(f => f.type.startsWith('video'));
        updated[index].images = [...updated[index].images, ...images];
        updated[index].videos = [...updated[index].videos, ...videos];
        setVariants(updated);
    };

    const removeMedia = (variantIndex, mediaType, mediaIndex) => {
        const updated = [...variants];
        updated[variantIndex][mediaType].splice(mediaIndex, 1);
        setVariants(updated);
    };

    const addVariant = () => {
        setVariants(prev => [...prev, {
            color: '', size: [], images: [], videos: [],
            mrp: '', salePrice: '', taxRate: '18', taxType: 'GST', stockQuantity: ''
        }]);
    };

    const removeVariant = (index) => {
        setVariants(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        const data = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            const isArrayField = ['tags', 'seoKeywords'];
            if (isArrayField.includes(key)) {
                const arr = value.split(',').map(v => v.trim()).filter(Boolean);
                data.append(key, JSON.stringify(arr));
            } else {
                data.append(key, value);
            }
        });

        const variantPayload = variants.map((variant, index) => {
            variant.images.forEach(file => {
                if (file instanceof File) {
                    data.append(`variantFiles[${index}][images]`, file);
                }
            });
            variant.videos.forEach(file => {
                if (file instanceof File) {
                    data.append(`variantFiles[${index}][videos]`, file);
                }
            });
            return {
                ...variant,
                images: [],
                videos: []
            };
        });

        data.append('variants', JSON.stringify(variantPayload));

        try {
            if (editId) {
                await UPDATE_PRODUCT(editId, data)
                toast.success('Product updated successfully!');
            } else {
                await ADD_PRODUCT(data);
                toast.success('Product added successfully!');
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        if (editId) {
            const fetchProduct = async () => {
                try {
                    const res = await GET_PRODUCT_BY_ID(editId);
                    const product = res.data.product;

                    setForm({
                        productName: product.productName || '',
                        productType: product.productType || '',
                        brandName: product.brandName || '',
                        description: product.description || '',
                        category: product.category || '',
                        subCategory: product.subCategory || '',
                        material: product.material || '',
                        weight: product.weight || '',
                        originCountry: product.originCountry || '',
                        productTypeTag: product.productTypeTag || '',
                        deliveryTime: product.deliveryTime || '',
                        seoKeywords: (product.seoKeywords || []).join(', '),
                        tags: (product.tags || []).join(', '),
                        notes: product.notes || '',
                        status: product.status || 'active'
                    });

                    const formattedVariants = (product.variants || []).map(variant => ({
                        ...variant,
                        images: [],
                        videos: []
                    }));
                    setVariants(formattedVariants.length ? formattedVariants : variants);
                } catch (err) {
                    toast.error('Failed to fetch product details');
                }
            };
            fetchProduct();
        }
    }, [editId]);

    return (
        <Box p={3} bgcolor="#fff" borderRadius={2}>
            <Typography variant="h5" fontWeight={600} mb={3}>
                {editId ? 'Edit Product' : 'Add Product'}
            </Typography>

            {/* Product fields */}
            <TextField label="Product Name" name="productName" fullWidth value={form.productName} onChange={handleChange} sx={{ mb: 2 }} />
            <TextField label="Product Type" name="productType" fullWidth value={form.productType} onChange={handleChange} sx={{ mb: 2 }} />
            <TextField label="Brand Name" name="brandName" fullWidth value={form.brandName} onChange={handleChange} sx={{ mb: 2 }} />
            <TextField label="Description" name="description" fullWidth multiline rows={3} value={form.description} onChange={handleChange} sx={{ mb: 2 }} />

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select name="category" value={form.category} onChange={handleChange} label="Category">
                    <MenuItem value="Men's Wear">Men's Wear</MenuItem>
                    <MenuItem value="Women's Wear">Women's Wear</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Sub-Category</InputLabel>
                <Select name="subCategory" value={form.subCategory} onChange={handleChange} label="Sub-Category">
                    {subCategories[form.category]?.map((sub, idx) => (
                        <MenuItem key={idx} value={sub}>{sub}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Variants */}
            {variants.map((variant, index) => (
                <Box key={index} p={2} mt={3} border="1px solid #ccc" borderRadius={2}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography fontWeight={600}>Variant {index + 1}</Typography>
                        {variants.length > 1 && (
                            <IconButton onClick={() => removeVariant(index)}><X size={18} /></IconButton>
                        )}
                    </Box>

                    <Typography mt={2}>Color</Typography>
                    <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                        {ALL_COLORS.map(color => (
                            <Box
                                key={color}
                                onClick={() => handleVariantChange(index, 'color', color)}
                                sx={{
                                    width: 24,
                                    height: 24,
                                    bgcolor: color,
                                    borderRadius: '50%',
                                    border: variant.color === color ? '2px solid black' : '1px solid #ccc',
                                    cursor: 'pointer'
                                }}
                            />
                        ))}
                    </Box>

                    {/* Allow custom color code input */}
                    <TextField
                        label="Custom Color Code (e.g. #123abc)"
                        value={variant.color && !ALL_COLORS.includes(variant.color) ? variant.color : ''}
                        onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                        placeholder="#000000"
                        sx={{ mt: 3, width: 200 }}
                    />

                    <Typography mt={2}>Size</Typography>
                    <Box display="flex" flexWrap="wrap">
                        {SIZE_LIST.map(sz => (
                            <FormControlLabel
                                key={sz}
                                label={sz}
                                control={
                                    <Checkbox
                                        checked={variant.size.includes(sz)}
                                        onChange={() => toggleSize(index, sz)}
                                    />
                                }
                            />
                        ))}
                    </Box>

                    <Box display="flex" gap={2} mt={2}>
                        <TextField fullWidth label="MRP" type="number" value={variant.mrp} onChange={e => handleVariantChange(index, 'mrp', e.target.value)} />
                        <TextField fullWidth label="Sale Price" type="number" value={variant.salePrice} onChange={e => handleVariantChange(index, 'salePrice', e.target.value)} />
                    </Box>

                    <Box display="flex" gap={2} mt={2}>
                        <TextField fullWidth label="Stock Quantity" type="number" value={variant.stockQuantity} onChange={e => handleVariantChange(index, 'stockQuantity', e.target.value)} />
                        <TextField fullWidth label="Tax %" type="number" value={variant.taxRate} onChange={e => handleVariantChange(index, 'taxRate', e.target.value)} />
                    </Box>

                    {/* Media Upload */}
                    <Box mt={2}>
                        <Typography>Upload Media</Typography>
                        <label htmlFor={`upload-${index}`}>
                            <Box border="2px dashed #aaa" p={2} mt={1} sx={{ cursor: 'pointer', textAlign: 'center' }}>
                                <UploadCloud size={24} />
                                <Typography variant="body2">Click to upload image/video</Typography>
                            </Box>
                        </label>
                        <input
                            type="file"
                            id={`upload-${index}`}
                            hidden
                            accept={ACCEPTED_TYPES.join(',')}
                            multiple
                            onChange={(e) => handleVariantMedia(index, e.target.files)}
                        />
                        <Box display="flex" gap={1} mt={2}>
                            {variant.images.map((img, idx) => (
                                <Box key={idx} position="relative">
                                    <img src={URL.createObjectURL(img)} alt="" width={80} height={80} style={{ objectFit: 'cover', borderRadius: 8 }} />
                                    <IconButton size="small" onClick={() => removeMedia(index, 'images', idx)} sx={{ position: 'absolute', top: 0, right: 0, bgcolor: '#fff' }}>
                                        <X size={16} />
                                    </IconButton>
                                </Box>
                            ))}
                            {variant.videos.map((vid, idx) => (
                                <Box key={idx} position="relative">
                                    <video width={100} height={80} controls>
                                        <source src={URL.createObjectURL(vid)} />
                                    </video>
                                    <IconButton size="small" onClick={() => removeMedia(index, 'videos', idx)} sx={{ position: 'absolute', top: 0, right: 0, bgcolor: '#fff' }}>
                                        <X size={16} />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            ))}

            <Button startIcon={<Plus />} onClick={addVariant} sx={{ mt: 3 }} variant="outlined">Add Variant</Button>

            {/* Remaining Fields */}
            <TextField label="Material" name="material" fullWidth value={form.material} onChange={handleChange} sx={{ mt: 3 }} />
            <TextField label="Weight" name="weight" fullWidth value={form.weight} onChange={handleChange} sx={{ mt: 2 }} />
            <TextField label="Origin Country" name="originCountry" fullWidth value={form.originCountry} onChange={handleChange} sx={{ mt: 2 }} />
            <TextField label="SEO Keywords" name="seoKeywords" fullWidth value={form.seoKeywords} onChange={handleChange} sx={{ mt: 2 }} />
            <TextField label="Tags" name="tags" fullWidth value={form.tags} onChange={handleChange} sx={{ mt: 2 }} />
            <TextField label="Notes" name="notes" fullWidth value={form.notes} onChange={handleChange} sx={{ mt: 2 }} />
            <TextField label="Product Type Tag" name="productTypeTag" fullWidth value={form.productTypeTag} onChange={handleChange} sx={{ mt: 2 }} />
            <TextField label="Delivery Time" name="deliveryTime" fullWidth value={form.deliveryTime} onChange={handleChange} sx={{ mt: 2 }} />

            <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                <Button variant="outlined">Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    {editId ? 'Update Product' : 'Save Product'}
                </Button>
            </Box>
        </Box>
    );
};

export default ProductForm;
