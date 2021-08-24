/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LensContainerFiltersOrderRefetchQueryVariables = {|
  topicId?: ?string,
  lenseId?: ?string,
  lenseKey?: ?string,
|};
export type LensContainerFiltersOrderRefetchQueryResponse = {|
  +activeCustomOrder: ?{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |}
|};
export type LensContainerFiltersOrderRefetchQuery = {|
  variables: LensContainerFiltersOrderRefetchQueryVariables,
  response: LensContainerFiltersOrderRefetchQueryResponse,
|};
*/


/*
query LensContainerFiltersOrderRefetchQuery(
  $topicId: ID
  $lenseId: ID
  $lenseKey: String
) {
  activeCustomOrder(orderType: filters, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {
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
        "value": "filters"
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
    "name": "LensContainerFiltersOrderRefetchQuery",
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
    "name": "LensContainerFiltersOrderRefetchQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "c122fca7b149634efa7369c4f3e7ad93",
    "id": null,
    "metadata": {},
    "name": "LensContainerFiltersOrderRefetchQuery",
    "operationKind": "query",
    "text": "query LensContainerFiltersOrderRefetchQuery(\n  $topicId: ID\n  $lenseId: ID\n  $lenseKey: String\n) {\n  activeCustomOrder(orderType: filters, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7b8762903572cbaff8336060f0837c96';

module.exports = node;
