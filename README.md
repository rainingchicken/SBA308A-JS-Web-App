# SBA

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
  - if user typed wrong, the word in the prompt will change color
- Modify at least one attribute of an element in response to user interaction.
  -when user clicks start button, user can now begin typing in the textarea which would otherwise be disabled `textarea.disabled = true;`
- Register at least two different event listeners and create the associated event handler functions.
  - `btn.addEventListener("click", handleTimer);`
- Use at least two Browser Object Model (BOM) properties or methods.
  - `window.scrollTo({ top: 0, behavior: "smooth" });`
  - `window.alert()`
- Include at least one form and/or input with HTML attribute validation.
- Include at least one form and/or input with DOM event-based validation. (This can be the same form or input as the one above, but should include event-based validation in addition to the HTML attribute validation.)
- Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).
  - there are no errors
