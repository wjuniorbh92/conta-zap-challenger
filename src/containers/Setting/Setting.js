import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import PaletteIcon from "@material-ui/icons/Palette";
import { useSelector, useDispatch } from 'react-redux';
import { toggleThemeMode,  isDarkMode,  } from "../../store/reducers/settingsReducer";

export default function Setting() {

  const darkMode = useSelector(isDarkMode);

  const dispatch = useDispatch();

  return (
  <div>
    <Typography variant="h6">Configuraçōes</Typography>
    <Card>
      <CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <PaletteIcon />
            </ListItemIcon>
            <ListItemText primary="Dark Mode" />
            <ListItemSecondaryAction>
              <Switch
                onChange={(e, checked) =>  dispatch(toggleThemeMode(checked))}
                checked={darkMode}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>     
          </ListItem>
        </List>
      </CardContent>
    </Card>
  </div>);
};
