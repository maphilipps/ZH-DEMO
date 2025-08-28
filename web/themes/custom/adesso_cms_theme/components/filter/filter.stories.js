import Filter from './filter.html.twig';

export default {
  title: 'EAB/Components/Filter',
  tags: ['autodocs'],
  args: {
    prefix: 'Sortieren',
    label: 'Neueste zuerst',
    iconPath: 'icons.svg',
    filter: [],
  },
  argTypes: {},
  decorators: [
    story =>
      `<div class="fluid-container"><div class="outer-grid"><div class="col-span-full">${story()}</div></div></div>`,
  ],
};

export const Default = ({ prefix, label, iconPath, filter }) =>
  Filter({ prefix, label, iconPath, filter });
