
import ResponsiveAppBar from './ResponsiveAppBar';
import Box from '@mui/material/Box';
import { Outlet } from "react-router-dom";
export default function Wrapper(props) {

    return (
        <>
        <Box sx={{ display: 'flex' }}>
        <ResponsiveAppBar/>
        <Outlet />
        </Box>
    
      </>
    )
}