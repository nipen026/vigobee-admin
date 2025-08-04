// import {
//     Box, Table, TableHead, TableBody, TableRow, TableCell,
//     Avatar, Typography, Chip, Pagination, Checkbox, Stack, TextField, Button,
//     Grid, Paper
// } from "@mui/material";
// import { CalendarRange, Filter, FileDown, Plus, EllipsisVertical } from "lucide-react";

// // import MoreVertIcon from '@mui/icons-material/MoreVert';
// import IconButton from "@mui/material/IconButton";

// const orders = [
//     {
//         id: "ORD-2024-001",
//         name: "John Smith",
//         email: "john.smith@email.com",
//         date: "2024-01-15",
//         status: "Completed",
//         amount: "$299.99",
//         payment: "Credit Card",
//         avatar: "https://randomuser.me/api/portraits/men/32.jpg"
//     },
//     {
//         id: "ORD-2024-002",
//         name: "Emma Wilson",
//         email: "emma.w@email.com",
//         date: "2024-01-15",
//         status: "Processing",
//         amount: "$149.50",
//         payment: "PayPal",
//         avatar: "https://randomuser.me/api/portraits/women/45.jpg"
//     },
//     {
//         id: "ORD-2024-003",
//         name: "Michael Brown",
//         email: "m.brown@email.com",
//         date: "2024-01-14",
//         status: "Cancelled",
//         amount: "$599.99",
//         payment: "Credit Card",
//         avatar: "https://randomuser.me/api/portraits/men/44.jpg"
//     },
//     {
//         id: "ORD-2024-004",
//         name: "Sarah Davis",
//         email: "sarah.d@email.com",
//         date: "2024-01-14",
//         status: "Completed",
//         amount: "$89.99",
//         payment: "PayPal",
//         avatar: "https://randomuser.me/api/portraits/women/33.jpg"
//     },
//     {
//         id: "ORD-2024-005",
//         name: "James Wilson",
//         email: "j.wilson@email.com",
//         date: "2024-01-13",
//         status: "Processing",
//         amount: "$199.99",
//         payment: "Credit Card",
//         avatar: "https://randomuser.me/api/portraits/men/12.jpg"
//     }
// ];

// const cardData = [
//     { title: "Total Orders", value: "1,234" },
//     { title: "Pending Orders", value: "45" },
//     { title: "Completed Orders", value: "1,189" },
// ];
// const getStatusColor = (status) => {
//     switch (status) {
//         case "Completed":
//             return "success";
//         case "Processing":
//             return "warning";
//         case "Cancelled":
//             return "error";
//         default:
//             return "default";
//     }
// };

// const OrdersTable = () => (
//     <>
//         <Box
//             display="flex"
//             flexWrap="wrap"
//             gap={2}
//             justifyContent="space-between"
//         >
//             {cardData.map((card, index) => (
//                 <Box
//                     key={index}
//                     flexBasis={{ xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.33% - 12px)' }}
//                 >
//                     <Paper elevation={2} sx={{ p: 3 }}>
//                         <Typography variant="body1" color="text.secondary">
//                             {card.title}
//                         </Typography>
//                         <Typography variant="h5" fontWeight={600}>
//                             {card.value}
//                         </Typography>
//                     </Paper>
//                 </Box>
//             ))}
//         </Box>
//         <Stack direction={{ xs: "column", sm: "row" }} mt={2} spacing={2} alignItems="center">
//             <TextField size="small" label="Search orders…" variant="outlined" />

//             <Button startIcon={<CalendarRange size={18} />} variant="outlined">
//                 Date Range
//             </Button>

//             <Button startIcon={<Filter size={18} />} variant="outlined">
//                 Status
//             </Button>

//             <Box flexGrow={1} />

//             <Button startIcon={<FileDown size={18} />} variant="outlined">
//                 Export
//             </Button>

