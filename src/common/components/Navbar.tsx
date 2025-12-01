'use client';

import { AppBar, Toolbar, Typography, Button, IconButton, Box, Avatar } from '@mui/material';
import { Brightness4, Brightness7, Logout, Dashboard, People, Inventory } from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useThemeStore } from '@/common/utils/themeStore';

import { motion } from 'framer-motion';
import { ROUTES } from '../utils/constants';

const MotionButton = motion.create(Button);

import {

  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,

} from "@mui/material";

import {
  Menu as MenuIcon,

} from "@mui/icons-material";
import { useState } from 'react';



export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { mode, toggleTheme } = useThemeStore();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  if (path === "/auth/login") return null;

  const mobileMenuItems = [
    { label: "Users", icon: <People />, path: "/users" },
    { label: "Products", icon: <Inventory />, path: "/products" },
  ];

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Dashboard />
            <Typography variant="h6" fontWeight={600} sx={{ display: { xs: "none", sm: "block" } }}>
              Dashboard
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, flexGrow: 1, ml: 3 }}>
          

            <MotionButton
              color="inherit"
              startIcon={<People />}
              onClick={() => router.push('/users')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Users
            </MotionButton>
            <MotionButton
              color="inherit"
              startIcon={<Inventory />}
              onClick={() => router.push('/products')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Products
            </MotionButton>

          </Box>

          {/* Right side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Theme Toggle */}
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            {/* User Info - hide on xs */}
            {user && (
              <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 1 }}>
                <Avatar src={user.image} sx={{ width: 32, height: 32 }} />
                <Typography variant="body2">
                  {user.firstName} {user.lastName}
                </Typography>
              </Box>
            )}

            {/* Logout for desktop */}
            {isAuthenticated && (
              <IconButton title='Logout' aria-label='Logout' color="inherit" onClick={handleLogout}>
                <Logout />
              </IconButton>
            )}

            {/* Hamburger – visible only on small screens */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              color="inherit"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 250 } }}
      >
        <List>
          {mobileMenuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push(item.path);
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}

          {/* Mobile Logout */}
          {isAuthenticated && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
}


// export default function Navbar() {
//   const router = useRouter();
//   const path=usePathname();
//   const { user, logout, isAuthenticated } = useAuthStore();
//   const { mode, toggleTheme } = useThemeStore();

//   const handleLogout = () => {
//     logout();
//     router.push(ROUTES.LOGIN);
//   };

//   // console.log(path=='/auth/login');



//   if (path=='/auth/login') {
//     return null;
//   }

//   return (
//     <AppBar position="sticky" elevation={2}>
//       <Toolbar>
//         <Dashboard sx={{ mr: 1 }} />
//         <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 3, fontWeight: 600 }}>
//           Dashboard
//         </Typography>



//         <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
//           <MotionButton
//             color="inherit"
//             startIcon={<People />}
//             onClick={() => router.push('/users')}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Users
//           </MotionButton>
//           <MotionButton
//             color="inherit"
//             startIcon={<Inventory />}
//             onClick={() => router.push('/products')}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Products
//           </MotionButton>
//         </Box>

//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <IconButton onClick={toggleTheme} color="inherit">
//             {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
//           </IconButton>

//           {user && (
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Avatar src={user.image} alt={user.username} sx={{ width: 32, height: 32 }} />
//               <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
//                 {user.firstName} {user.lastName}
//               </Typography>
//             </Box>
//           )}

// {
//   isAuthenticated && <IconButton color="inherit" onClick={handleLogout} title="Logout">
//             <Logout />
//           </IconButton>
// }

//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }


export { Navbar };