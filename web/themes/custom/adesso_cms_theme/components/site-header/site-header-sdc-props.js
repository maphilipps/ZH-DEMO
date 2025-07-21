/**
 * @file
 * Site Header SDC Props derived from component.yml
 * This file bridges the gap between SDC schema and Storybook stories
 */

// SDC Schema Props (from site-header.component.yml)
export const siteHeaderSDCProps = {
  site_name: "Adesso CMS",
  site_logo: "/themes/custom/adesso_cms_theme/logo.svg",
  show_logo: true,
  show_site_name: true,
  menu_items: [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Services",
      url: "/services",
      below: [
        {
          title: "Web Development",
          url: "/services/web-development",
          description: "Custom web applications and responsive websites",
        },
        {
          title: "Mobile Apps",
          url: "/services/mobile-apps",
          description: "iOS and Android mobile applications",
        },
        {
          title: "Cloud Solutions",
          url: "/services/cloud",
          description: "Cloud infrastructure and deployment",
        },
      ],
    },
    {
      title: "About",
      url: "/about",
    },
    {
      title: "Contact",
      url: "/contact",
    },
  ],
  show_login_button: true,
  show_register_button: true,
  login_url: "/user/login",
  register_url: "/user/register",
  enable_mega_menu: false,
  background_color: "white",
  show_search: true,
  search_placeholder: "Search...",
  search_action_url: "/search",
  current_path: "/",
};

// SDC Component Schema metadata (for validation)
export const siteHeaderSchema = {
  name: "Site Header",
  description: "Main site header with Flowbite navbar, logo integration and responsive menu",
  props: {
    type: "object",
    properties: {
      site_name: {
        type: "string",
        title: "Site Name",
        description: "Site name to display"
      },
      site_logo: {
        type: "string",
        title: "Site Logo",
        description: "Path to site logo image"
      },
      show_logo: {
        type: "boolean",
        title: "Show Logo",
        description: "Whether to display the site logo",
        default: true
      },
      show_site_name: {
        type: "boolean",
        title: "Show Site Name",
        description: "Whether to display the site name next to logo",
        default: true
      },
      menu_items: {
        type: "array",
        title: "Menu Items",
        description: "Array of main navigation menu items",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            url: { type: "string" },
            below: { type: "array" }
          }
        }
      },
      show_login_button: {
        type: "boolean",
        title: "Show Login Button",
        description: "Whether to show the login button",
        default: false
      },
      show_register_button: {
        type: "boolean",
        title: "Show Register Button",
        description: "Whether to show the register button",
        default: false
      },
      login_url: {
        type: "string",
        title: "Login URL",
        description: "URL for the login button",
        default: "/user/login"
      },
      register_url: {
        type: "string",
        title: "Register URL",
        description: "URL for the register button",
        default: "/user/register"
      },
      enable_mega_menu: {
        type: "boolean",
        title: "Enable Mega Menu",
        description: "Enable Flowbite mega menu functionality",
        default: false
      },
      background_color: {
        type: "string",
        title: "Background Color",
        description: "Background color for the header",
        enum: ["white", "gray", "primary"],
        default: "white"
      },
      show_search: {
        type: "boolean",
        title: "Show Search",
        description: "Whether to show the search dropdown in header",
        default: true
      },
      search_placeholder: {
        type: "string",
        title: "Search Placeholder",
        description: "Placeholder text for search input",
        default: "Search..."
      },
      search_action_url: {
        type: "string",
        title: "Search Action URL",
        description: "URL for search form submission",
        default: "/search"
      },
      current_path: {
        type: "string",
        title: "Current Path",
        description: "Current page path for active menu highlighting",
        default: "/"
      }
    }
  }
};

export default siteHeaderSDCProps;