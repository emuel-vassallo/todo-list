import hideTooltipOnClick from './tooltip.js';
import { Sidebar } from './sidebar.js';
import { Editor } from './editor.js';

hideTooltipOnClick();
Sidebar.toggleSidebarVisibility();
Sidebar.toggleProjectsVisibility();
Sidebar.addSelectedClassOnClick();
Editor.changeEditorContent();
