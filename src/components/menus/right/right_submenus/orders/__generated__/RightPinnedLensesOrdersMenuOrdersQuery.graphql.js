/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type RightPinnedLensesOrdersMenu_query$ref = any;
export type RightPinnedLensesOrdersMenuOrdersQueryVariables = {|
  topicId?: ?string
|};
export type RightPinnedLensesOrdersMenuOrdersQueryResponse = {|
  +$fragmentRefs: RightPinnedLensesOrdersMenu_query$ref
|};
export type RightPinnedLensesOrdersMenuOrdersQuery = {|
  variables: RightPinnedLensesOrdersMenuOrdersQueryVariables,
  response: RightPinnedLensesOrdersMenuOrdersQueryResponse,
|};
*/


/*
query RightPinnedLensesOrdersMenuOrdersQuery(
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
    "name": "RightPinnedLensesOrdersMenuOrdersQuery",
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
    "name": "RightPinnedLensesOrdersMenuOrdersQuery",
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
    "cacheID": "38bbb31a3dd45ab6520e77c6b6c7a732",
    "id": null,
    "metadata": {},
    "name": "RightPinnedLensesOrdersMenuOrdersQuery",
    "operationKind": "query",
    "text": "query RightPinnedLensesOrdersMenuOrdersQuery(\n  $topicId: ID\n) {\n  ...RightPinnedLensesOrdersMenu_query_1QjtfV\n}\n\nfragment RightPinnedLensesOrdersMenu_query_1QjtfV on Query {\n  pinnedLensesOrders(topicId: $topicId) {\n    id\n    name\n  }\n  activePinnedLensesOrder(topicId: $topicId) {\n    id\n  }\n  defaultPinnedLensesOrder(topicId: $topicId) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1f9451df1b7d97775e61c1111fef15db';

module.exports = node;
