/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type RightPinnedLensesOrdersMenu_query$ref = any;
export type RightPinnedLensesOrdersMenuQueryVariables = {|
  topicId?: ?string
|};
export type RightPinnedLensesOrdersMenuQueryResponse = {|
  +$fragmentRefs: RightPinnedLensesOrdersMenu_query$ref
|};
export type RightPinnedLensesOrdersMenuQuery = {|
  variables: RightPinnedLensesOrdersMenuQueryVariables,
  response: RightPinnedLensesOrdersMenuQueryResponse,
|};
*/


/*
query RightPinnedLensesOrdersMenuQuery(
  $topicId: ID
) {
  ...RightPinnedLensesOrdersMenu_query_1QjtfV
}

fragment RightPinnedLensesOrdersMenu_query_1QjtfV on Query {
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
    "name": "RightPinnedLensesOrdersMenuQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "RightPinnedLensesOrdersMenu_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RightPinnedLensesOrdersMenuQuery",
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
    "cacheID": "c9ceb9578aec25bc04bae5c2e0d331bd",
    "id": null,
    "metadata": {},
    "name": "RightPinnedLensesOrdersMenuQuery",
    "operationKind": "query",
    "text": "query RightPinnedLensesOrdersMenuQuery(\n  $topicId: ID\n) {\n  ...RightPinnedLensesOrdersMenu_query_1QjtfV\n}\n\nfragment RightPinnedLensesOrdersMenu_query_1QjtfV on Query {\n  pinnedLensesOrders(topicId: $topicId) {\n    id\n    name\n  }\n  activePinnedLensesOrder(topicId: $topicId) {\n    id\n  }\n  defaultPinnedLensesOrder(topicId: $topicId) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b65bcad6528821e0805f9aca65289031';

module.exports = node;
