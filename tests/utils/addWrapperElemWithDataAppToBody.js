/**
 * Adds a wrapping `div data-app="true"` to the body so that we don't
 * get Vuetify warnings about missing data-app attribute for some components.
 * Must be used at the top of test files that produce the warning about the
 * missing data-app attribute, just invoke the function.
 * @return undefined
 */

export default function addWrapperElemWithDataAppToBody() {
  const el = document.createElement('div');
  el.setAttribute('data-app', true);
  document.body.appendChild(el);
}
