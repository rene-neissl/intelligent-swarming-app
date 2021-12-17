# Notes & Thoughts

This document captures a few thoughts during the development and design process.

## UI kit limitation

- UI kit provides predefined components, but it is not possible to customize them. This is especially painful in terms of usability for the ``Range``-component (no ``min``, ``max`` or ``current`` value are displayed).
- ``ModalDialog``-Header can not contain any child elements. Therefore it is not possible to use the already existing UI kit component ``User`` to display the currently selected User.
- There is no ``List``-element, so a ``Table`` has to be used to display available skills.

## Store data in Forge apps

- *Properties*-API seems to be for product-dependent data, which does not seem to be suitable for temporary storing skills
- *Storage*-API is a permanent storage for data, however there are quotas and limits: https://developer.atlassian.com/platform/forge/platform-quotas-and-limits/#storage-quotas