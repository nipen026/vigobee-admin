// import React from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   Chip,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Divider,
//   Button,
// } from "@mui/material";
// import {
//   BarChart2,
//   ShoppingBag,
//   Users,
//   DollarSign,
// } from "lucide-react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
// } from "chart.js";

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// const summaryData = [
//   {
//     label: "Total Sales",
//     value: "$124,563",
//     icon: <DollarSign size={20} />,
//     trend: "+12.5%",
//     trendColor: "green",
//   },
//   {
//     label: "Total Orders",
//     value: "1,247",
//     icon: <ShoppingBag size={20} />,
//     trend: "+8.2%",
//     trendColor: "green",
//   },
//   {
//     label: "Active Customers",
//     value: "856",
//     icon: <Users size={20} />,
//     trend: "+5.3%",
//     trendColor: "green",
//   },
//   {
//     label: "Average Order",
//     value: "$99.89",
//     icon: <BarChart2 size={20} />,
//     trend: "-2.1%",
//     trendColor: "red",
//   },
// ];

// const DashboardComponents = () => {
//   const lineChartData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "Sales",
//         data: [4300, 3700, 5500, 3200, 2500, 3000],
//         borderColor: "#3f51b5",
//         fill: false,
//       },
//     ],
//   };

//   return (
//     <Box p={3} display="flex" flexDirection="column" gap={3}>
//       {/* Top Cards */}
//       <Box display="flex" gap={2} flexWrap="wrap">
//         {summaryData.map((card, i) => (
//           <Card key={i} sx={{ flex: 1, minWidth: 200 }}>
//             <CardContent>
//               <Box display="flex" alignItems="center" gap={1}>
//                 <Avatar sx={{ bgcolor: "#e0f2f1", color: "#00695c" }}>
//                   {card.icon}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="body2">{card.label}</Typography>
//                   <Typography variant="h6">{card.value}</Typography>
//                   <Typography
//                     variant="caption"
//                     color={card.trendColor === "green" ? "green" : "red"}
//                   >
//                     {card.trend}
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>

//       {/* Chart + Tables */}
//       <Box display="flex" gap={2} flexWrap="wrap">
//         {/* Chart Section */}
//         <Card sx={{ flex: 2, minWidth: 300 }}>
//           <CardContent>
//             <Box display="flex" justifyContent="space-between" mb={2}>
//               <Typography variant="h6">Sales Performance</Typography>
//               <Box display="flex" gap={1}>
//                 {["Daily", "Weekly", "Monthly", "Yearly"].map((label) => (
//                   <Button
//                     key={label}
//                     size="small"
//                     variant={label === "Monthly" ? "contained" : "text"}
//                   >
//                     {label}
//                   </Button>
//                 ))}
//               </Box>
//             </Box>
//             <Line data={lineChartData} />
//           </CardContent>
//         </Card>

//         {/* Orders & Products */}
//         <Box flex={1} display="flex" flexDirection="column" gap={2}>
//           {/* Recent Orders */}
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Recent Orders
//               </Typography>
//               <Box>
//                 {[
//                   { id: "#12345", customer: "John Doe", amount: "$129.99", status: "Completed" },
//                   { id: "#12346", customer: "Jane Smith", amount: "$89.99", status: "Pending" },
//                   { id: "#12347", customer: "Mike Johnson", amount: "$199.99", status: "Processing" },
//                   { id: "#12348", customer: "Sarah Williams", amount: "$149.99", status: "Completed" },
//                 ].map((order) => (
//                   <Box key={order.id} display="flex" justifyContent="space-between" py={1}>
//                     <Typography>{order.id}</Typography>
//                     <Typography>{order.customer}</Typography>
//                     <Typography>{order.amount}</Typography>
//                     <Chip
//                       label={order.status}
//                       size="small"
//                       color={
//                         order.status === "Completed"
//                           ? "success"
//                           : order.status === "Pending"
//                           ? "warning"
//                           : "primary"
//                       }
//                     />
//                   </Box>
//                 ))}
//               </Box>
//             </CardContent>
//           </Card>

