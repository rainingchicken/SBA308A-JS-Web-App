# SBA 316 DOM Typing Test

https://rainingchicken.github.io/SBA316-DOM-Typing-Test/pages/index.html

## Purpose

SBA 316 Document Object Model project in which we re to create a page to exercise DOM creation and manipulation.

## Description

This project is a typing test app. The prompt text are composed of 10 random quotes from the .json file.

## Objective

- Use DOM properties, methods, and techniques to create a web application that provides a dynamic user experience.
- Use BOM properties, methods, and techniques to facilitate creation of a dynamic web application.
- Demonstrate proficiency with event-driven programming and DOM events.
- Implement basic form validation using any combination of built-in HTML validation attributes and DOM-event-driven JavaScript validation.

## Requirement

- Cache at least one element using selectElementById.
  - `const app = document.getElementById("app");`
- Cache at least one element using querySelector or querySelectorAll.
  - `const testClass = document.querySelectorAll(".test");`
- Use the parent-child-sibling relationship to navigate between elements at least once (firstChild, lastChild, parentNode, nextElementSibling, etc.).
  - `const all = app.childrens;`
- Iterate over a collection of elements to accomplish some task.
  - `for (const i of testClass) {Object.assign(i.style, {...});}`
- Create at least one element using createElement.
  - `const h1 = document.createElement("h1");`
- Use appendChild and/or prepend to add new elements to the DOM.
  - `timerdiv.appendChild(minutesdiv);`
- Modify the HTML or text content of at least one element in response to user interaction using innerHTML, innerText, or textContent.
  - when user click starts `writingPrompt.textContent` changes into 10 random quotes
- Modify the style and/or CSS classes of an element in response to user interactions using the style or classList properties.
  - after the user clicks on START button and wait till the timer countdowns to the last 5 seconds, the timer turns into another color
- Modify at least one attribute of an element in response to user interaction.
  - when user clicks start button, user can now begin typing in the textarea which would otherwise be disabled `textarea.disabled = true;`
- Register at least two different event listeners and create the associated event handler functions.
  - `btn.addEventListener("click", handleTimer);`
  - `aSignup.addEventListener("click", function() {...});`
- Use at least two Browser Object Model (BOM) properties or methods.
  - `window.scrollTo({ top: 0, behavior: "smooth" });`
  - `window.alert("Sign ups are unavailable at this time.");`
- Include at least one form and/or input with HTML attribute validation.
  - the entire login.html
- Include at least one form and/or input with DOM event-based validation. (This can be the same form or input as the one above, but should include event-based validation in addition to the HTML attribute validation.)
  - the entire login page
- Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).
  - there are no errors

## Credits

- https://gist.github.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80
- Bootstrap
- [google font](https://fonts.google.com/specimen/Chakra+Petch?query=Chakra+Petch)
- [google sound library](https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg)
- https://images.pexels.com/photos/20818860/pexels-photo-20818860/free-photo-of-white-wrinkled-paper-sheet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
