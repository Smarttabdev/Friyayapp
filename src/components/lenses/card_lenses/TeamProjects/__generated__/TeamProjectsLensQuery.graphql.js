/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TeamProjectsLens_query$ref = any;
export type TeamProjectsLensQueryVariables = {|
  topicId: string,
  lenseId?: ?string,
  lenseKey?: ?string,
  ownerId: string,
|};
export type TeamProjectsLensQueryResponse = {|
  +$fragmentRefs: TeamProjectsLens_query$ref
|};
export type TeamProjectsLensQuery = {|
  variables: TeamProjectsLensQueryVariables,
  response: TeamProjectsLensQueryResponse,
|};
*/


/*
query TeamProjectsLensQuery(
  $topicId: ID!
  $lenseId: ID
  $lenseKey: String
  $ownerId: ID!
) {
  ...TeamProjectsLens_query_3lpbEQ
}

fragment TeamProjectsLens_query_3lpbEQ on Query {
  activePeopleOrder: activeCustomOrder(orderType: people, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {
    id
    name
    order
  }
  collapsedIdsConfig: config(owner: $ownerId, config: "TEAM_PROJECTS.collapsed_ids") {
    value
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
  "name": "ownerId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v4 = {
  "kind": "Variable",
  "name": "lenseId",
  "variableName": "lenseId"
},
v5 = {
  "kind": "Variable",
  "name": "lenseKey",
  "variableName": "lenseKey"
},
v6 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
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
    "name": "TeamProjectsLensQuery",
    "selections": [
      {
        "args": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "Variable",
            "name": "ownerId",
            "variableName": "ownerId"
          },
          (v6/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "TeamProjectsLens_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "TeamProjectsLensQuery",
    "selections": [
      {
        "alias": "activePeopleOrder",
        "args": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "Literal",
            "name": "orderType",
            "value": "people"
          },
          (v6/*: any*/)
        ],
        "concreteType": "CustomOrder",
        "kind": "LinkedField",
        "name": "activeCustomOrder",
        "plural": false,
        "selections": [
          (v7/*: any*/),
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
      },
      {
        "alias": "collapsedIdsConfig",
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "TEAM_PROJECTS.collapsed_ids"
          },
          {
            "kind": "Variable",
            "name": "owner",
            "variableName": "ownerId"
          }
        ],
        "concreteType": "Config",
        "kind": "LinkedField",
        "name": "config",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "value",
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ec00ed858db076616ac6df14d6d4ced7",
    "id": null,
    "metadata": {},
    "name": "TeamProjectsLensQuery",
    "operationKind": "query",
    "text": "query TeamProjectsLensQuery(\n  $topicId: ID!\n  $lenseId: ID\n  $lenseKey: String\n  $ownerId: ID!\n) {\n  ...TeamProjectsLens_query_3lpbEQ\n}\n\nfragment TeamProjectsLens_query_3lpbEQ on Query {\n  activePeopleOrder: activeCustomOrder(orderType: people, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n  collapsedIdsConfig: config(owner: $ownerId, config: \"TEAM_PROJECTS.collapsed_ids\") {\n    value\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'adcf85d1392ac019074e02082be75c81';

module.exports = node;
