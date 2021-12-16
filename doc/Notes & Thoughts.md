# Notes & Thoughts

This document captures a few thoughts during the development and design process.

## UI kit limitation

- UI kit provides predefined components, but it is not possible to customize them. This is especially painful in terms of usability for the ``Range``-component (no ``min``, ``max`` or ``current`` value are displayed).
- ``ModalDialog``-Header can not contain any child elements. Therefore it is not possible to use the already existing UI kit component ``User`` to display the currently selected User.