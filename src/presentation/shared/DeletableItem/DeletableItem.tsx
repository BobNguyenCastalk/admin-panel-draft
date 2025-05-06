import React from "react";

import { DeleteIcon, IconButton } from "@saleor/macaw-ui";

interface DeletableItemProps {
  onDelete: (id: string) => void;
  id: string;
}

const DeletableItem: React.FC<DeletableItemProps> = ({ onDelete, id }) => {
  const handleDelete = () => onDelete(id);

  return (
    <IconButton variant="secondary" onClick={handleDelete}>
      <DeleteIcon />
    </IconButton>
  );
};

export default DeletableItem;
