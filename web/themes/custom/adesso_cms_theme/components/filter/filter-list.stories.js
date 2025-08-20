import FilterList from './filter-list.html.twig';

export default {
  title: 'EAB/Components/Filter/Filter List',
  tags: ['autodocs'],
  args: {
    filter: {
      default: 'Nach Relevanz',
      options: [
        {
          label: 'Nach Relevanz',
          value: 'relevance',
          selected: false,
        },
        {
          label: 'Neueste',
          value: 'newest',
          selected: true,
        },
        {
          label: 'Älteste',
          value: 'oldest',
          selected: false,
        },
      ],
    },
  },
  argTypes: {},
};

export const Default = ({ filter }) => FilterList({ filter });
