// @ts-strict-ignore
import { LanguageCodeEnum, SaleTranslationFragment } from "@dashboard/graphql";
import { commonMessages } from "@dashboard/intl";
import { getStringOrPlaceholder } from "@dashboard/misc";
import { TranslationsEntitiesPageProps } from "@dashboard/translations/types";
import {
  languageEntitiesUrl,
  languageEntityUrl,
  TranslatableEntities,
} from "@dashboard/translations/urls";
import { TopNav } from "@presentation/shared//AppLayout/TopNav";
import LanguageSwitch from "@presentation/shared//LanguageSwitch";
import { DetailPageLayout } from "@presentation/shared//Layouts";
import React from "react";
import { useIntl } from "react-intl";

import TranslationFields from "../TranslationFields";

export interface TranslationsSalesPageProps extends TranslationsEntitiesPageProps {
  data: SaleTranslationFragment;
}

export const fieldNames = {
  name: "name",
};

const TranslationsSalesPage: React.FC<TranslationsSalesPageProps> = ({
  translationId,
  activeField,
  disabled,
  languageCode,
  languages,
  data,
  saveButtonState,
  onDiscard,
  onEdit,
  onSubmit,
}) => {
  const intl = useIntl();

  return (
    <DetailPageLayout gridTemplateColumns={1}>
      <TopNav
        href={languageEntitiesUrl(languageCode, {
          tab: TranslatableEntities.sales,
        })}
        title={intl.formatMessage(
          {
            id: "zjkAMs",
            defaultMessage: 'Translation Sale "{saleName}" - {languageCode}',
            description: "header",
          },
          {
            languageCode,
            saleName: getStringOrPlaceholder(data?.sale?.name),
          },
        )}
      >
        <LanguageSwitch
          currentLanguage={LanguageCodeEnum[languageCode]}
          languages={languages}
          getLanguageUrl={lang =>
            languageEntityUrl(lang, TranslatableEntities.sales, translationId)
          }
        />
      </TopNav>
      <DetailPageLayout.Content>
        <TranslationFields
          activeField={activeField}
          disabled={disabled}
          initialState={true}
          title={intl.formatMessage(commonMessages.generalInformations)}
          fields={[
            {
              displayName: intl.formatMessage({
                id: "s40PZt",
                defaultMessage: "Sale Name",
              }),
              name: fieldNames.name,
              translation: data?.translation?.name || null,
              type: "short" as const,
              value: data?.sale?.name,
            },
          ]}
          saveButtonState={saveButtonState}
          richTextResetKey={languageCode}
          onEdit={onEdit}
          onDiscard={onDiscard}
          onSubmit={onSubmit}
        />
      </DetailPageLayout.Content>
    </DetailPageLayout>
  );
};

TranslationsSalesPage.displayName = "TranslationsSalesPage";
export default TranslationsSalesPage;
