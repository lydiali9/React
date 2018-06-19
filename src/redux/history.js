import qs from 'qs';
import createHistory from 'history/createHashHistory';

function addQuery(history) {
  const location = history.location;
  history.location = { ...location, query: qs.parse(location.search, { ignoreQueryPrefix: true }) };
}

const history = createHistory();

addQuery(history);

export const unlisten = history.listen(() => {
  // 每次页面跳转都会执行
  addQuery(history);
});

export default history