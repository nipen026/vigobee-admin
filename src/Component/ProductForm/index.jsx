// import React, { useState } from 'react';
// import {
//     Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem,
//     Button, IconButton, Checkbox, FormControlLabel
// } from '@mui/material';
// import { UploadCloud, X, Plus } from 'lucide-react';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { ADD_PRODUCT } from '../../api/post';

// const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'video/mp4'];
// const size = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
// const ALL_COLORS = ['#000000', '#ffffff', '#ff0000', '#0000ff', '#008000'];
// const subCategories = {
//     "Men's Wear": [
//         'T-Shirts',
//         'Shirts',
//         'Jeans',
//         'Trousers',
//         'Jackets',
//         'Suits',
//         'Kurta',
//         'Sherwani',
//         'Blazer'
//     ],
//     "Women's Wear": [
//         'Dresses',
//         'Tops',
//         'Sarees',
//         'Salwar Kameez',
//         'Lehengas',
//         'Skirts',
//         'Blouses',
//         'Kurtis',
//         'Jackets'
//     ]
// };
// const ProductForm = () => {
//     const [form, setForm] = useState({
//         productName: '',
//         productType: '',
//         brandName: '',
//         description: '',
//         category: 'Men\'s Wear',
//         subCategory: '',
//         material: '',
//         weight: '',
//         originCountry: '',
//         productTypeTag: '',
//         deliveryTime: '',
//         seoKeywords: '',
//         tags: '',
//         notes: '',
//         status: 'active',
//     });

//     const [variants, setVariants] = useState([
//         {
//             color: '',
//             size: [],
//             images: [],
//             videos: [],
//             mrp: '',
//             salePrice: '',
//             taxRate: '18',
//             taxType: 'GST',
//             stockQuantity: '',
//         }
//     ]);

//     const handleChange = (e) => {
//         setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleVariantChange = (index, field, value) => {
//         const updated = [...variants];
//         updated[index][field] = value;
//         setVariants(updated);
//     };

//     const toggleSize = (index, size) => {
//         const updated = [...variants];
//         const exists = updated[index].size.includes(size);
//         updated[index].size = exists
//             ? updated[index].size.filter(s => s !== size)
//             : [...updated[index].size, size];
//         setVariants(updated);
//     };

//     const handleVariantMedia = (index, files) => {
//         const valid = Array.from(files).filter(file => ACCEPTED_TYPES.includes(file.type));
//         const updated = [...variants];
//         const images = valid.filter(f => f.type.startsWith('image'));
//         const videos = valid.filter(f => f.type.startsWith('video'));

//         updated[index].images = [...updated[index].images, ...images];
//         updated[index].videos = [...updated[index].videos, ...videos];
//         setVariants(updated);
//     };

//     const removeMedia = (variantIndex, mediaType, mediaIndex) => {
//         const updated = [...variants];
//         updated[variantIndex][mediaType].splice(mediaIndex, 1);
//         setVariants(updated);
//     };

//     const addVariant = () => {
//         setVariants(prev => [...prev, {
//             color: '',
//             size: [],
//             images: [],
//             videos: [],
//             mrp: '',
//             salePrice: '',
//             taxRate: '18',
//             taxType: 'GST',
//             stockQuantity: '',
//         }]);
//     };

//     const removeVariant = (index) => {
//         setVariants(prev => prev.filter((_, i) => i !== index));
//     };
// const handleSubmit = async () => {
//     const data = new FormData();

//     // 1. Basic product fields
//    Object.entries(form).forEach(([key, value]) => {
//     if (Array.isArray(value)) {
//         // Convert arrays to stringified JSON array (e.g., '["S", "M", "L"]')
//         data.append(key, JSON.stringify(value));
//     } else if (key === 'tags' || key === 'seoKeywords') {
//         // If comma-separated string: convert to JSON array string
//         const arr = value.split(',').map(v => v.trim()).filter(Boolean);
//         data.append(key, JSON.stringify(arr));
//     } else {
//         // Append as plain string
//         data.append(key, String(value));
//     }
// });

//     // 2. Variants: send JSON + attach files
//     const variantPayload = variants.map((variant, index) => {
//         // Send variant-specific image/video files using FormData field naming
//         variant.images.forEach((file, i) => {
//             if (file instanceof File) {
//                 data.append(`variantFiles[${index}][images]`, file);
//             }
//         });

//         variant.videos.forEach((file, i) => {
//             if (file instanceof File) {
//                 data.append(`variantFiles[${index}][videos]`, file);
//             }
//         });

