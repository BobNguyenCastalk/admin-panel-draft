// @ts-strict-ignore
import {
  channelsListUrl,
  ChannelsListUrlDialog,
  ChannelsListUrlQueryParams,
} from "@business/utils/channels/urls";
import { getChannelsCurrencyChoices } from "@dashboard/business/utils/channels/utils";
import getChannelsErrorMessage from "@dashboard/business/utils/shared/errors/channels";
import createDialogActionHandlers from "@dashboard/business/utils/shared/handlers/dialogActionHandlers";
import {
  ChannelDeleteMutation,
  useChannelDeleteMutation,
  useChannelsQuery,
} from "@dashboard/graphql";
import useNavigator from "@dashboard/hooks/useNavigator";
import useNotifier from "@dashboard/hooks/useNotifier";
import React from "react";
import { useIntl } from "react-intl";

import ChannelDeleteDialog from "../../components/ChannelDeleteDialog";
import ChannelsListPage from "../../pages/ChannelsListPage";

interface ChannelsListProps {
  params: ChannelsListUrlQueryParams;
}

export const ChannelsList: React.FC<ChannelsListProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const { data, refetch } = useChannelsQuery({ displayLoader: true });

  const selectedChannel = data?.channels?.find(channel => channel.id === params?.id);
  const [openModal, closeModal] = createDialogActionHandlers<
    ChannelsListUrlDialog,
    ChannelsListUrlQueryParams
  >(navigate, channelsListUrl, params);
  const onCompleted = (data: ChannelDeleteMutation) => {
    const errors = data.channelDelete.errors;

    if (errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage({
          id: "AkyGP2",
          defaultMessage: "Channel deleted",
        }),
      });
      refetch();
      closeModal();
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
    onCompleted,
  });
  const channelsChoices = getChannelsCurrencyChoices(params.id, selectedChannel, data?.channels);
  const handleRemoveConfirm = (channelId?: string) => {
    const inputVariables = channelId ? { input: { channelId } } : {};

    deleteChannel({
      variables: {
        id: params.id,
        ...inputVariables,
      },
    });
  };

  return (
    <>
      <ChannelsListPage
        channelsList={data?.channels}
        onRemove={id =>
          openModal("remove", {
            id,
          })
        }
      />

      {!!selectedChannel && (
        <ChannelDeleteDialog
          currency={selectedChannel.currencyCode}
          channelsChoices={channelsChoices}
          channelSlug={selectedChannel?.slug}
          hasOrders={selectedChannel.hasOrders}
          open={params.action === "remove"}
          confirmButtonState={deleteChannelOpts.status}
          onBack={() => navigate(channelsListUrl())}
          onClose={closeModal}
          onConfirm={handleRemoveConfirm}
        />
      )}
    </>
  );
};

ChannelsList.displayName = "ChannelsList";
export default ChannelsList;
