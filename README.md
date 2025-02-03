<p align="center">
  <a href="https://adesso-cms-6a5b25.pages.adesso-projects.com/?path=/docs/introduction--docs">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/263385/199832481-bbbf5961-6a26-481d-8224-51258cce9b33.png">
      <img src="https://user-images.githubusercontent.com/321738/63501763-88dbf600-c4cc-11e9-96cd-94adadc2fd72.png" alt="Storybook" width="400" />
    </picture>
  </a>
</p>

# adesso CMS

adesso CMS is a fast-moving open source product that enables site builders to easily create new Drupal sites and extend them with smart defaults, all using their browser.

## Getting started

If you want to run Drupal CMS locally use [DDEV](https://ddev.com), and follow these instructions:

1. Install DDEV following the documentation at <https://ddev.com/get-started/>
2. Open the command line and `cd` to the root directory of this project
3. Run the command `./launch-adesso-cms.sh`
4. Run the command `ddev watch` to start the vite development server

DDEV plugins are used to provide additional functionality:

* https://github.com/ddev/ddev-drupal-contrib
* https://github.com/ddev/ddev-selenium-standalone-chrome



### Build theme

The theme is built with [Vite](https://vite.dev/). To build the theme, run the following command:

```bash
ddev theme build
```

### Run Storybook

```bash
ddev theme storybook
```

Open: https://adesso-cms.ddev.site:6006/

### Recreate

If you want to reset the project, you can use the following command:

```bash
ddev drush sql:create -y
```

### Export content

We used the [Default Content](https://git.drupalcode.org/project/default_content) module to export the content. You can export the content with the following command:

```bash
ddev export-contents
```

It will update the `recipes/adesso_cms_starter/content` directory with the exported content.

### Use recipes

We used [recipes](https://git.drupalcode.org/project/distributions_recipes/-/blob/1.0.x/docs/recipe.md) to import the content and config.

Read the [docu](https://git.drupalcode.org/project/distributions_recipes/-/blob/1.0.x/docs/config_actions.md) for information and use cases.

Look at the [Roadmap](https://git.drupalcode.org/project/distributions_recipes/-/blob/1.0.x/docs/recipe_roadmap.md) for the next steps.

### Installation options

The Drupal CMS installer offers a list of features preconfigured with smart defaults. You will be able to customize whatever you choose, and add additional features, once you are logged in.

After the installer is complete, you will land on the dashboard. Copy or jot down your password for the admin user, which you will need to log in again or change your password.

## Documentation

Coming soon ... [We're working on Drupal CMS specific documentation](https://www.drupal.org/project/drupal_cms/issues/3454527).

In the meantime, learn more about managing a Drupal based application in the [Drupal User Guide](https://www.drupal.org/docs/user_guide/en/index.html).
