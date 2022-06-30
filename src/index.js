import toggleMenuVisibility from './header.js';
import hideTooltipOnClick from './tooltip.js';
import {
  toggleProjectsVisibility,
  addSelectedClassOnClick,
} from './sidebar.js';
import { Editor } from './editor.js';

toggleMenuVisibility();
hideTooltipOnClick();
toggleProjectsVisibility();
addSelectedClassOnClick();
Editor.changeEditorContent();
