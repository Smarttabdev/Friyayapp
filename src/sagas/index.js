import { all, call } from 'redux-saga/effects';
import filtersSaga from './filters';

export default function*() {
  yield all([call(filtersSaga)]);
}
