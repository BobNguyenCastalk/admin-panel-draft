// @ts-strict-ignore
import {
  channelsListUrl,
  channelUrl,
  ChannelUrlDialog,
  ChannelUrlQueryParams,
} from "@business/utils/channels/urls";
import { getSearchFetchMoreProps } from "@dashboard/business/hooks/shared/makeTopLevelSearch/utils";
import useNavigator from "@dashboard/business/hooks/shared/useNavigator";
import useNotifier from "@dashboard/business/hooks/shared/useNotifier";
import { getDefaultNotifierSuccessErrorData } from "@dashboard/business/hooks/shared/useNotifier/utils";
import { extractMutationErrors } from "@dashboard/business/misc";
import { getChannelsCurrencyChoices } from "@dashboard/business/utils/channels/utils";
import getChannelsErrorMessage from "@dashboard/business/utils/shared/errors/channels";
import createDialogActionHandlers from "@dashboard/business/utils/shared/handlers/dialogActionHandlers";
import { mapEdgesToItems } from "@dashboard/business/utils/shared/maps";
import {
  ChannelDeleteMutation,
  ChannelErrorFragment,
  ChannelUpdateMutation,
  useChannelActivateMutation,
  useChannelDeactivateMutation,
  useChannelDeleteMutation,
  useChannelQuery,
  useChannelsQuery,
  useChannelUpdateMutation,
} from "@dashboard/graphql";
import ChannelDeleteDialog from "@presentation/pages/channels/components/ChannelDeleteDialog";
import { FormData } from "@presentation/pages/channels/components/ChannelForm/ChannelForm";
import { useChannelWarehousesReorder } from "@presentation/pages/channels/views/ChannelDetails/useChannelWarehouseReorder";
import { WindowTitle } from "@presentation/shared/WindowTitle";
import React from "react";
import { useIntl } from "react-intl";

import ChannelDetailsPage from "../../pages/ChannelDetailsPage";

interface ChannelDetailsProps {
  id: string;
  params: ChannelUrlQueryParams;
}

export const ChannelDetails: React.FC<ChannelDetailsProps> = ({ id, params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const channelsListData = useChannelsQuery({ displayLoader: true });

  const [openModal, closeModal] = createDialogActionHandlers<
    ChannelUrlDialog,
    ChannelUrlQueryParams
  >(navigate, params => channelUrl(id, params), params);

  const [updateChannel, updateChannelOpts] = useChannelUpdateMutation({
    onCompleted: ({ channelUpdate: { errors } }: ChannelUpdateMutation) =>
      notify(getDefaultNotifierSuccessErrorData(errors, intl)),
  });

  const { data, loading } = useChannelQuery({
    displayLoader: true,
    variables: { id },
  });

  const { reorderChannelWarehouses, reorderChannelWarehousesOpts } = useChannelWarehousesReorder();

  const handleError = (error: ChannelErrorFragment) => {
    notify({
      status: "error",
      text: getChannelsErrorMessage(error, intl),
    });
  };

  const [activateChannel, activateChannelOpts] = useChannelActivateMutation({
    onCompleted: data => {
      const errors = data.channelActivate.errors;

      if (errors.length) {
        errors.forEach(error => handleError(error));
      }
    },
  });

  const [deactivateChannel, deactivateChannelOpts] = useChannelDeactivateMutation({
    onCompleted: data => {
      const errors = data.channelDeactivate.errors;

      if (errors.length) {
        errors.forEach(error => handleError(error));
      }
    },
  });

  const handleSubmit = async ({
    allocationStrategy,
    allowUnpaidOrders,
    defaultCountry,
    defaultTransactionFlowStrategy,
    deleteExpiredOrdersAfter,
    markAsPaidStrategy,
    name,
    shippingZonesIdsToAdd,
    shippingZonesIdsToRemove,
    slug,
    warehousesIdsToAdd,
    warehousesIdsToRemove,
    warehousesToDisplay,
    automaticallyCompleteCheckouts,
  }: FormData) => {
    const updateChannelMutation = updateChannel({
      variables: {
        id: data?.channel.id,
        input: {
          name,
          checkoutSettings: {
            automaticallyCompleteFullyPaidCheckouts: automaticallyCompleteCheckouts,
          },
          slug,
          defaultCountry,
          addShippingZones: shippingZonesIdsToAdd,
          removeShippingZones: shippingZonesIdsToRemove,
          addWarehouses: warehousesIdsToAdd,
          removeWarehouses: warehousesIdsToRemove,
          stockSettings: {
            allocationStrategy,
          },
          paymentSettings: {
            defaultTransactionFlowStrategy,
          },
          orderSettings: {
            markAsPaidStrategy,
            deleteExpiredOrdersAfter,
            allowUnpaidOrders,
          },
        },
      },
    });

    const resultChannel = await updateChannelMutation;
    const errors = await extractMutationErrors(updateChannelMutation);

    if (!errors?.length) {
      await reorderChannelWarehouses({
        channelId: id,
        warehousesToDisplay,
        warehouses: resultChannel.data?.channelUpdate.channel?.warehouses,
      });
    }

    return errors;
  };

  const onDeleteCompleted = (data: ChannelDeleteMutation) => {
    const errors = data.channelDelete.errors;

    if (errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage({
          id: "AkyGP2",
          defaultMessage: "Channel deleted",
        }),
      });
      closeModal();
      navigate(channelsListUrl());
    } else {
      errors.map(error =>
        notify({
          status: "error",
          text: getChannelsErrorMessage(error, intl),
        }),
      );
    }
  };

  const [deleteChannel, deleteChannelOpts] = useChannelDeleteMutation({
    onCompleted: onDeleteCompleted,
  });

  const channelsChoices = getChannelsCurrencyChoices(
    id,
    data?.channel,
    channelsListData?.data?.channels,
  );

  const handleRemoveConfirm = (channelId?: string) => {
    const data = channelId ? { id, input: { channelId } } : { id };

    deleteChannel({ variables: data });
  };

  const channelWarehouses = data?.channel?.warehouses || [];

  return (
    <>
      <WindowTitle
        title={intl.formatMessage({
          id: "D9Rg+F",
          defaultMessage: "Channel details",
          description: "window title",
        })}
      />
      <ChannelDeleteDialog
        channelSlug={data?.channel?.slug}
        currency={data?.channel?.currencyCode}
        channelsChoices={channelsChoices}
        hasOrders={data?.channel?.hasOrders}
        open={params.action === "remove"}
        confirmButtonState={deleteChannelOpts.status}
        onBack={() => navigate(channelsListUrl())}
        onClose={closeModal}
        onConfirm={handleRemoveConfirm}
      />
    </>
  );
};

export default ChannelDetails;