//         // Return variant metadata (without actual File objects)
//         return {
//             ...variant,
//             images: [], // actual files sent separately
//             videos: []
//         };
//     });

//     data.append('variants', JSON.stringify(variantPayload));

//     // 3. Submit to API
//     try {
//         await ADD_PRODUCT(data);
//         toast.success('Product saved successfully!');
//     } catch (err) {
//         toast.error(err?.response?.data?.message || 'Submission failed');
//     }
// };




//     return (
//         <Box p={3} bgcolor="#fff" borderRadius={2}>
//             <Typography variant="h5" fontWeight={600} mb={3}>Add Product</Typography>

//             <TextField label="Product Name" fullWidth name="productName" value={form.productName} onChange={handleChange} sx={{ mb: 2 }} />
//             <TextField label="Product Type" fullWidth name="productType" value={form.productType} onChange={handleChange} sx={{ mb: 2 }} />
//             <TextField label="Brand Name" fullWidth name="brandName" value={form.brandName} onChange={handleChange} sx={{ mb: 2 }} />
//             <TextField label="Description" fullWidth multiline rows={3} name="description" value={form.description} onChange={handleChange} sx={{ mb: 2 }} />

//             <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel>Category</InputLabel>
//                 <Select name="category" value={form.category} onChange={handleChange} label="Category">
//                     <MenuItem value="Men's Wear">Men's Wear</MenuItem>
//                     <MenuItem value="Women's Wear">Women's Wear</MenuItem>
//                 </Select>
//             </FormControl>

//             <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel>Sub-Category</InputLabel>
//                 <Select
//                     label="Sub-Category"
//                     name="subCategory"
//                     value={form.subCategory}
//                     onChange={handleChange}
//                 >
//                     {subCategories[form.category]?.map((sub, idx) => (
//                         <MenuItem key={idx} value={sub}>
//                             {sub}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>

//             {variants.map((variant, index) => (
//                 <Box key={index} mt={3} p={2} border="1px solid #ddd" borderRadius={2}>
//                     <Box display="flex" justifyContent="space-between" mb={2}>
//                         <Typography fontWeight={600}>Variant {index + 1}</Typography>
//                         {variants.length > 1 && (
//                             <IconButton onClick={() => removeVariant(index)}><X size={18} /></IconButton>
//                         )}
//                     </Box>

//                     <Typography fontWeight={500} mb={1}>Color</Typography>
//                     <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
//                         {ALL_COLORS.map(color => (
//                             <Box key={color} onClick={() => handleVariantChange(index, 'color', color)} sx={{
//                                 width: 24, height: 24, borderRadius: '50%', bgcolor: color,
//                                 border: variant.color === color ? '2px solid #000' : '1px solid #ccc', cursor: 'pointer'
//                             }} />
//                         ))}
//                     </Box>

//                     <Typography fontWeight={500} mb={1}>size</Typography>
//                     <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
//                         {size.map(size => (
//                             <FormControlLabel
//                                 key={size}
//                                 label={size}
//                                 control={
//                                     <Checkbox
//                                         checked={variant.size.includes(size)}
//                                         onChange={() => toggleSize(index, size)}
//                                     />
//                                 }
//                             />
//                         ))}
//                     </Box>

//                     <Box display="flex" gap={2} mb={2}>
//                         <TextField fullWidth label="MRP" type="number" value={variant.mrp} onChange={(e) => handleVariantChange(index, 'mrp', e.target.value)} />
//                         <TextField fullWidth label="Sale Price" type="number" value={variant.salePrice} onChange={(e) => handleVariantChange(index, 'salePrice', e.target.value)} />
//                     </Box>

//                     <Box display="flex" gap={2} mb={2}>
//                         <TextField fullWidth label="Stock Quantity" type="number" value={variant.stockQuantity} onChange={(e) => handleVariantChange(index, 'stockQuantity', e.target.value)} />
//                         <TextField fullWidth label="Tax %" type="number" value={variant.taxRate} onChange={(e) => handleVariantChange(index, 'taxRate', e.target.value)} />
//                     </Box>

