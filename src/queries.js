import {gql} from '@apollo/client';

export const GET_KANBAN_DATA = gql`
  query getKanbanData {
    kanbanTasksList{
        title, 
        description, 
        category, 
        id
    } 
    kanbanCategoriesList{
        id
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateKanbanCategory($id: ID!) {
    createKanbanCategory(id: $id) {
      kanbanCategory{id}
      ok
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteKanbanCategory($id: ID!) {
    deleteKanbanCategory(id: $id) {
      kanbanCategory{id}
      ok
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateKanbanTask($category: String!, $title: String!, $description: String) {
    createKanbanTask(category: $category, title: $title, description: $description) {
      kanbanTask{category, title, description}
      ok
    }
  }
`
;

export const DELETE_TASK = gql`
  mutation DeleteKanbanTask($id: ID!, $category: String!) {
    deleteKanbanTask(id: $id, category: $category) {
      kanbanTask{category, title, description}
      ok
    }
  }
`;