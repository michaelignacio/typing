import $ from 'jquery';
import './index.html';
import { onEmit } from './utils/utils';
import TextPage from './pages/TextPage';
import MainPage from './pages/MainPage';
import FinishPage from './pages/FinishPage';

$(document).ready(init);
onEmit('route', onRoute);
onEmit('finishText', onFinishText);

function init () {
  const { state } = window.history;
  const PageClass = Page(window.location.pathname);
  const page = new PageClass(state);
  page.init();
}

function Page (pathname) {
  if (pathname.match('/texts/')) {
    return TextPage;
  }

  if (pathname.match('/finish/')) {
    return FinishPage;
  }



  return MainPage;
}

function onRoute (path, state) {
  window.history.pushState(state, '', path);
  init();
}

function onFinishText (id, title, wpm, seconds, accuracy) {
  onRoute(`/finish/${id}`, { id, title, wpm, seconds, accuracy });
}

