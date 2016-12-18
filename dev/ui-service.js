const JSONEditor = require('jsoneditor');

let mainMenu = require('html!./templates/main-menu.html');
let css = require('style-loader!css-loader!./index.css');
let jsoneditorCSS = require('style-loader!css-loader!../node_modules/jsoneditor/dist/jsoneditor.css');

const uiService = {
  init: init,
  toggleMenu: toggleMenu
};

const JSONEditorConfig = {
  mode: 'code',
  search: false
};

let $body, $menu, $appContainer, $jsonEditor;
let jsonEditor;

function init() {
  //Append the menu to the current page body.
  $body = document.querySelector("body");
  menuContainer = document.createElement('div');
  menuContainer.className = 'jsonblobMenuContainer';
  $body.appendChild(menuContainer);
  $appContainer = document.querySelector('.jsonblobMenuContainer')
  $appContainer.innerHTML = mainMenu;
  $appContainer.style.display = 'none';
  //Initialize the JSON editor.
  $jsonEditor = document.querySelector('#jsonblobMenu__jsonEditor');
  jsonEditor = new JSONEditor($jsonEditor, JSONEditorConfig);
  //Display the saved blobs.
}

function toggleMenu() {
  $menu = document.querySelector('.jsonblobMenuContainer');
  if(!$menu) {
    init();
    $menu = document.querySelector('.jsonblobMenuContainer');
  }  
  if($menu.style.display === 'none') {
    $menu.style.display = 'block';
  } else {
    $menu.style.display = 'none';
  }
}

module.exports = uiService;
