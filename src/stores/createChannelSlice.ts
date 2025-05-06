import { IChannelSlice } from "@dashboard/types/channel.types";

// initiate selected channel state from local storage
//   const [selectedChannel, setSelectedChannel] = useLocalStorage("channel", "");

export const createChannelSlice = (set): IChannelSlice => ({
  channels: [],
  selectedChannel: undefined,
  isPickerActive: false,
  setChannels: (channels: string[]) => set({ channels }),
  setSelectedChannel: (channel: string) => set({ selectedChannel: channel }),
  setPickerActive: (isActive: boolean) => set({ isPickerActive: isActive }),
});
