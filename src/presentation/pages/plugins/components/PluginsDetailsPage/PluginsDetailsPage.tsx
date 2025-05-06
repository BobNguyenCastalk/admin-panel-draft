// @ts-strict-ignore
import React from "react";
import { useIntl } from "react-intl";

import { ChangeEvent, SubmitPromise } from "@dashboard/business/hooks/shared/useForm";
import useNavigator from "@dashboard/business/hooks/shared/useNavigator";
import { getStringOrPlaceholder } from "@dashboard/business/misc";
import { pluginListUrl } from "@dashboard/business/utils/plugins/urls";
import { isSecretField } from "@dashboard/business/utils/plugins/utils";
import {
  ConfigurationItemInput,
  PluginConfigurationExtendedFragment,
  PluginErrorFragment,
  PluginsDetailsFragment,
} from "@dashboard/graphql";
import { TopNav } from "@presentation/shared/AppLayout/TopNav";
import CardSpacer from "@presentation/shared/CardSpacer";
import { ConfirmButtonTransitionState } from "@presentation/shared/ConfirmButton";
import Form from "@presentation/shared/Form";
import Grid from "@presentation/shared/Grid";
import { DetailPageLayout } from "@presentation/shared/Layouts";
import { Savebar } from "@presentation/shared/Savebar";

import PluginAuthorization from "../PluginAuthorization";
import PluginDetailsChannelsCard from "../PluginDetailsChannelsCard";
import PluginInfo from "../PluginInfo";
import PluginSettings from "../PluginSettings";

export interface PluginDetailsPageFormData {
  active: boolean;
  configuration: ConfigurationItemInput[];
}

export interface PluginsDetailsPageProps {
  disabled: boolean;
  errors: PluginErrorFragment[];
  plugin?: PluginsDetailsFragment;
  saveButtonBarState: ConfirmButtonTransitionState;
  onClear: (field: string) => void;
  onEdit: (field: string) => void;
  onSubmit: (data: PluginDetailsPageFormData) => SubmitPromise;
  selectedConfig?: PluginConfigurationExtendedFragment;
  setSelectedChannelId: (channelId: string) => void;
}

const PluginsDetailsPage: React.FC<PluginsDetailsPageProps> = ({
  disabled,
  errors,
  plugin,
  saveButtonBarState,
  onClear,
  onEdit,
  onSubmit,
  selectedConfig,
  setSelectedChannelId,
}) => {
  const intl = useIntl();
  const navigate = useNavigator();
  const initialFormData: PluginDetailsPageFormData = {
    active: selectedConfig?.active,
    configuration: selectedConfig?.configuration
      ?.filter(field => !isSecretField(selectedConfig?.configuration || [], field.name))
      .map(field => ({
        ...field,
        value: field.value || "",
      })),
  };
  const selectedChannelId = selectedConfig?.channel?.id;

  return (
    <Form
      confirmLeave
      initial={initialFormData}
      onSubmit={onSubmit}
      key={selectedChannelId}
      disabled={disabled}
    >
      {({ data, submit, set, isSaveDisabled }) => {
        const onChange = (event: ChangeEvent) => {
          const { name, value } = event.target;
          const newData = {
            active: name === "active" ? value : data.active,
            configuration: data.configuration.map(configItem =>
              configItem.name === name
                ? {
                    ...configItem,
                    value,
                  }
                : configItem,
            ),
          };

          set(newData);
        };

        return (
          <DetailPageLayout gridTemplateColumns={1}>
            <TopNav
              href={pluginListUrl()}
              title={intl.formatMessage(
                {
                  id: "EtGDeK",
                  defaultMessage: "{pluginName} Details",
                  description: "header",
                },
                {
                  pluginName: getStringOrPlaceholder(plugin?.name),
                },
              )}
            />
            <DetailPageLayout.Content>
              <Grid variant="inverted">
                <div>
                  <PluginDetailsChannelsCard
                    plugin={plugin}
                    selectedChannelId={selectedChannelId}
                    setSelectedChannelId={setSelectedChannelId}
                  />
                </div>
                <div>
                  <PluginInfo
                    data={data}
                    description={plugin?.description || ""}
                    errors={errors}
                    name={plugin?.name || ""}
                    onChange={onChange}
                  />
                  <CardSpacer />
                  {data.configuration && (
                    <div>
                      <PluginSettings
                        data={data}
                        fields={selectedConfig?.configuration || []}
                        errors={errors}
                        disabled={disabled}
                        onChange={onChange}
                      />
                      {selectedConfig?.configuration.some(field =>
                        isSecretField(selectedConfig?.configuration, field.name),
                      ) && (
                        <>
                          <CardSpacer />
                          <PluginAuthorization
                            fields={selectedConfig.configuration}
                            onClear={onClear}
                            onEdit={onEdit}
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>
              </Grid>
              <Savebar>
                <Savebar.Spacer />
                <Savebar.CancelButton onClick={() => navigate(pluginListUrl())} />
                <Savebar.ConfirmButton
                  transitionState={saveButtonBarState}
                  onClick={submit}
                  disabled={isSaveDisabled}
                />
              </Savebar>
            </DetailPageLayout.Content>
          </DetailPageLayout>
        );
      }}
    </Form>
  );
};

export default PluginsDetailsPage;
