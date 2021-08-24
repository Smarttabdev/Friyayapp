/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type RightActionBarContainer_query$ref = any;
export type RightActionBarContainerRefetchQueryVariables = {|
  owner: string
|};
export type RightActionBarContainerRefetchQueryResponse = {|
  +$fragmentRefs: RightActionBarContainer_query$ref
|};
export type RightActionBarContainerRefetchQuery = {|
  variables: RightActionBarContainerRefetchQueryVariables,
  response: RightActionBarContainerRefetchQueryResponse,
|};
*/


/*
query RightActionBarContainerRefetchQuery(
  $owner: ID!
) {
  ...RightActionBarContainer_query_1JS2nm
}

fragment RightActionBarContainer_query_1JS2nm on Query {
  config(owner: $owner, config: "right_submenu_quick_open_close_array") {
    id
    value
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "owner"
  }
],
v1 = {
  "kind": "Variable",
  "name": "owner",
  "variableName": "owner"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RightActionBarContainerRefetchQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "RightActionBarContainer_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RightActionBarContainerRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "right_submenu_quick_open_close_array"
          },
          (v1/*: any*/)
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
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "value",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4354e11d8a4a0b4393fddcf55b8ce981",
    "id": null,
    "metadata": {},
    "name": "RightActionBarContainerRefetchQuery",
    "operationKind": "query",
    "text": "query RightActionBarContainerRefetchQuery(\n  $owner: ID!\n) {\n  ...RightActionBarContainer_query_1JS2nm\n}\n\nfragment RightActionBarContainer_query_1JS2nm on Query {\n  config(owner: $owner, config: \"right_submenu_quick_open_close_array\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '35490c7c58e07811201f6d15e7f217da';

module.exports = node;
