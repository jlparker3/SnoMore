import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    
  }
});

export default function SimpleCard() {
  const classes = useStyles();


  return (
    <Card className={classes.root} style={{backgroundColor:"lightgrey", marginTop: "20px"}}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Your Jobs
        </Typography>
        <Typography variant="body2" component="p">
          Description of job
          <br />
         
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">See More</Button>
      </CardActions>
    </Card>
  );
}
