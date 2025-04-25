// @ts-strict-ignore
import { channelAddUrl, channelUrl } from "@dashboard/business/utils/channels/urls";
import { ChannelDetailsFragment } from "@dashboard/graphql";
import { sectionNames } from "@dashboard/intl";
import { renderCollection, stopPropagation } from "@dashboard/misc";
import { TableBody, TableCell, TableHead } from "@material-ui/core";
import { configurationMenuUrl } from "@presentation/pages/configuration";
import { TopNav } from "@presentation/shared//AppLayout/TopNav";
import { Button } from "@presentation/shared//Button";
import { DashboardCard } from "@presentation/shared//Card";
import { ListPageLayout } from "@presentation/shared//Layouts";
import ResponsiveTable from "@presentation/shared//ResponsiveTable";
import { TableButtonWrapper } from "@presentation/shared//TableButtonWrapper/TableButtonWrapper";
import TableCellHeader from "@presentation/shared//TableCellHeader";
import TableRowLink from "@presentation/shared//TableRowLink";
import { DeleteIcon, IconButton } from "@saleor/macaw-ui";
import { Skeleton } from "@saleor/macaw-ui-next";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { useStyles } from "./styles";

export interface ChannelsListPageProps {
  channelsList: ChannelDetailsFragment[] | undefined;
  onRemove: (id: string) => void;
}

const numberOfColumns = 2;

export const ChannelsListPage: React.FC<ChannelsListPageProps> = ({ channelsList, onRemove }) => {
  const intl = useIntl();
  const classes = useStyles({});

  return (
    <ListPageLayout>
      <TopNav href={configurationMenuUrl} title={intl.formatMessage(sectionNames.channels)}>
        <Button href={channelAddUrl} variant="primary" data-test-id="add-channel">
          <FormattedMessage id="OGm8wO" defaultMessage="Create Channel" description="button" />
        </Button>
      </TopNav>
      <DashboardCard>
        <ResponsiveTable>
          <TableHead>
            <TableRowLink>
              <TableCellHeader>
                <FormattedMessage
                  id="j/vV0n"
                  defaultMessage="Channel Name"
                  description="channel name"
                />
              </TableCellHeader>
              <TableCell className={classes.colRight}>
                <FormattedMessage
                  id="VHuzgq"
                  defaultMessage="Actions"
                  description="table actions"
                />
              </TableCell>
            </TableRowLink>
          </TableHead>
          <TableBody data-test-id="channel-list">
            {renderCollection(
              channelsList,
              channel => (
                <TableRowLink
                  data-test-id="channel-row"
                  hover={!!channel}
                  key={channel ? channel.id : "skeleton"}
                  className={classes.tableRow}
                  href={channel && channelUrl(channel.id)}
                >
                  <TableCell className={classes.colName}>
                    <span data-test-id="name">{channel?.name || <Skeleton />}</span>
                  </TableCell>
                  <TableCell className={classes.colAction}>
                    {channelsList?.length > 1 && (
                      <TableButtonWrapper>
                        <IconButton
                          variant="secondary"
                          color="primary"
                          data-test-id="delete-channel"
                          onClick={
                            channel ? stopPropagation(() => onRemove(channel.id)) : undefined
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableButtonWrapper>
                    )}
                  </TableCell>
                </TableRowLink>
              ),
              () => (
                <TableRowLink>
                  <TableCell colSpan={numberOfColumns}>
                    <FormattedMessage id="/glQgs" defaultMessage="No channels found" />
                  </TableCell>
                </TableRowLink>
              ),
            )}
          </TableBody>
        </ResponsiveTable>
      </DashboardCard>
    </ListPageLayout>
  );
};

ChannelsListPage.displayName = "ChannelsListPage";
export default ChannelsListPage;
