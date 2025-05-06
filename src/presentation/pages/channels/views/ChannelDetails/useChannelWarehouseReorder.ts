import { useIntl } from "react-intl";

import useNotifier from "@dashboard/business/hooks/shared/useNotifier";
import getChannelsErrorMessage from "@dashboard/business/utils/shared/errors/channels";
import { useChannelReorderWarehousesMutation, WarehouseFragment } from "@dashboard/graphql";
import { ChannelWarehouse } from "@presentation/pages/channels/pages/ChannelDetailsPage/types";
import { calculateItemsOrderMoves } from "@presentation/pages/channels/views/ChannelDetails/handlers";

export const useChannelWarehousesReorder = () => {
  const notify = useNotifier();
  const intl = useIntl();

  const [reorderChannelWarehouses, reorderChannelWarehousesOpts] =
    useChannelReorderWarehousesMutation({
      onCompleted: data => {
        const errors = data?.channelReorderWarehouses?.errors ?? [];

        if (errors.length) {
          errors.forEach(error =>
            notify({
              status: "error",
              text: getChannelsErrorMessage(error, intl),
            }),
          );
        }
      },
    });

  const handleChannelWarehousesReorder = ({
    warehousesToDisplay,
    warehouses,
    channelId,
  }: {
    channelId: string;
    warehouses: WarehouseFragment[];
    warehousesToDisplay: ChannelWarehouse[];
  }) => {
    const moves = calculateItemsOrderMoves(warehouses, warehousesToDisplay);

    if (!moves.length) {
      return;
    }

    return reorderChannelWarehouses({
      variables: {
        channelId,
        moves,
      },
    });
  };

  return {
    reorderChannelWarehouses: handleChannelWarehousesReorder,
    reorderChannelWarehousesOpts,
  };
};
