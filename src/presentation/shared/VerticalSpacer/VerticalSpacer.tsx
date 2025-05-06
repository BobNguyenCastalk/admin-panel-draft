import React from "react";

import { makeStyles } from "@saleor/macaw-ui";

export interface VerticalSpacerProps {
  spacing?: number;
}

const useStyles = makeStyles(
  theme => ({
    container: ({ spacing }: Required<VerticalSpacerProps>) => ({
      height: theme.spacing(spacing),
    }),
  }),
  { name: "VerticalSpacer" },
);
const VerticalSpacer: React.FC<VerticalSpacerProps> = ({ spacing = 1 }) => {
  const classes = useStyles({ spacing });

  return <div className={classes.container} />;
};

export default VerticalSpacer;
