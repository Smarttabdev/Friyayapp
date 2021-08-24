/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type RightActionBarContainer_query$ref = any;
export type RightActionBarContainerQueryVariables = {|
  owner: string
|};
export type RightActionBarContainerQueryResponse = {|
  +$fragmentRefs: RightActionBarContainer_query$ref
|};
export type RightActionBarContainerQuery = {|
  variables: RightActionBarContainerQueryVariables,
  response: RightActionBarContainerQueryResponse,
|};
*/


/*
query RightActionBarContainerQuery(
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
    "name": "RightActionBarContainerQuery",
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
    "name": "RightActionBarContainerQuery",
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
    "cacheID": "925f553075f49f6a0513e476a909817f",
    "id": null,
    "metadata": {},
    "name": "RightActionBarContainerQuery",
    "operationKind": "query",
    "text": "query RightActionBarContainerQuery(\n  $owner: ID!\n) {\n  ...RightActionBarContainer_query_1JS2nm\n}\n\nfragment RightActionBarContainer_query_1JS2nm on Query {\n  config(owner: $owner, config: \"right_submenu_quick_open_close_array\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '49388ff6e40cbd2269f353fb8ebe075c';

module.exports = node;
