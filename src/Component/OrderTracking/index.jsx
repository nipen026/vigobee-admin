import React from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  Pagination,
} from '@mui/material';
import {
  Search,
  SlidersHorizontal,
  Plus,
  FileUp,
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react';

const summaryCards = [
  { title: 'Total Orders', value: 1234, icon: <FileUp color="#4f46e5" /> },
  { title: 'In Transit', value: 456, icon: <SlidersHorizontal color="#6366f1" /> },
  { title: 'Delivered', value: 689, icon: <SlidersHorizontal color="#22c55e" /> },
  { title: 'Delayed', value: 89, icon: <SlidersHorizontal color="#ef4444" /> },
];

const orders = [
  {
    id: 'ORD-2024-001',
    name: 'Emma Thompson',
    date: '2024-01-15',
    status: 'Delivered',
    tracking: '129984A124596790',
    carrier: 'FedEx',
    destination: 'New York, NY',
    role: 'Admin',
  },
  {
    id: 'ORD-2024-002',
    name: 'Michael Chen',
    date: '2024-01-14',
    status: 'In Transit',
    tracking: '129984A124596781',
    carrier: 'UPS',
    destination: 'Los Angeles, CA',
    role: 'Customer',
  },
  {
    id: 'ORD-2024-003',
    name: 'Sarah Johnson',
    date: '2024-01-13',
    status: 'Pending',
    tracking: '129984A124596782',
    carrier: 'DHL',
    destination: 'Chicago, IL',
    role: 'Manager',
  },
  {
    id: 'ORD-2024-004',
    name: 'James Wilson',
    date: '2024-01-13',
    status: 'Delayed',
    tracking: '129984A124596783',
    carrier: 'FedEx',
    destination: 'Miami, FL',
    role: 'Customer',
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return '#22c55e';
    case 'In Transit':
      return '#3b82f6';
    case 'Pending':
      return '#f59e0b';
    case 'Delayed':
      return '#ef4444';
    default:
      return '#6b7280';
  }
};

const OrderTracking = () => {
  return (
    <Box p={4}>

      {/* Summary Cards (Flex Row) */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={4}>
        {summaryCards.map((card, index) => (
          <Paper
            key={index}
            elevation={1}
            sx={{
              flex: '1 1 220px',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
            }}
          >
            {card.icon}
            <Box>
              <Typography variant="body2" color="text.secondary">
                {card.title}
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {card.value}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Controls (Search + Buttons) */}
      <Box display="flex" flexWrap="wrap" alignItems="center" gap={2} mb={3}>
        <TextField
          size="small"
          placeholder="Search orders..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} />
              </InputAdornment>
            ),
          }}
          sx={{ flex: '1 1 240px' }}
        />

        <Button
          startIcon={<SlidersHorizontal size={16} />}
          variant="outlined"
          size="small"
        >
          Filter
        </Button>
        <Button
          startIcon={<FileUp size={16} />}
          variant="outlined"
          size="small"
        >
          Export
        </Button>
        <Button
          startIcon={<Plus size={16} />}
          variant="contained"
          size="small"
        >
          Add New Order
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Tracking Number</TableCell>
              <TableCell>Carrier</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell sx={{padding:'20px '}}>{order.id}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Box
                    component="span"
                    sx={{
                      bgcolor: getStatusColor(order.status),
                      color: '#fff',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: 12,
                    }}
                  >
                    {order.status}
                  </Box>
                </TableCell>
                <TableCell>{order.tracking}</TableCell>
                <TableCell>{order.carrier}</TableCell>
                <TableCell>{order.destination}</TableCell>
                <TableCell>{order.role}</TableCell>
                <TableCell align="center">
                  <IconButton size="small">
                    <Eye size={16} />
                  </IconButton>
                  <IconButton size="small">
                    <Pencil size={16} />
                  </IconButton>
                  <IconButton size="small">
                    <Trash2 size={16} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography variant="body2">Showing 1 to 5 of 50 entries</Typography>
        <Pagination count={10} size="small" color="primary" />
      </Box>
    </Box>
  );
};

export default OrderTracking;
