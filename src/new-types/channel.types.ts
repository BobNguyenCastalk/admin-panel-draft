export interface ChannelI {
  channels: string[];
  selectedChannel: string | undefined;
  isPickerActive: boolean;
  setChannels: (channels: string[]) => void;
  setSelectedChannel: (selected: string) => void;
  setPickerActive: (isActive: boolean) => void;
}

export type AuthSliceI = ChannelI;