//           {/* Top Selling Products */}
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Top Selling Products
//               </Typography>
//               <List>
//                 {[
//                   {
//                     name: "Premium Cotton T-Shirt",
//                     sales: "234",
//                     price: "$12,450",
//                     img: "https://via.placeholder.com/40",
//                   },
//                   {
//                     name: "Classic Denim Jeans",
//                     sales: "189",
//                     price: "$8,970",
//                     img: "https://via.placeholder.com/40",
//                   },
//                   {
//                     name: "Leather Jacket",
//                     sales: "156",
//                     price: "$8,970",
//                     img: "https://via.placeholder.com/40",
//                   },
//                   {
//                     name: "Casual Sneakers",
//                     sales: "145",
//                     price: "$7,890",
//                     img: "https://via.placeholder.com/40",
//                   },
//                 ].map((product) => (
//                   <ListItem key={product.name} disableGutters>
//                     <ListItemAvatar>
//                       <Avatar src={product.img} alt={product.name} />
//                     </ListItemAvatar>
//                     <ListItemText
//                       primary={product.name}
//                       secondary={`${product.sales} sales`}
//                     />
//                     <Typography>{product.price}</Typography>
//                   </ListItem>
//                 ))}
//               </List>
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default DashboardComponents;
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import {
  BarChart2,
  ShoppingBag,
  Users,
  DollarSign,
} from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { GET_DASHBOARD } from "../../api/get";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const DashboardComponents = () => {
  const [totals, setTotals] = useState({});
  const [statusSummary, setStatusSummary] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Monthly");

  const fetchDashboardData = (filter = "Monthly") => {
    GET_DASHBOARD(filter)
      .then((res) => {
        const data = res.data;
        setTotals(data.totals);
        setStatusSummary(data.statusSummary);
        setChartData(data.chart);
        setTopProducts(data.topSellingProducts);
        setRecentOrders(data.recentOrders);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
      });
  };

  useEffect(() => {
    fetchDashboardData(activeFilter);
  }, [activeFilter]);

  const summaryData = [
    {
      label: "Total Products",
      value: totals.totalProducts ?? 0,
      icon: <ShoppingBag size={20} />,
    },
    {
      label: "Total Orders",
      value: totals.totalOrders ?? 0,
      icon: <BarChart2 size={20} />,
    },
    {
      label: "Inventory",
      value: totals.totalInventory ?? 0,
      icon: <Users size={20} />,
    },
    {
      label: "Revenue",
      value: totals.totalRevenue ? `₹${totals.totalRevenue}` : "₹0",
      icon: <DollarSign size={20} />,
    },
  ];

  const lineChartData = {
    labels: chartData.map((item) => item.date),
    datasets: [
      {
        label: "Sales",
        data: chartData.map((item) => item.totalSales),
        borderColor: "#3f51b5",
        fill: false,
      },
    ],
  };

  return (
    <Box p={3} display="flex" flexDirection="column" gap={3}>
      {/* Summary Cards */}
      <Box display="flex" gap={2} flexWrap="wrap">
        {summaryData.map((card, i) => (
          <Card key={i} sx={{ flex: 1, minWidth: 200 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar sx={{ bgcolor: "#e0f2f1", color: "#00695c" }}>
                  {card.icon}
                </Avatar>
                <Box>
                  <Typography variant="body2">{card.label}</Typography>
                  <Typography variant="h6">{card.value}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Chart + Right Panel */}
      <Box display="flex" gap={2} flexWrap="wrap">
        {/* Chart Card */}
        <Card sx={{ flex: 2, minWidth: 300 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Sales Performance</Typography>
              <Box display="flex" gap={1}>
                {["Daily", "Weekly", "Monthly", "Yearly"].map((label) => (
                  <Button
                    key={label}
                    size="small"
                    variant={label === activeFilter ? "contained" : "text"}
                    onClick={() => setActiveFilter(label)}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            </Box>
            <Line data={lineChartData} />
          </CardContent>
        </Card>

        {/* Right Side – Orders + Products */}
        <Box flex={1} display="flex" flexDirection="column" gap={2}>
          {/* Recent Orders */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Orders
              </Typography>
              <Box>
                {recentOrders.map((order) => (
                  <Box
                    key={order.id}
                    display="flex"
                    justifyContent="space-between"
                    py={1}
                  >
                    <Typography>#{order.id}</Typography>
                    <Typography>{order.customerName}</Typography>
                    <Typography>₹{order.totalAmount}</Typography>
                    <Chip
                      label={order.status}
                      size="small"
                      color={
                        order.status === "Completed"
                          ? "success"
                          : order.status === "Pending"
                          ? "warning"
                          : "primary"
                      }
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Top Selling Products */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Selling Products
              </Typography>
              <List>
                {topProducts.map((product) => (
                  <ListItem key={product.productId} disableGutters>
                    <ListItemAvatar>
                      <Avatar
                        src={product.images?.[0]}
                        alt={product.brandName}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={product.brandName}
                      secondary={`${product.totalSold} sold`}
                    />
                    <Typography>₹{product.revenue}</Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardComponents;

