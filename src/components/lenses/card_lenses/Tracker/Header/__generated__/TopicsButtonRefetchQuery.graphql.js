/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TopicsButton_topicsQuery$ref = any;
export type TopicsButtonRefetchQueryVariables = {|
  parentId?: ?string,
  tagged?: ?$ReadOnlyArray<string>,
  assignedId?: ?$ReadOnlyArray<string>,
  assignedToType?: ?string,
|};
export type TopicsButtonRefetchQueryResponse = {|
  +$fragmentRefs: TopicsButton_topicsQuery$ref
|};
export type TopicsButtonRefetchQuery = {|
  variables: TopicsButtonRefetchQueryVariables,
  response: TopicsButtonRefetchQueryResponse,
|};
*/


/*
query TopicsButtonRefetchQuery(
  $parentId: ID
  $tagged: [String!]
  $assignedId: [ID!]
  $assignedToType: String
) {
  ...TopicsButton_topicsQuery_2z7QeF
}

fragment TopicsButton_topicsQuery_2z7QeF on Query {
  topics(parentId: $parentId, tagged: $tagged, assignedTo: $assignedId, assignedToType: $assignedToType) {
    totalCount
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "assignedId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "assignedToType"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "parentId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tagged"
},
v4 = {
  "kind": "Variable",
  "name": "assignedToType",
  "variableName": "assignedToType"
},
v5 = {
  "kind": "Variable",
  "name": "parentId",
  "variableName": "parentId"
},
v6 = {
  "kind": "Variable",
  "name": "tagged",
  "variableName": "tagged"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TopicsButtonRefetchQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "assignedId",
            "variableName": "assignedId"
          },
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "TopicsButton_topicsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "TopicsButtonRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "assignedTo",
            "variableName": "assignedId"
          },
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/)
        ],
        "concreteType": "TopicConnection",
        "kind": "LinkedField",
        "name": "topics",
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
    "cacheID": "5d7e639b2cf424157c5a95a249b5a958",
    "id": null,
    "metadata": {},
    "name": "TopicsButtonRefetchQuery",
    "operationKind": "query",
    "text": "query TopicsButtonRefetchQuery(\n  $parentId: ID\n  $tagged: [String!]\n  $assignedId: [ID!]\n  $assignedToType: String\n) {\n  ...TopicsButton_topicsQuery_2z7QeF\n}\n\nfragment TopicsButton_topicsQuery_2z7QeF on Query {\n  topics(parentId: $parentId, tagged: $tagged, assignedTo: $assignedId, assignedToType: $assignedToType) {\n    totalCount\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9fba3d3871c2273bd9008241f1fd7e4d';

module.exports = node;
