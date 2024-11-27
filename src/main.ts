import { mount } from 'svelte';
import "./theme.css";
import "./app.css";
import App from "./App.svelte";
import { watchForDarkMode } from "./utils/watchForDarkMode";

watchForDarkMode();

mount(App, {
  target: document.getElementById('app')!,
});

