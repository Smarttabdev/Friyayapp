/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type PinnedToolsOrderList_query$ref = any;
export type PinnedToolsOrderListQueryVariables = {|
  topicId?: ?string
|};
export type PinnedToolsOrderListQueryResponse = {|
  +$fragmentRefs: PinnedToolsOrderList_query$ref
|};
export type PinnedToolsOrderListQuery = {|
  variables: PinnedToolsOrderListQueryVariables,
  response: PinnedToolsOrderListQueryResponse,
|};
*/


/*
query PinnedToolsOrderListQuery(
  $topicId: ID
) {
  ...PinnedToolsOrderList_query_1QjtfV
}

fragment PinnedToolsOrderList_query_1QjtfV on Query {
  pinnedLensesOrders(topicId: $topicId) {
    id
    name
  }
  activePinnedLensesOrder(topicId: $topicId) {
    id
  }
  defaultPinnedLensesOrder(topicId: $topicId) {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "topicId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "topicId",
    "variableName": "topicId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PinnedToolsOrderListQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "PinnedToolsOrderList_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PinnedToolsOrderListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PinnedLensesOrder",
        "kind": "LinkedField",
        "name": "pinnedLensesOrders",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PinnedLensesOrder",
        "kind": "LinkedField",
        "name": "activePinnedLensesOrder",
        "plural": false,
        "selections": (v3/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PinnedLensesOrder",
        "kind": "LinkedField",
        "name": "defaultPinnedLensesOrder",
        "plural": false,
        "selections": (v3/*: any*/),
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5abc70b1d0631f4c1389fd94943b2d67",
    "id": null,
    "metadata": {},
    "name": "PinnedToolsOrderListQuery",
    "operationKind": "query",
    "text": "query PinnedToolsOrderListQuery(\n  $topicId: ID\n) {\n  ...PinnedToolsOrderList_query_1QjtfV\n}\n\nfragment PinnedToolsOrderList_query_1QjtfV on Query {\n  pinnedLensesOrders(topicId: $topicId) {\n    id\n    name\n  }\n  activePinnedLensesOrder(topicId: $topicId) {\n    id\n  }\n  defaultPinnedLensesOrder(topicId: $topicId) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '12be656e9b620b17b9e9bebb75b3b6a2';

module.exports = node;