//                     <Box mt={2}>
//                         <Typography fontWeight={500} mb={1}>Upload Media</Typography>
//                         <Box
//                             border="2px dashed #ccc"
//                             borderRadius={2}
//                             p={3}
//                             textAlign="center"
//                             sx={{
//                                 backgroundColor: '#fafafa',
//                                 cursor: 'pointer',
//                                 transition: 'all 0.2s',
//                                 '&:hover': { backgroundColor: '#f0f0f0' }
//                             }}
//                         >
//                             <input
//                                 type="file"
//                                 accept={ACCEPTED_TYPES}
//                                 multiple
//                                 hidden
//                                 id={`media-upload-${index}`}
//                                 onChange={(e) => handleVariantMedia(index, e.target.files)}
//                             />
//                             <label htmlFor={`media-upload-${index}`}>
//                                 <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
//                                     <UploadCloud size={36} color="#888" />
//                                     <Typography variant="body2" color="textSecondary" mt={1}>
//                                         Drag and drop your image or video here
//                                     </Typography>
//                                     <Button variant="outlined" sx={{ mt: 1 }}>Choose File</Button>
//                                 </Box>
//                             </label>
//                         </Box>

//                         {/* Images */}
//                         <Box display="flex" gap={2} mt={2} flexWrap="wrap">
//                             {variant.images.map((img, idx) => (
//                                 <Box key={idx} width={100} height={100} position="relative">
//                                     <img
//                                         src={URL.createObjectURL(img)}
//                                         alt="preview"
//                                         style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, border: '1px solid #ddd' }}
//                                     />
//                                     <IconButton
//                                         size="small"
//                                         onClick={() => removeMedia(index, 'images', idx)}
//                                         sx={{ position: 'absolute', top: 0, right: 0, bgcolor: '#fff' }}
//                                     >
//                                         <X size={16} />
//                                     </IconButton>
//                                 </Box>
//                             ))}
//                         </Box>

//                         {/* Videos */}
//                         <Box display="flex" gap={2} mt={2} flexWrap="wrap">
//                             {variant.videos.map((vid, idx) => (
//                                 <Box key={idx} width={120} position="relative">
//                                     <video src={URL.createObjectURL(vid)} width="100%" height={80} controls style={{ borderRadius: 8 }} />
//                                     <IconButton
//                                         size="small"
//                                         onClick={() => removeMedia(index, 'videos', idx)}
//                                         sx={{ position: 'absolute', top: 0, right: 0, bgcolor: '#fff' }}
//                                     >
//                                         <X size={16} />
//                                     </IconButton>
//                                 </Box>
//                             ))}
//                         </Box>
//                     </Box>
//                 </Box>
//             ))}

//             <Button startIcon={<Plus />} variant="outlined" onClick={addVariant} sx={{ mt: 3 }}>
//                 Add Variant
//             </Button>

//             <TextField label="Material" fullWidth name="material" value={form.material} onChange={handleChange} sx={{ mt: 3 }} />
//             <TextField label="Weight (kg)" fullWidth name="weight" value={form.weight} onChange={handleChange} sx={{ mt: 2 }} />
//             <TextField label="Origin Country" fullWidth name="originCountry" value={form.originCountry} onChange={handleChange} sx={{ mt: 2 }} />
//             <TextField label="SEO Keywords (comma separated)" fullWidth name="seoKeywords" value={form.seoKeywords} onChange={handleChange} sx={{ mt: 2 }} />
//             <TextField label="Tags (comma separated)" fullWidth name="tags" value={form.tags} onChange={handleChange} sx={{ mt: 2 }} />
//             <TextField label="Notes" fullWidth name="notes" value={form.notes} multiline rows={3} onChange={handleChange} sx={{ mt: 2 }} />
//             <TextField label="Product Type Tag" fullWidth name="productTypeTag" value={form.productTypeTag} onChange={handleChange} sx={{ mt: 2 }} />
//             <TextField label="Delivery Time" fullWidth name="deliveryTime" value={form.deliveryTime} onChange={handleChange} sx={{ mt: 2 }} />

//             <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
//                 <Button variant="outlined">Cancel</Button>
//                 <Button variant="contained" onClick={handleSubmit}>Save Product</Button>
//             </Box>
//         </Box>
//     );
// };

// export default ProductForm;

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
const ALL_COLORS = ['#000000', '#ffffff', '#ff0000', '#0000ff', '#008000'];
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
                await UPDATE_PRODUCT(editId,data)
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
                    <Box display="flex" gap={1} mt={1}>
                        {ALL_COLORS.map(color => (
                            <Box key={color}
                                onClick={() => handleVariantChange(index, 'color', color)}
                                sx={{
                                    width: 24, height: 24, bgcolor: color, borderRadius: '50%',
                                    border: variant.color === color ? '2px solid black' : '1px solid #ccc',
                                    cursor: 'pointer'
                                }}
                            />
                        ))}
                    </Box>

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
