import { renderTwig } from '../../.storybook/twig';

const Template = (args) => renderTwig('search-result-card/search-result-card.twig', args);

export default {
  title: 'Components/Search Result Card',
  component: 'search-result-card',
  parameters: {
    docs: {
      description: {
        component: 'Reusable search result card component for Gemeinde Bruchtal municipal portal with WCAG 2.1 AA accessibility compliance and Schema.org structured data.'
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the search result'
    },
    url: {
      control: 'text',
      description: 'The URL to the full content'
    },
    excerpt: {
      control: 'text',
      description: 'Highlighted search excerpt from the content'
    },
    content_type: {
      control: 'select',
      options: ['club', 'business', 'restaurant', 'page', 'event', 'news'],
      description: 'The type of content'
    },
    relevance_score: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: 'AI-generated relevance score between 0 and 1'
    },
    municipal_verified: {
      control: 'boolean',
      description: 'Whether this content is officially verified by Gemeinde Bruchtal'
    }
  }
};

// High Relevance Club Result
export const HighRelevanceClub = Template.bind({});
HighRelevanceClub.args = {
  title: 'FC Bruchtal - Fussballverein am Zürichsee',
  url: '/club/fc-bruchtal',
  excerpt: 'Der <strong>FC Bruchtal</strong> ist einer der traditionsreichsten <strong>Vereine</strong> der Gemeinde. Seit 1954 fördern wir den lokalen Fussballsport.',
  content_type: 'club',
  relevance_score: 0.94,
  categories: [
    { id: '12', title: 'Vereine & Sport', url: '/kategorie/vereine-sport' }
  ],
  target_groups: [
    { id: '5', title: 'Familien', url: '/zielgruppe/familien' },
    { id: '7', title: 'Jugendliche', url: '/zielgruppe/jugendliche' }
  ],
  municipal_verified: true,
  result_index: 0
};

// Medium Relevance Business Result
export const MediumRelevanceBusiness = Template.bind({});
MediumRelevanceBusiness.args = {
  title: 'Restaurant Seegarten - Kulinarik mit Aussicht',
  url: '/gastgewerbe/restaurant-seegarten',
  excerpt: 'Das <strong>Restaurant Seegarten</strong> bietet regionale Küche mit herrlichem Blick auf den Zürichsee. Täglich frische Gerichte aus lokalen Zutaten.',
  content_type: 'business',
  relevance_score: 0.72,
  categories: [
    { id: '8', title: 'Gastronomie', url: '/kategorie/gastronomie' }
  ],
  target_groups: [
    { id: '5', title: 'Familien', url: '/zielgruppe/familien' },
    { id: '9', title: 'Touristen', url: '/zielgruppe/touristen' }
  ],
  municipal_verified: false,
  result_index: 1
};

// Low Relevance Municipal Page
export const LowRelevanceMunicipal = Template.bind({});
LowRelevanceMunicipal.args = {
  title: 'Gemeindeverwaltung Bruchtal - Öffnungszeiten',
  url: '/verwaltung/oeffnungszeiten',
  excerpt: 'Die <strong>Gemeindeverwaltung Bruchtal</strong> ist Montag bis Freitag von 8:00 bis 17:00 Uhr für Sie da. Termine nach Vereinbarung möglich.',
  content_type: 'page',
  relevance_score: 0.45,
  categories: [
    { id: '1', title: 'Verwaltung', url: '/kategorie/verwaltung' }
  ],
  target_groups: [
    { id: '10', title: 'Alle Einwohner', url: '/zielgruppe/alle-einwohner' }
  ],
  municipal_verified: true,
  result_index: 2
};

// Event with Multiple Target Groups
export const EventResult = Template.bind({});
EventResult.args = {
  title: 'Bruchtal Seefest 2024 - Leben am See erleben',
  url: '/events/seefest-2024',
  excerpt: 'Das traditionelle <strong>Seefest</strong> findet am 15. August 2024 statt. Ein Tag voller Musik, lokaler Küche und Aktivitäten für die ganze Familie am schönen Zürichsee.',
  content_type: 'event',
  relevance_score: 0.87,
  categories: [
    { id: '15', title: 'Veranstaltungen', url: '/kategorie/veranstaltungen' },
    { id: '16', title: 'Kultur & Freizeit', url: '/kategorie/kultur-freizeit' }
  ],
  target_groups: [
    { id: '5', title: 'Familien', url: '/zielgruppe/familien' },
    { id: '8', title: 'Senioren', url: '/zielgruppe/senioren' },
    { id: '9', title: 'Touristen', url: '/zielgruppe/touristen' }
  ],
  municipal_verified: true,
  result_index: 3
};

// Minimal Result (Testing Edge Cases)
export const MinimalResult = Template.bind({});
MinimalResult.args = {
  title: 'Basic Page Title',
  url: '/basic-page',
  content_type: 'page',
  relevance_score: 0.3,
  municipal_verified: false,
  result_index: 4
};