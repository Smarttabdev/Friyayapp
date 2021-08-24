/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SheetLensActiveColumnOrderQueryVariables = {|
  topicId?: ?string,
  lenseId?: ?string,
  lenseKey?: ?string,
|};
export type SheetLensActiveColumnOrderQueryResponse = {|
  +activeColumnOrder: ?{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |}
|};
export type SheetLensActiveColumnOrderQuery = {|
  variables: SheetLensActiveColumnOrderQueryVariables,
  response: SheetLensActiveColumnOrderQueryResponse,
|};
*/


/*
query SheetLensActiveColumnOrderQuery(
  $topicId: ID
  $lenseId: ID
  $lenseKey: String
) {
  activeColumnOrder: activeCustomOrder(orderType: column_order, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {
    id
    name
    order
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseKey"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v3 = [
  {
    "alias": "activeColumnOrder",
    "args": [
      {
        "kind": "Variable",
        "name": "lenseId",
        "variableName": "lenseId"
      },
      {
        "kind": "Variable",
        "name": "lenseKey",
        "variableName": "lenseKey"
      },
      {
        "kind": "Literal",
        "name": "orderType",
        "value": "column_order"
      },
      {
        "kind": "Variable",
        "name": "topicId",
        "variableName": "topicId"
      }
    ],
    "concreteType": "CustomOrder",
    "kind": "LinkedField",
    "name": "activeCustomOrder",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "order",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SheetLensActiveColumnOrderQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "SheetLensActiveColumnOrderQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "5852016b495331d0105e88bfa9184b0b",
    "id": null,
    "metadata": {},
    "name": "SheetLensActiveColumnOrderQuery",
    "operationKind": "query",
    "text": "query SheetLensActiveColumnOrderQuery(\n  $topicId: ID\n  $lenseId: ID\n  $lenseKey: String\n) {\n  activeColumnOrder: activeCustomOrder(orderType: column_order, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e0288d7356114fbf04a608dba76c99e6';

module.exports = node;
