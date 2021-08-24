/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type StatusTableGrid_activePeopleOrderQuery$ref = any;
export type StatusTableGridQueryVariables = {|
  topicId: string,
  lenseId?: ?string,
  lenseKey?: ?string,
|};
export type StatusTableGridQueryResponse = {|
  +$fragmentRefs: StatusTableGrid_activePeopleOrderQuery$ref
|};
export type StatusTableGridQuery = {|
  variables: StatusTableGridQueryVariables,
  response: StatusTableGridQueryResponse,
|};
*/


/*
query StatusTableGridQuery(
  $topicId: ID!
  $lenseId: ID
  $lenseKey: String
) {
  ...StatusTableGrid_activePeopleOrderQuery_1fsNJc
}

fragment StatusTableGrid_activePeopleOrderQuery_1fsNJc on Query {
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
    "name": "StatusTableGridQuery",
    "selections": [
      {
        "args": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "StatusTableGrid_activePeopleOrderQuery"
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
    "name": "StatusTableGridQuery",
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
    "cacheID": "8bedd878d7812d629291701b7a509e79",
    "id": null,
    "metadata": {},
    "name": "StatusTableGridQuery",
    "operationKind": "query",
    "text": "query StatusTableGridQuery(\n  $topicId: ID!\n  $lenseId: ID\n  $lenseKey: String\n) {\n  ...StatusTableGrid_activePeopleOrderQuery_1fsNJc\n}\n\nfragment StatusTableGrid_activePeopleOrderQuery_1fsNJc on Query {\n  activePeopleOrder: activeCustomOrder(orderType: people, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b429381dc15d0cba4a9673bfeaeb0d50';

module.exports = node;
