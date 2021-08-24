import { updateStore } from './relay';
import { createEdge, toGid, toId } from './utilities';

export function addTip({ tip, componentName, connectionVars }) {
  updateStore(store => {
    const id = toGid('Tip', Number(toId(tip.id)) + 1); // +1 because getting error saying record already exists.
    let record;
    try {
      record = store.create(id, 'Tip');
    } catch (err) {
      return;
    }

    Object.keys(tip).forEach(propName => {
      record.setValue(propName == 'id' ? id : tip[propName], propName);
    });

    createEdge({
      store,
      record,
      connectionField: `__${componentName}_tips_connection`,
      connectionVars,
      edgeType: 'TipEdge',
      prepend: true
    });
  });
}
