import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, IconButton,
    Dialog, DialogTitle, DialogContent, TextField, MenuItem
} from '@mui/material';
import { UploadCloud, Trash2, Eye, Plus } from 'lucide-react';
import axios from 'axios';
import { GET_BANNER } from '../../api/get';
import { ADD_BANNER } from '../../api/post';

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [imagefiles, setImagefiles] = useState(null);
    const [altText, setAltText] = useState('');
    const [status, setStatus] = useState('active');
useEffect(() => {
  return () => {
    if (image) {
      URL.revokeObjectURL(image);
    }
  };
}, [image]);
    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const res = await GET_BANNER();
            setBanners(res.data.banners);
        } catch (err) {
            console.error(err);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setImage(null);
        setAltText('');
        setStatus('active');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return alert('Please select an image');

        const formData = new FormData();
        formData.append('image', imagefiles);
        formData.append('altText', altText);
        formData.append('status', status);

        try {
            const res = await ADD_BANNER(formData);
            console.log(res);
            
           setBanners(prev => Array.isArray(prev) ? [...prev, res.data.banner] : [res.data.banner]);
            handleClose();
        } catch (err) {
            console.error('Upload failed', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure to delete this banner?')) return;
        try {
            await axios.delete(`/api/banner/${id}`);
            setBanners(banners.filter(b => b.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="bold">Banner Management</Typography>
                <Button variant="contained" startIcon={<Plus size={18} />} onClick={handleOpen}>
                    Add Banner
                </Button>
            </Box>

            {/* Banner Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Alt Text</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {banners.length > 0 && banners?.map((banner) => (
                            <TableRow key={banner.id}>
                                <TableCell>
                                    <img src={banner.images[0]} alt={banner.altText} style={{ height: 60, borderRadius: 8 }} />
                                </TableCell>
                                <TableCell>{banner.altText}</TableCell>
                                <TableCell>{banner.status}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary"><Eye size={18} /></IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(banner.id)}><Trash2 size={18} /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {banners.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center">No banners uploaded</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Upload Banner Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Upload New Banner</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} mt={1} display="flex" flexDirection="column" gap={2}>
                        {image ? (
                            <Box display="flex" alignItems="center" gap={2}>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    style={{ width: 100, height: 60, objectFit: 'cover', borderRadius: 8 }}
                                />
                                <IconButton color="error" onClick={() => setImage(null)}>
                                    <Trash2 size={18} />
                                </IconButton>
                            </Box>
                        ) : (
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<UploadCloud size={16} />}
                            >
                                Upload Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={e => {
                                        if (e.target.files?.[0]) {
                                            setImage(e.target.files[0]);
                                            setImagefiles(e.target.files[0])
                                        }
                                    }}
                                />
                            </Button>
                        )}
                        <TextField
                            label="Alt Text"
                            fullWidth
                            value={altText}
                            onChange={e => setAltText(e.target.value)}
                            required
                        />

                        <TextField
                            label="Status"
                            select
                            fullWidth
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </TextField>

                        <Button type="submit" variant="contained" color="primary">Save</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Banner;
