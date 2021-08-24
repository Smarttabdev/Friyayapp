/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TeamGoalsLens_query$ref = any;
export type TeamGoalsLensQueryVariables = {|
  topicId: string,
  lenseId?: ?string,
  lenseKey?: ?string,
  ownerId: string,
|};
export type TeamGoalsLensQueryResponse = {|
  +$fragmentRefs: TeamGoalsLens_query$ref
|};
export type TeamGoalsLensQuery = {|
  variables: TeamGoalsLensQueryVariables,
  response: TeamGoalsLensQueryResponse,
|};
*/


/*
query TeamGoalsLensQuery(
  $topicId: ID!
  $lenseId: ID
  $lenseKey: String
  $ownerId: ID!
) {
  ...TeamGoalsLens_query_3lpbEQ
}

fragment TeamGoalsLens_query_3lpbEQ on Query {
  activePeopleOrder: activeCustomOrder(orderType: people, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {
    id
    name
    order
  }
  collapsedIdsConfig: config(owner: $ownerId, config: "TEAM_GOALS.collapsed_ids") {
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
    "name": "TeamGoalsLensQuery",
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
        "name": "TeamGoalsLens_query"
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
    "name": "TeamGoalsLensQuery",
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
            "value": "TEAM_GOALS.collapsed_ids"
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
    "cacheID": "e741d9fefdfdb1c4416b67b6e982040e",
    "id": null,
    "metadata": {},
    "name": "TeamGoalsLensQuery",
    "operationKind": "query",
    "text": "query TeamGoalsLensQuery(\n  $topicId: ID!\n  $lenseId: ID\n  $lenseKey: String\n  $ownerId: ID!\n) {\n  ...TeamGoalsLens_query_3lpbEQ\n}\n\nfragment TeamGoalsLens_query_3lpbEQ on Query {\n  activePeopleOrder: activeCustomOrder(orderType: people, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n  collapsedIdsConfig: config(owner: $ownerId, config: \"TEAM_GOALS.collapsed_ids\") {\n    value\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '187a79a0f3121e22c46b4548ae441f46';

module.exports = node;
