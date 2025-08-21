import statusBadgeTemplate from './status-badge.twig';

export default {
  title: 'Components/Status Badge',
  component: statusBadgeTemplate,
  argTypes: {
    status: {
      control: 'select',
      options: ['draft', 'published', 'rejected'],
      description: 'The status value',
    },
    label: {
      control: 'text',
      description: 'Custom label override',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    show_icon: {
      control: 'boolean',
      description: 'Show status icon',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Status badge component for Event Review Dashboard with Swiss-compliant colors and accessibility features.',
      },
    },
  },
};

export const Draft = {
  args: {
    status: 'draft',
    size: 'md',
    show_icon: true,
  },
};

export const Published = {
  args: {
    status: 'published', 
    size: 'md',
    show_icon: true,
  },
};

export const Rejected = {
  args: {
    status: 'rejected',
    size: 'md', 
    show_icon: true,
  },
};

export const SmallSize = {
  args: {
    status: 'draft',
    size: 'sm',
    show_icon: true,
  },
};

export const LargeSize = {
  args: {
    status: 'published',
    size: 'lg',
    show_icon: true,
  },
};

export const WithoutIcon = {
  args: {
    status: 'rejected',
    size: 'md',
    show_icon: false,
  },
};

export const CustomLabel = {
  args: {
    status: 'draft',
    label: 'Wartet auf Prüfung',
    size: 'md',
    show_icon: true,
  },
};

export const AllStatuses = {
  render: () => `
    <div class="space-y-4 p-4 bg-gray-50">
      <h3 class="text-lg font-semibold text-gray-900">Event Status Badges</h3>
      
      <div class="space-y-2">
        <h4 class="text-sm font-medium text-gray-700">Standard Sizes</h4>
        <div class="flex items-center space-x-4">
          ${statusBadgeTemplate({ status: 'draft', size: 'sm', show_icon: true })}
          ${statusBadgeTemplate({ status: 'published', size: 'md', show_icon: true })}
          ${statusBadgeTemplate({ status: 'rejected', size: 'lg', show_icon: true })}
        </div>
      </div>
      
      <div class="space-y-2">
        <h4 class="text-sm font-medium text-gray-700">Without Icons</h4>
        <div class="flex items-center space-x-4">
          ${statusBadgeTemplate({ status: 'draft', size: 'md', show_icon: false })}
          ${statusBadgeTemplate({ status: 'published', size: 'md', show_icon: false })}
          ${statusBadgeTemplate({ status: 'rejected', size: 'md', show_icon: false })}
        </div>
      </div>
      
      <div class="space-y-2">
        <h4 class="text-sm font-medium text-gray-700">In Table Context</h4>
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="px-4 py-2 text-sm text-gray-900">Sommerfest 2025</td>
                <td class="px-4 py-2">${statusBadgeTemplate({ status: 'draft', size: 'sm', show_icon: true })}</td>
              </tr>
              <tr>
                <td class="px-4 py-2 text-sm text-gray-900">Weihnachtsmarkt</td>
                <td class="px-4 py-2">${statusBadgeTemplate({ status: 'published', size: 'sm', show_icon: true })}</td>
              </tr>
              <tr>
                <td class="px-4 py-2 text-sm text-gray-900">Strassenfest</td>
                <td class="px-4 py-2">${statusBadgeTemplate({ status: 'rejected', size: 'sm', show_icon: true })}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
};