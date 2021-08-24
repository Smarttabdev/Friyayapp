/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TeamResultsLens_activePeopleOrderQuery$ref = any;
export type TeamResultsLensQueryVariables = {|
  topicId: string,
  lenseId?: ?string,
  lenseKey?: ?string,
|};
export type TeamResultsLensQueryResponse = {|
  +$fragmentRefs: TeamResultsLens_activePeopleOrderQuery$ref
|};
export type TeamResultsLensQuery = {|
  variables: TeamResultsLensQueryVariables,
  response: TeamResultsLensQueryResponse,
|};
*/


/*
query TeamResultsLensQuery(
  $topicId: ID!
  $lenseId: ID
  $lenseKey: String
) {
  ...TeamResultsLens_activePeopleOrderQuery_1fsNJc
}

fragment TeamResultsLens_activePeopleOrderQuery_1fsNJc on Query {
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
    "name": "TeamResultsLensQuery",
    "selections": [
      {
        "args": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "TeamResultsLens_activePeopleOrderQuery"
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
    "name": "TeamResultsLensQuery",
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
    "cacheID": "338ac874510a075a925bcca3d9f7561c",
    "id": null,
    "metadata": {},
    "name": "TeamResultsLensQuery",
    "operationKind": "query",
    "text": "query TeamResultsLensQuery(\n  $topicId: ID!\n  $lenseId: ID\n  $lenseKey: String\n) {\n  ...TeamResultsLens_activePeopleOrderQuery_1fsNJc\n}\n\nfragment TeamResultsLens_activePeopleOrderQuery_1fsNJc on Query {\n  activePeopleOrder: activeCustomOrder(orderType: people, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c96640aab8366acbb333ad9528430df9';

module.exports = node;
