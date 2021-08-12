import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

type PropsType = {
  onClick: () => void;
};

const useStyles = makeStyles({
  root: {
    minWidth: 300,
  },
  title: {
    fontSize: 18,
    display: "flex",
    justifyContent: "center",
  },
  pos: {
    marginBottom: 12,
  },
  flexMiddle: {
    justifyContent: "center",
  },
});

const Modal: React.FC<PropsType> = ({ onClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Tracking Coming Soon
        </Typography>
      </CardContent>
      <CardActions className={classes.flexMiddle}>
        <Button size="small" onClick={onClick}>
          OK
        </Button>
      </CardActions>
    </div>
  );
};

export default Modal;
