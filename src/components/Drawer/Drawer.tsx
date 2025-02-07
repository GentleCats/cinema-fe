import { Box, Drawer } from '@mui/material';

import { bottomNav } from './BottomNav';
import { leftNav } from './LeftNav';
import { styles } from './styles.mui';

const SideBar = () => {
  return (
    <>
      <Box component="nav" sx={styles.wrapper}>
        <Drawer variant="permanent" sx={styles.permanentDrawer} open>
          {leftNav}
        </Drawer>
      </Box>
      {bottomNav}
    </>
  );
};

export default SideBar;
