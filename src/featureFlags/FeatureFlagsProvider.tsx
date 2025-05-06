import React, { ReactNode, useEffect, useState } from "react";

import LoginLoading from "@dashboard/presentation/pages/auth/components/LoginLoading/LoginLoading";
import useBoundStore from "@dashboard/stores";

import { FlagList } from "./availableFlags";
import { Provider } from "./context";
import { FlagsResolver } from "./FlagsResolver";
import { AvailableStrategies, EnvVarsStrategy, LocalStorageStrategy } from "./strategies";
import { MetadataStrategy } from "./strategies/MetadataStrategy";

interface FeatureFlagsProviderProps {
  children: ReactNode;
  strategies: AvailableStrategies[];
  deps?: unknown[];
}

export const FeatureFlagsProvider = ({ children, strategies }: FeatureFlagsProviderProps) => {
  const [flags, setFlags] = useState<FlagList | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const disableLoading = () => setLoading(false);

  useEffect(() => {
    const resolver = new FlagsResolver(strategies);

    resolver.fetchAll().combineWithPriorities().then(setFlags).finally(disableLoading);
  }, [strategies]);

  return <Provider value={flags}>{loading ? <LoginLoading /> : children}</Provider>;
};

interface FeatureFlagsProviderWithUserProps {
  children: ReactNode;
}

export const FeatureFlagsProviderWithUser = ({ children }: FeatureFlagsProviderWithUserProps) => {
  const user = useBoundStore(state => state.user);

  return (
    <FeatureFlagsProvider
      strategies={[
        new LocalStorageStrategy(),
        new EnvVarsStrategy(),
        new MetadataStrategy(user?.metadata || []),
      ]}
    >
      {children}
    </FeatureFlagsProvider>
  );
};
