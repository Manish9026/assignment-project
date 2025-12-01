'use client';



import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  TablePagination,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';

import { useUsersStore } from '../store/usersStore';
import { Loader } from '@/common/components/Loader';
import { GridView, ViewList, VisibilityOutlined } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const MotionButton = motion.create(Button);
export const UserTable = () => {
  const navigate = useRouter();
  const { users, total, skip, limit, isLoading, fetchUsers, setPage } = useUsersStore();

  const [view, setView] = useState<"table" | "card">("table");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    fetchUsers(newLimit, 0);
  };

  if (isLoading && users.length === 0) {
    return <Loader message="Loading users..." />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <>
      {/* Toggle Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(e, val) => val && setView(val)}
        >
          <ToggleButton value="table">
            <ViewList />
          </ToggleButton>

          <ToggleButton value="card">
            <GridView />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {view === "table" ? (
        /* ------------------------ TABLE VIEW ------------------------ */
        <Paper elevation={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody
                component={motion.tbody}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    component={motion.tr}
                    variants={rowVariants}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar src={user.image} />
                        <Box>
                          <Box fontWeight={600}>
                            {user.firstName} {user.lastName}
                          </Box>
                          <Box fontSize="0.875rem" color="text.secondary">
                            @{user.username}
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.gender}
                        size="small"
                        color={user.gender === "male" ? "primary" : "secondary"}
                      />
                    </TableCell>
                    <TableCell>{user.company.name}</TableCell>

                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => navigate.push(`/users/${user.id}`)}
                      >
                        <VisibilityOutlined />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={total}
            page={Math.floor(skip / limit)}
            onPageChange={handleChangePage}
            rowsPerPage={limit}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20, 50]}
          />
        </Paper>
      ) : (
        /* ------------------------ CARD VIEW ------------------------ */
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)"
              },
              gap: 2,
            }}
          >
            {users?.map((user) => (
              <motion.div
                key={user.id}
                layout
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card elevation={4} sx={{ borderRadius: 3, height: "100%" }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Avatar
                      src={user.image}
                      sx={{ width: 70, height: 70, mx: "auto", mb: 1 }}
                    />

                    <Typography fontWeight={600} variant="h6">
                      {user.firstName} {user.lastName}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      @{user.username}
                    </Typography>

                    <Chip
                      label={user.gender}
                      size="small"
                      color={user.gender === "male" ? "primary" : "secondary"}
                      sx={{ mb: 2 }}
                    />

                    <Typography variant="body2">{user.email}</Typography>
                    <Typography variant="body2">{user.phone}</Typography>

                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {user.company.name}
                    </Typography>

                    <MotionButton
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => navigate.push(`/users/${user.id}`)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      startIcon={<VisibilityOutlined />}
                    >
                      View Details
                    </MotionButton>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>

        </motion.div>
      )}
    </>
  );

  // return (
  //   <Paper elevation={2}>
  //     <TableContainer>
  //       <Table>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell>User</TableCell>
  //             <TableCell>Email</TableCell>
  //             <TableCell>Phone</TableCell>
  //             <TableCell>Gender</TableCell>
  //             <TableCell>Company</TableCell>
  //             <TableCell align="center">Actions</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody component={motion.tbody} variants={containerVariants} initial="hidden" animate="visible">
  //           {users.map((user) => (
  //             <TableRow
  //               key={user.id}
  //               component={motion.tr}
  //               variants={rowVariants}
  //               whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
  //               sx={{ cursor: 'pointer' }}
  //             >
  //               <TableCell>
  //                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  //                   <Avatar src={user.image} alt={user.firstName} />
  //                   <Box>
  //                     <Box fontWeight={600}>
  //                       {user.firstName} {user.lastName}
  //                     </Box>
  //                     <Box fontSize="0.875rem" color="text.secondary">
  //                       @{user.username}
  //                     </Box>
  //                   </Box>
  //                 </Box>
  //               </TableCell>
  //               <TableCell>{user.email}</TableCell>
  //               <TableCell>{user.phone}</TableCell>
  //               <TableCell>
  //                 <Chip
  //                   label={user.gender}
  //                   size="small"
  //                   color={user.gender === 'male' ? 'primary' : 'secondary'}
  //                 />
  //               </TableCell>
  //               <TableCell>{user.company.name}</TableCell>
  //               <TableCell align="center">
  //                 <IconButton
  //                   size="small"
  //                   color="primary"
  //                   onClick={() => navigate.push(`/users/${user.id}`)}
  //                 >
  //                   <VisibilityOutlined />
  //                 </IconButton>
  //               </TableCell>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //     <TablePagination
  //       component="div"
  //       count={total}
  //       page={Math.floor(skip / limit)}
  //       onPageChange={handleChangePage}
  //       rowsPerPage={limit}
  //       onRowsPerPageChange={handleChangeRowsPerPage}
  //       rowsPerPageOptions={[5, 10, 20, 50]}
  //     />
  //   </Paper>
  // );
};
