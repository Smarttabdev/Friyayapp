/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TeamDayLens_activePeopleOrderQuery$ref = any;
export type TeamDayLensQueryVariables = {|
  topicId: string,
  lenseId?: ?string,
  lenseKey?: ?string,
|};
export type TeamDayLensQueryResponse = {|
  +$fragmentRefs: TeamDayLens_activePeopleOrderQuery$ref
|};
export type TeamDayLensQuery = {|
  variables: TeamDayLensQueryVariables,
  response: TeamDayLensQueryResponse,
|};
*/


/*
query TeamDayLensQuery(
  $topicId: ID!
  $lenseId: ID
  $lenseKey: String
) {
  ...TeamDayLens_activePeopleOrderQuery_1fsNJc
}

fragment TeamDayLens_activePeopleOrderQuery_1fsNJc on Query {
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
    "name": "TeamDayLensQuery",
    "selections": [
      {
        "args": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "TeamDayLens_activePeopleOrderQuery"
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
    "name": "TeamDayLensQuery",
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
    "cacheID": "5793d5d42e37bfaa12dc1cdfe7dd2c98",
    "id": null,
    "metadata": {},
    "name": "TeamDayLensQuery",
    "operationKind": "query",
    "text": "query TeamDayLensQuery(\n  $topicId: ID!\n  $lenseId: ID\n  $lenseKey: String\n) {\n  ...TeamDayLens_activePeopleOrderQuery_1fsNJc\n}\n\nfragment TeamDayLens_activePeopleOrderQuery_1fsNJc on Query {\n  activePeopleOrder: activeCustomOrder(orderType: people, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1a79b3ab881efc889464ce18f425b36f';

module.exports = node;
