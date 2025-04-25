import { gql } from "@apollo/client";

export const checkExportFileStatus = gql`
  query CheckExportFileStatus($id: ID!) {
    exportFile(id: $id) {
      id
      status
    }
  }
`;
