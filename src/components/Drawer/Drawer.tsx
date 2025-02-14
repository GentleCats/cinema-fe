import { Box, Drawer } from '@mui/material';

import { styles } from './styles.mui';
import LeftNav from './LeftNav';
import BottomNav from './BottomNav';

const SideBar = () => {
  return (
    <>
      <Box component="nav" sx={styles.wrapper}>
        <Drawer variant="permanent" sx={styles.permanentDrawer} open>
          <LeftNav/>
        </Drawer>
      </Box>
      <BottomNav/>
    </>
  );
};

export default SideBar;
