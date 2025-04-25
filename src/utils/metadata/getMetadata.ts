import { MetadataFormData } from "@presentation/shared//Metadata";

function getMetadata(
  data: MetadataFormData,
  isMetadataModified: boolean,
  isPrivateMetadataModified: boolean,
) {
  return {
    metadata: isMetadataModified ? data.metadata : undefined,
    privateMetadata: isPrivateMetadataModified ? data.privateMetadata : undefined,
  };
}

export default getMetadata;
