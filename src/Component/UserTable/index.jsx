// import React, { useState } from 'react';
// import {
//   Avatar,
//   Box,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Pagination,
// } from '@mui/material';
// import { MoreVertical } from 'lucide-react';

// const users = [
//   {
//     id: 'USR001',
//     name: 'James Wilson',
//     email: 'james.wilson@email.com',
//     avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
//     registered: '2024-01-15',
//     lastPurchase: '2024-02-20',
//     status: 'Active',
//   },
//   {
//     id: 'USR002',
//     name: 'Michael Brown',
//     email: 'michael.b@email.com',
//     avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
//     registered: '2024-01-18',
//     lastPurchase: '2024-02-19',
//     status: 'Active',
//   },
//   {
//     id: 'USR003',
//     name: 'Robert Davis',
//     email: 'robert.d@email.com',
//     avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
//     registered: '2024-01-20',
//     lastPurchase: '2024-02-18',
//     status: 'Inactive',
//   },
//   {
//     id: 'USR004',
//     name: 'David Miller',
//     email: 'david.m@email.com',
//     avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
//     registered: '2024-01-22',
//     lastPurchase: '2024-02-17',
//     status: 'Active',
//   },
//   {
//     id: 'USR005',
//     name: 'Thomas Anderson',
//     email: 'thomas.a@email.com',
//     avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
//     registered: '2024-01-25',
//     lastPurchase: '2024-02-16',
//     status: 'Active',
//   },
// ];

// const getRole = (status) => {
//   return status === 'Active' ? 'Admin' : 'Customer';
// };

// export default function UserTable() {
//   const [page, setPage] = useState(1);

//   return (
//     <Box>
//       <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>User ID</strong></TableCell>
//               <TableCell><strong>Name</strong></TableCell>
//               <TableCell><strong>Email</strong></TableCell>
//               <TableCell><strong>Registration Date</strong></TableCell>
//               <TableCell><strong>Last Purchase</strong></TableCell>
//               <TableCell><strong>Role</strong></TableCell>
//               <TableCell align="right"><strong>Actions</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id} hover>
//                 <TableCell>{user.id}</TableCell>
//                 <TableCell>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Avatar src={user.avatar} alt={user.name} />
//                     <Typography variant="body2">{user.name}</Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.registered}</TableCell>
//                 <TableCell>{user.lastPurchase}</TableCell>
//                 <TableCell>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       px: 1.5,
//                       py: 0.5,
//                       borderRadius: 2,
//                       backgroundColor:
//                         getRole(user.status) === 'Admin' ? '#D1FAE5' : '#F3F4F6',
//                       color:
//                         getRole(user.status) === 'Admin' ? '#065F46' : '#4B5563',
//                       fontWeight: 500,
//                     }}
//                   >
//                     {getRole(user.status)}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right">
//                   <IconButton>
//                     <MoreVertical size={18} />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
//           <Typography variant="body2" color="text.secondary">
//             Showing 1 to 5 of 2,547 entries
//           </Typography>
//           <Pagination count={50} page={page} onChange={(e, val) => setPage(val)} />
//         </Box>
//       </TableContainer>
//     </Box>
//   );
// }

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  CircularProgress
} from '@mui/material';
import { MoreVertical } from 'lucide-react';
import axios from 'axios';
import { GET_USERS } from '../../api/get';

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Assumes token is stored in localStorage
        const res = await GET_USERS();
        setUsers(res.data.users || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getFormattedDate = (dateString) => new Date(dateString).toLocaleDateString();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Registered</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar>{user.name.charAt(0)}</Avatar>
                    <Typography variant="body2">{user.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.number || '-'}</TableCell>
                <TableCell>
                  <Typography
                    variant="caption"
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      backgroundColor: user.role === 'admin' ? '#D1FAE5' : '#F3F4F6',
                      color: user.role === 'admin' ? '#065F46' : '#4B5563',
                      fontWeight: 500,
                    }}
                  >
                    {user.role}
                  </Typography>
                </TableCell>
                <TableCell>{getFormattedDate(user.createdAt)}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <MoreVertical size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
          <Typography variant="body2" color="text.secondary">
            Showing {users.length} users
          </Typography>
          <Pagination count={1} page={page} onChange={(e, val) => setPage(val)} />
        </Box>
      </TableContainer>
    </Box>
  );
}

