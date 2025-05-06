import React from "react";
import { FormattedMessage } from "react-intl";
import { Text } from "@saleor/macaw-ui-next";

import { getUserName } from "@dashboard/business/misc";
import useBoundStore from "@dashboard/stores";

export const WelcomePageTitle = () => {
  const user = useBoundStore(state => state.user);
  const userName = getUserName(user, true);

  return (
    <Text as="h1" size={9} data-test-id="home-header">
      <FormattedMessage
        defaultMessage="Hello {userName}, welcome to your Store Dashboard"
        id="0+zatS"
        values={{
          userName,
        }}
      />
    </Text>
  );
};
