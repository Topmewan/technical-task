import {AppBar, Toolbar, Typography} from "@material-ui/core";

function Navbar() {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant="h5">Каталог</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;