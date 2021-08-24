/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LensContainerActivePeopleOrderRefetchQueryVariables = {|
  topicId?: ?string,
  lenseId?: ?string,
  lenseKey?: ?string,
|};
export type LensContainerActivePeopleOrderRefetchQueryResponse = {|
  +activeCustomOrder: ?{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |}
|};
export type LensContainerActivePeopleOrderRefetchQuery = {|
  variables: LensContainerActivePeopleOrderRefetchQueryVariables,
  response: LensContainerActivePeopleOrderRefetchQueryResponse,
|};
*/


/*
query LensContainerActivePeopleOrderRefetchQuery(
  $topicId: ID
  $lenseId: ID
  $lenseKey: String
) {
  activeCustomOrder(orderType: people, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {
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
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "lenseId",
        "variableName": "lenseId"
      },
      {
        "kind": "Variable",
        "name": "lenseKey",
        "variableName": "lenseKey"
      },
      {
        "kind": "Literal",
        "name": "orderType",
        "value": "people"
      },
      {
        "kind": "Variable",
        "name": "topicId",
        "variableName": "topicId"
      }
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
    "name": "LensContainerActivePeopleOrderRefetchQuery",
    "selections": (v3/*: any*/),
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
    "name": "LensContainerActivePeopleOrderRefetchQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "d88cec20bc5aa2852a29dab161f3d6c6",
    "id": null,
    "metadata": {},
    "name": "LensContainerActivePeopleOrderRefetchQuery",
    "operationKind": "query",
    "text": "query LensContainerActivePeopleOrderRefetchQuery(\n  $topicId: ID\n  $lenseId: ID\n  $lenseKey: String\n) {\n  activeCustomOrder(orderType: people, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c145261f8dd2c495c361a2554e2be668';

module.exports = node;
