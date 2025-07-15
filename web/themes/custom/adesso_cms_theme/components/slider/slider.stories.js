/**
 * @file
 * Slider component stories.
 */

import sliderTemplate from './slider.twig';
import sliderItemTemplate from './slider-item.twig';
import './slider.behavior.js';

export default {
  title: 'Components/Slider',
  component: 'slider',
  argTypes: {
    items: {
      description: 'Array of slider items',
      control: 'object',
    },
  },
};

// Helper function to create slider item HTML
const createSliderItem = (media, title, summary) => {
  return sliderItemTemplate({
    media: media,
    title: title,
    summary: summary,
  });
};

export const Default = {
  render: (args) => sliderTemplate(args),
  args: {
    items: [
      createSliderItem(
        '<img src="https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Slide+1" alt="Slide 1" class="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">',
        'First Slide Title',
        'This is the description for the first slide.'
      ),
      createSliderItem(
        '<img src="https://via.placeholder.com/800x400/10B981/FFFFFF?text=Slide+2" alt="Slide 2" class="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">',
        'Second Slide Title',
        'This is the description for the second slide.'
      ),
      createSliderItem(
        '<img src="https://via.placeholder.com/800x400/EF4444/FFFFFF?text=Slide+3" alt="Slide 3" class="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">',
        'Third Slide Title',
        'This is the description for the third slide.'
      ),
    ],
  },
};

export const SingleSlide = {
  render: (args) => sliderTemplate(args),
  args: {
    items: [
      createSliderItem(
        '<img src="https://via.placeholder.com/800x400/6366F1/FFFFFF?text=Single+Slide" alt="Single Slide" class="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">',
        'Single Slide',
        'When there is only one slide, no controls are shown.'
      ),
    ],
  },
};

export const WithoutText = {
  render: (args) => sliderTemplate(args),
  args: {
    items: [
      createSliderItem(
        '<img src="https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=Image+Only+1" alt="Image 1" class="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">',
      ),
      createSliderItem(
        '<img src="https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=Image+Only+2" alt="Image 2" class="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">',
      ),
      createSliderItem(
        '<img src="https://via.placeholder.com/800x400/EC4899/FFFFFF?text=Image+Only+3" alt="Image 3" class="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">',
      ),
    ],
  },
};

export const ManySlides = {
  render: (args) => sliderTemplate(args),
  args: {
    items: [
      createSliderItem(
        '<img src="https://via.placeholder.com/800x400/DC2626/FFFFFF?text=Slide+1" alt="Slide 1" class="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">',
        'Slide 1',
        'First slide in the sequence.'
      ),
      createSliderItem(
        '<img src="https://via.placeholder.com/800x400/EA580C/FFFFFF?text=Slide+2" alt="Slide 2" class="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">',
        'Slide 2',
        'Second slide in the sequence.'
      ),
      createSliderItem(
        '<img src="https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=Slide+3" alt="Slide 3" class="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">',
        'Slide 3',
        'Third slide in the sequence.'
      ),
      createSliderItem(
        '<img src="https://via.placeholder.com/800x400/059669/FFFFFF?text=Slide+4" alt="Slide 4" class="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">',
        'Slide 4',
        'Fourth slide in the sequence.'
      ),
      createSliderItem(
        '<img src="https://via.placeholder.com/800x400/0891B2/FFFFFF?text=Slide+5" alt="Slide 5" class="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">',
        'Slide 5',
        'Fifth slide in the sequence.'
      ),
    ],
  },
};