import { createSelector } from 'reselect';

const getSelectedCategoryId = state => state.categories.selectedId;
const getSnippets = state => state.snippets.all;

export const getSelectedSnippets = createSelector(
  [getSelectedCategoryId, getSnippets],
  (selectedCategoryId, snippets) => {
    return Object.values(snippets).filter(s => s.category === selectedCategoryId);
  },
);