//             <Button startIcon={<Plus size={18} />} variant="contained">
//                 Add New Order
//             </Button>
//         </Stack>
//         <Box>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell padding="checkbox"><Checkbox /></TableCell>
//                         <TableCell>Order ID</TableCell>
//                         <TableCell>Customer</TableCell>
//                         <TableCell>Date</TableCell>
//                         <TableCell>Status</TableCell>
//                         <TableCell>Amount</TableCell>
//                         <TableCell>Payment</TableCell>
//                         <TableCell>Actions</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {orders.map((order, idx) => (
//                         <TableRow key={idx}>
//                             <TableCell padding="checkbox"><Checkbox /></TableCell>
//                             <TableCell>{order.id}</TableCell>
//                             <TableCell>
//                                 <Box display="flex" alignItems="center" gap={1}>
//                                     <Avatar src={order.avatar} />
//                                     <Box>
//                                         <Typography>{order.name}</Typography>
//                                         <Typography fontSize={12} color="text.secondary">{order.email}</Typography>
//                                     </Box>
//                                 </Box>
//                             </TableCell>
//                             <TableCell>{order.date}</TableCell>
//                             <TableCell>
//                                 <Chip label={order.status} color={getStatusColor(order.status)} size="small" />
//                             </TableCell>
//                             <TableCell>{order.amount}</TableCell>
//                             <TableCell>{order.payment}</TableCell>
//                             <TableCell>
//               <IconButton><EllipsisVertical /></IconButton>
//             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//                 <Typography variant="body2">Showing 1 to 5 of 1,234 entries</Typography>
//                 <Pagination count={5} page={1} color="primary" />
//             </Box>
//         </Box>
//     </>
// );

// export default OrdersTable;
import {
  Box, Table, TableHead, TableBody, TableRow, TableCell,
  Avatar, Typography, Chip, Pagination, Checkbox, Stack, TextField, Button,
  Grid, Paper, TableSortLabel
} from "@mui/material";
import { CalendarRange, Filter, FileDown, Plus, EllipsisVertical } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { GET_ORDER_SUMMARY, GET_ORDERS } from "../../api/get";

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "success";
    case "pending":
    case "processing":
      return "warning";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};



const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [orderSummary, setOrderSummary] = useState();
  const cardData = [
    { title: "Total Orders", value: orderSummary?.totalOrders ?? 0 },
    { title: "Pending Orders", value: orderSummary?.pendingOrders ?? 0 },
    { title: "Completed Orders", value: orderSummary?.completedOrders ?? 0 },
  ];
  useEffect(() => {
    fetchOrderSummary()
  }, []);

  const fetchOrderSummary = () => {
    GET_ORDER_SUMMARY().then((res) => {
      setOrderSummary(res.data.data);

    }).catch((err) => {
      console.log(err);
    })
  }

  const fetchOrders = async () => {
    try {
      const res = await GET_ORDERS();
      let sorted = [...res.data].sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sorted);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [sortOrder]);

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <>
      {/* Summary Cards */}
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="space-between">
        {cardData.map((card, index) => (
          <Box key={index} flexBasis={{ xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.33% - 12px)' }}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="body1" color="text.secondary">{card.title}</Typography>
              <Typography variant="h5" fontWeight={600}>{card.value}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Filters & Search */}
      <Stack direction={{ xs: "column", sm: "row" }} mt={2} spacing={2} alignItems="center">
        <TextField size="small" label="Search orders…" variant="outlined" />
        <Button startIcon={<CalendarRange size={18} />} variant="outlined">Date Range</Button>
        <Button startIcon={<Filter size={18} />} variant="outlined">Status</Button>
        <Box flexGrow={1} />
        <Button startIcon={<FileDown size={18} />} variant="outlined">Export</Button>
        <Button startIcon={<Plus size={18} />} variant="contained">Add New Order</Button>
      </Stack>

      {/* Table */}
      <Box mt={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"><Checkbox /></TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Shipping Address</TableCell>
              <TableCell sortDirection={false}>
                <TableSortLabel
                  active
                  direction={sortOrder}
                  onClick={handleSortToggle}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell padding="checkbox"><Checkbox /></TableCell>
                <TableCell>{`ORD-${order.id}`}</TableCell>
                <TableCell>{order.shippingAddress}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>₹{order?.totalAmount?.toFixed(2)}</TableCell>
                <TableCell>
                  {order.OrderItems?.map(item => (
                    <Typography key={item.id} variant="body2">
                      {item.Product?.productType} x {item.quantity}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton><EllipsisVertical size={16} /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="body2">Showing {orders.length} entries</Typography>
          <Pagination count={1} page={1} color="primary" />
        </Box>
      </Box>
    </>
  );
};

export default OrdersTable;
