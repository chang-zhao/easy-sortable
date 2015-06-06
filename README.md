# easy-sortable
Simple sortable plugin.

# What & Why
* The simplest possible sortable plugin for modern browsers.
* Fast and responsive. No lags, no stuttering.
* Allows dragging between several lists. (Only vertical dragging).

It uses jQuery for DOM manipulations & bindings, and CSS3 transitions for animations.

In a further development, I think to:

^ convert from jQuery to pure JS as much as possible.

# Usage
* All the draggable elements should be placed vertically in the same parent container. The elements can be DIV, P, LI, SPAN etc, no matter. To be draggable, they only should have class="drag".
* The parent container can be BODY, DIV, OL, UL etc. To split it into several lists, add to that container any elements without class "drag". Thus they will be non-draggable and could serve as separators.
* You can serialize the results of the sorting with a simple script like var list = $('.drag').parent().children
* See examples (HTML files of this repository).

# Versions
Version 0.2 - author Chang Zhao.

Version 0.1 - author Michael Rafaylik.

Please use this freely for the benefit of all beings.

Awakened Mind (Inheritance — Share-Alike) License v. 1.0
http://earth.zen-do.ru/laws/license
