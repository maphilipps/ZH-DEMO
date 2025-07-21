import HeadingTemplate from './heading.twig';

export default {
  title: 'General/Heading'
};

export const Heading = HeadingTemplate.bind({});
Heading.args = {
  heading: {
    title: 'Title Lorem Ipsum Dolor',
    as: 'h2',
    visual_level: '2',
    modifier: 'display-3'
  }
};

export const HeadingWithStringTitle = HeadingTemplate.bind({});
HeadingWithStringTitle.args = {
  heading: {
    title: 'Simple String Title',
    as: 'h1',
    visual_level: '1'
  }
};

export const HeadingWithObjectTitle = HeadingTemplate.bind({});
HeadingWithObjectTitle.args = {
  heading: {
    title: { '#markup': '<em>Object</em> Title with HTML' },
    as: 'h3',
    visual_level: '3'
  }
};
