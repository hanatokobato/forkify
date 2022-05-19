import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  Typography,
} from '@mui/material';
import {
  BookmarkBorder,
  DensityMedium,
  Logout,
  OpenInNew,
} from '@mui/icons-material';
import { useAuth0 } from '@auth0/auth0-react';
import Bookmarks from '../Bookmarks';

const PREFIX = 'HeaderMenu';

const classes = {
  button: `${PREFIX}-button`,
  menuItem: `${PREFIX}-menuItem`,
};

const StyledButton = styled(Button)(({ theme }) => ({
  [`&.${classes.button}`]: {
    minWidth: '40px',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  [`&.${classes.menuItem}`]: {
    fontSize: '1.6rem',
  },
}));

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transparent',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
  },
}));

export default function HeaderMenu({ openNewRecipeHandler }: any) {
  const { logout } = useAuth0();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenAddRecipe = () => {
    handleClose();
    openNewRecipeHandler();
  };

  return (
    <>
      <IconButton
        component={StyledButton}
        aria-label="Show more"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
        size="medium"
        id="basic-button"
        className={classes.button}
      >
        <DensityMedium fontSize="medium" color="primary" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <StyledMenuItem
          onClick={handleOpenAddRecipe}
          className={classes.menuItem}
        >
          <ListItemIcon>
            <OpenInNew fontSize="medium" color="primary" />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="inherit">Add recipe</Typography>
          </ListItemText>
        </StyledMenuItem>
        <HtmlTooltip placement="left-start" title={<Bookmarks />}>
          <StyledMenuItem onClick={handleClose} className={classes.menuItem}>
            <ListItemIcon>
              <BookmarkBorder fontSize="medium" color="primary" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="inherit">Bookmarks</Typography>
            </ListItemText>
          </StyledMenuItem>
        </HtmlTooltip>
        <StyledMenuItem
          onClick={() => logout({ returnTo: window.location.origin })}
          className={classes.menuItem}
        >
          <ListItemIcon>
            <Logout fontSize="medium" color="primary" />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="inherit">Logout</Typography>
          </ListItemText>
        </StyledMenuItem>
      </Menu>
    </>
  );
}
