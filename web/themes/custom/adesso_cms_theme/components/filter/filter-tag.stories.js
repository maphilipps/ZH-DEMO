import Filter from './filter-tag.html.twig';
import RemoveFilter from './filter-tag-remove.html.twig';
import filterStageData from '../../module/stage/filter-stage-data.json';

export default {
  title: 'EAB/Components/Filter/Filter Tag',
  tags: ['autodocs'],
  args: {
    prefix: '',
    label: 'Thema 1',
    tagFilter: filterStageData.filters,
  },
  argTypes: {},
};

export const Default = ({ prefix, label, tagFilter, removeFilter }) =>
  Filter({ prefix, label, tagFilter, removeFilter });

export const Remove = ({ prefix, label, tagFilter, removeFilter }) =>
  RemoveFilter({ prefix, label, tagFilter, removeFilter });
