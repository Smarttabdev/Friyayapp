/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type StarterFilterToolList_query$ref = any;
export type ItemTypeEnum = "ALL" | "BOARD" | "CARD" | "CHAT_CARD" | "DATA_BOARD" | "DATA_CARD" | "FILE_BOARD" | "FILE_CARD" | "GOAL_BOARD" | "KNOWLEDGE_BOARD" | "NOTES_BOARD" | "NOTES_CARD" | "PROJECT_BOARD" | "TASK_BOARD" | "TASK_CARD" | "VIDEO_CHAT_CARD" | "%future added value";
export type StarterFilterToolListCountQueryVariables = {|
  itemTypes?: ?$ReadOnlyArray<ItemTypeEnum>,
  topicId?: ?string,
  filters?: ?any,
|};
export type StarterFilterToolListCountQueryResponse = {|
  +$fragmentRefs: StarterFilterToolList_query$ref
|};
export type StarterFilterToolListCountQuery = {|
  variables: StarterFilterToolListCountQueryVariables,
  response: StarterFilterToolListCountQueryResponse,
|};
*/


/*
query StarterFilterToolListCountQuery(
  $itemTypes: [ItemTypeEnum!]
  $topicId: ID
  $filters: JSON
) {
  ...StarterFilterToolList_query_33xghN
}

fragment StarterFilterToolList_query_33xghN on Query {
  items(itemTypes: $itemTypes, topicId: $topicId, filters: $filters) {
    totalCount
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filters"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "itemTypes"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v3 = [
  {
    "kind": "Variable",
    "name": "filters",
    "variableName": "filters"
  },
  {
    "kind": "Variable",
    "name": "itemTypes",
    "variableName": "itemTypes"
  },
  {
    "kind": "Variable",
    "name": "topicId",
    "variableName": "topicId"
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
    "name": "StarterFilterToolListCountQuery",
    "selections": [
      {
        "args": (v3/*: any*/),
        "kind": "FragmentSpread",
        "name": "StarterFilterToolList_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "StarterFilterToolListCountQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "ItemConnection",
        "kind": "LinkedField",
        "name": "items",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f96f5c1e699e1da3f593288a45078701",
    "id": null,
    "metadata": {},
    "name": "StarterFilterToolListCountQuery",
    "operationKind": "query",
    "text": "query StarterFilterToolListCountQuery(\n  $itemTypes: [ItemTypeEnum!]\n  $topicId: ID\n  $filters: JSON\n) {\n  ...StarterFilterToolList_query_33xghN\n}\n\nfragment StarterFilterToolList_query_33xghN on Query {\n  items(itemTypes: $itemTypes, topicId: $topicId, filters: $filters) {\n    totalCount\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ab10e222df57f86837cedf4b4aaf58f6';

module.exports = node;
