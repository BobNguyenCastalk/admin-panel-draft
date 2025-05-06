import { useCallback, useState } from "react";

import { GridMouseEventArgs } from "@glideapps/glide-data-grid";

export const useRowHover = ({
  hasRowHover,
  onRowHover,
}: {
  hasRowHover?: boolean;
  onRowHover?: (args: GridMouseEventArgs) => void;
}) => {
  const [hoverRow, setHoverRow] = useState<number | undefined>(undefined);

  const handleRowHover = useCallback(
    (args: GridMouseEventArgs) => {
      if (hasRowHover) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, row] = args.location;

        setHoverRow(args.kind !== "cell" ? undefined : row);
      }

      onRowHover?.(args);
    },
    [hasRowHover, onRowHover],
  );

  return {
    hoverRow,
    handleRowHover,
  };
};
