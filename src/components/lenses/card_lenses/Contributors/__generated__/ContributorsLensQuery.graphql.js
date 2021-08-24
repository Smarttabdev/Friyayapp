/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ContributorsLens_activePeopleOrderQuery$ref = any;
export type ContributorsLensQueryVariables = {|
  topicId: string,
  lenseId?: ?string,
  lenseKey?: ?string,
|};
export type ContributorsLensQueryResponse = {|
  +$fragmentRefs: ContributorsLens_activePeopleOrderQuery$ref
|};
export type ContributorsLensQuery = {|
  variables: ContributorsLensQueryVariables,
  response: ContributorsLensQueryResponse,
|};
*/


/*
query ContributorsLensQuery(
  $topicId: ID!
  $lenseId: ID
  $lenseKey: String
) {
  ...ContributorsLens_activePeopleOrderQuery_1fsNJc
}

fragment ContributorsLens_activePeopleOrderQuery_1fsNJc on Query {
  activePeopleOrder: activeCustomOrder(orderType: people, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {
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
v3 = {
  "kind": "Variable",
  "name": "lenseId",
  "variableName": "lenseId"
},
v4 = {
  "kind": "Variable",
  "name": "lenseKey",
  "variableName": "lenseKey"
},
v5 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ContributorsLensQuery",
    "selections": [
      {
        "args": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ContributorsLens_activePeopleOrderQuery"
      }
    ],
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
    "name": "ContributorsLensQuery",
    "selections": [
      {
        "alias": "activePeopleOrder",
        "args": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "Literal",
            "name": "orderType",
            "value": "people"
          },
          (v5/*: any*/)
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
    ]
  },
  "params": {
    "cacheID": "95a6656cdd24750b395c4053684a5ff4",
    "id": null,
    "metadata": {},
    "name": "ContributorsLensQuery",
    "operationKind": "query",
    "text": "query ContributorsLensQuery(\n  $topicId: ID!\n  $lenseId: ID\n  $lenseKey: String\n) {\n  ...ContributorsLens_activePeopleOrderQuery_1fsNJc\n}\n\nfragment ContributorsLens_activePeopleOrderQuery_1fsNJc on Query {\n  activePeopleOrder: activeCustomOrder(orderType: people, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3a09bf5364fc8ae56b1e8a5a0126b077';

module.exports = node;
