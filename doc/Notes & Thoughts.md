# Notes & Thoughts

This document captures a few thoughts during the development and design process.

## UI kit limitation

- UI kit provides predefined components, but it is not possible to customize them. This is especially painful in terms of usability for the ``Range``-component (no ``min``, ``max`` or ``current`` value are displayed).
- ``ModalDialog``-Header can not contain any child elements. Therefore it is not possible to use the already existing UI kit component ``User`` to display the currently selected User.
- There is no ``List``-element, so a ``Table`` has to be used to display available skills.

## Store data in Forge apps

- *Properties*-API seems to be for product-dependent data, which does not seem to be suitable for temporary storing skills

- *Storage*-API is a permanent storage for data, however there are quotas and limits: https://developer.atlassian.com/platform/forge/platform-quotas-and-limits/#storage-quotas

- For now, the *Storage*-API has been chosen to store skills and users with their skill level. The *Storage*-API does only allow to store data in JSON format (not structured). The following format has been chosen:

  ```json
  {
      "skills": [
          {
              "name": "Docker",
              "level": 0
          },
          {
              "name": "Networking",
              "level": 0
          },
          ...
      ],
      "61448bf5e7c3280070ada128": [
          {
              "name": "Docker",
              "level": 1
          },
          {
              "name": "Networking",
              "level": 2
          },
          ...
  	],
  	...
  }
  ```

where `skills` and `61448bf5e7c3280070ada128` are the ``keys`` for accessing the data. This provides an easy way of reading and writing skills that are specific to a user.

- Ideally I would have chosen a different format, like:

  ```json
  {
      "skills": [
          {
              "name": "Docker",
              "level": 0
          },
          {
              "name": "Networking",
              "level": 0
          },
          ...
      ],
      "users": [
          "61448bf5e7c3280070ada128": [
              {
                  "name": "Docker",
                  "level": 1
              },
              {
                  "name": "Networking",
                  "level": 2
              },
              ...
          ],
  	...
  	]
  }
  ```

- However the *Storage*-API only support querying for ``key`` properties. When introducing a `key` name `users` instead of the actual *UserId*, user-specific data can not be read independently. Instead, all skills for all users have to be loaded from the *Storage*-API, and filtering for the current user has to be done in the application, rather than using a *Storage*-API-Query.

## During development

- It is very noticeable that some features of Forge are still in Beta (like UI kit and UI hooks). This affects development as still minor issues appear, which have to be looked at (like major delays in webhook event when a new issue has been created).
- How to build an app with multiple UI kit components: https://community.developer.atlassian.com/t/how-to-build-several-custom-ui-components-with-one-react-app-in-static-folder/44569/7