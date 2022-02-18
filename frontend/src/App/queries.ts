import {
  gql
} from "@apollo/client";

const GET_PROJECTS = gql`
  query {
    projects {
      id,
      title,
      status,
      description
    }
  }
`;

export {
  GET_PROJECTS,
}