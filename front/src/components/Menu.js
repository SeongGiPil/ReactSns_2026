import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Toolbar,
  ListItemIcon
} from '@mui/material';

import {
  Home,
  Add,
  AccountCircle
} from '@mui/icons-material';

import { Link } from 'react-router-dom';

function Menu() {

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,

        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >

      {/* 상단 여백 */}
      <Toolbar />

      {/* 메뉴 제목 */}
      <Typography
        variant="h6"
        component="div"
        sx={{ p: 2 }}
      >
        SNS 메뉴
      </Typography>

      <List>

        {/* 피드 */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/feed">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="피드" />
          </ListItemButton>
        </ListItem>

        {/* 등록 */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/register">
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="등록" />
          </ListItemButton>
        </ListItem>

        {/* 마이페이지 */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/mypage">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="마이페이지" />
          </ListItemButton>
        </ListItem>

        {/* context 예제 */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/contextEx1">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Context 예제" />
          </ListItemButton>
        </ListItem>

      </List>

    </Drawer>
  );
}

export default Menu;