import DrupalAttribute from 'drupal-attribute';
import Region from './region.html.twig';
import * as Block from '../block/block.stories';

export default {
  title: 'EAB/Components/Region',
  args: {
    content: [
      Block.Default({
        ...Block.default.args,
      }),
      Block.Default({
        ...Block.default.args,
      }),
    ].join(''),
    attributes: new DrupalAttribute(),
  },
};

export const Default = ({ content, attributes }) =>
  Region({
    content,
    attributes,
  });
