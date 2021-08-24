/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrdersSectionValue_query$ref = any;
export type CustomOrderEnum = "column_order" | "filters" | "people" | "topics" | "%future added value";
export type OrdersSectionValueQueryVariables = {|
  queryTopicId?: ?string,
  queryLenseId?: ?string,
  queryLenseKey?: ?string,
  topicId?: ?string,
  lenseId?: ?string,
  lenseKey?: ?string,
  orderType: CustomOrderEnum,
|};
export type OrdersSectionValueQueryResponse = {|
  +$fragmentRefs: OrdersSectionValue_query$ref
|};
export type OrdersSectionValueQuery = {|
  variables: OrdersSectionValueQueryVariables,
  response: OrdersSectionValueQueryResponse,
|};
*/


/*
query OrdersSectionValueQuery(
  $queryTopicId: ID
  $queryLenseId: ID
  $queryLenseKey: String
  $topicId: ID
  $lenseId: ID
  $lenseKey: String
  $orderType: CustomOrderEnum!
) {
  ...OrdersSectionValue_query_3r4tn6
}

fragment OrdersSectionValue_query_3r4tn6 on Query {
  customOrders(orderType: $orderType, topicId: $queryTopicId, lenseId: $queryLenseId, lenseKey: $queryLenseKey) {
    id
    name
  }
  activeCustomOrder(orderType: $orderType, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {
    id
  }
  defaultCustomOrder(orderType: $orderType, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {
    id
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
  "name": "orderType"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "queryLenseId"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "queryLenseKey"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "queryTopicId"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v7 = {
  "kind": "Variable",
  "name": "lenseId",
  "variableName": "lenseId"
},
v8 = {
  "kind": "Variable",
  "name": "lenseKey",
  "variableName": "lenseKey"
},
v9 = {
  "kind": "Variable",
  "name": "orderType",
  "variableName": "orderType"
},
v10 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = [
  (v7/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/)
],
v13 = [
  (v11/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "OrdersSectionValueQuery",
    "selections": [
      {
        "args": [
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "kind": "Variable",
            "name": "queryLenseId",
            "variableName": "queryLenseId"
          },
          {
            "kind": "Variable",
            "name": "queryLenseKey",
            "variableName": "queryLenseKey"
          },
          {
            "kind": "Variable",
            "name": "queryTopicId",
            "variableName": "queryTopicId"
          },
          (v10/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "OrdersSectionValue_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v5/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v6/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "OrdersSectionValueQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "lenseId",
            "variableName": "queryLenseId"
          },
          {
            "kind": "Variable",
            "name": "lenseKey",
            "variableName": "queryLenseKey"
          },
          (v9/*: any*/),
          {
            "kind": "Variable",
            "name": "topicId",
            "variableName": "queryTopicId"
          }
        ],
        "concreteType": "CustomOrder",
        "kind": "LinkedField",
        "name": "customOrders",
        "plural": true,
        "selections": [
          (v11/*: any*/),
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
        "args": (v12/*: any*/),
        "concreteType": "CustomOrder",
        "kind": "LinkedField",
        "name": "activeCustomOrder",
        "plural": false,
        "selections": (v13/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v12/*: any*/),
        "concreteType": "CustomOrder",
        "kind": "LinkedField",
        "name": "defaultCustomOrder",
        "plural": false,
        "selections": (v13/*: any*/),
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b8b0759914227134ae216e26a0529043",
    "id": null,
    "metadata": {},
    "name": "OrdersSectionValueQuery",
    "operationKind": "query",
    "text": "query OrdersSectionValueQuery(\n  $queryTopicId: ID\n  $queryLenseId: ID\n  $queryLenseKey: String\n  $topicId: ID\n  $lenseId: ID\n  $lenseKey: String\n  $orderType: CustomOrderEnum!\n) {\n  ...OrdersSectionValue_query_3r4tn6\n}\n\nfragment OrdersSectionValue_query_3r4tn6 on Query {\n  customOrders(orderType: $orderType, topicId: $queryTopicId, lenseId: $queryLenseId, lenseKey: $queryLenseKey) {\n    id\n    name\n  }\n  activeCustomOrder(orderType: $orderType, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n  }\n  defaultCustomOrder(orderType: $orderType, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '36d36c67f5a096cdb2174c194b55d660';

module.exports = node;
