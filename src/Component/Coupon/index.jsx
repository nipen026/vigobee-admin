import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem
} from '@mui/material';
import { Plus } from 'lucide-react';
import axios from 'axios';
import { GET_COUPON } from '../../api/get';
import { ADD_COUPON } from '../../api/post';

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    minOrderAmount: '',
    expiresAt: '',
    label: '',
  });

  const fetchCoupons = async () => {
    const res = await GET_COUPON();
    setCoupons(res.data.coupons || []);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await ADD_COUPON(form);
    fetchCoupons();
    setForm({
      code: '',
      discountType: 'percentage',
      discountValue: '',
      minOrderAmount: '',
      expiresAt: '',
      label:''
    });
    setOpen(false);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Coupon Management</Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => setOpen(true)}
        >
          Add Coupon
        </Button>
      </Box>

      {/* Coupon Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>label</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Min Order</TableCell>
              <TableCell>Expires At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>{coupon.code}</TableCell>
                <TableCell>{coupon.label}</TableCell>
                <TableCell>{coupon.discountType}</TableCell>
                <TableCell>
                  {coupon.discountType === 'percentage'
                    ? `${coupon.discountValue}%`
                    : `₹${coupon.discountValue}`}
                </TableCell>
                <TableCell>₹{coupon.minOrderAmount}</TableCell>
                <TableCell>{new Date(coupon.expiresAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Coupon Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Coupon</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} mt={1}>
             <TextField
              label="Discount Label"
              name="label"
              type="text"
              value={form.label}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Coupon Code"
              name="code"
              value={form.code}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              select
              label="Discount Type"
              name="discountType"
              value={form.discountType}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value="percentage">Percentage (%)</MenuItem>
              <MenuItem value="flat">Fixed Amount (₹)</MenuItem>
            </TextField>
            <TextField
              label="Discount Value"
              name="discountValue"
              type="number"
              value={form.discountValue}
              onChange={handleChange}
              fullWidth
              required
            />
           
            <TextField
              label="Minimum Order Amount"
              name="minOrderAmount"
              type="number"
              value={form.minOrderAmount}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Expires At"
              name="expiresAt"
              type="date"
              value={form.expiresAt}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
            <Box textAlign="right">
              <Button type="submit" variant="contained">Create Coupon</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Coupon;
