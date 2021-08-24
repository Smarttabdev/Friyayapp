/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SheetAddRowQueryVariables = {|
  ownerId: string,
  hasUser: boolean,
|};
export type SheetAddRowQueryResponse = {|
  +linkedBoardsConfig?: ?{|
    +value: ?any
  |}
|};
export type SheetAddRowQuery = {|
  variables: SheetAddRowQueryVariables,
  response: SheetAddRowQueryResponse,
|};
*/


/*
query SheetAddRowQuery(
  $ownerId: ID!
  $hasUser: Boolean!
) {
  linkedBoardsConfig: config(owner: $ownerId, config: "linked_boards") @include(if: $hasUser) {
    value
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasUser"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "ownerId"
},
v2 = [
  {
    "kind": "Literal",
    "name": "config",
    "value": "linked_boards"
  },
  {
    "kind": "Variable",
    "name": "owner",
    "variableName": "ownerId"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SheetAddRowQuery",
    "selections": [
      {
        "condition": "hasUser",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": "linkedBoardsConfig",
            "args": (v2/*: any*/),
            "concreteType": "Config",
            "kind": "LinkedField",
            "name": "config",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "SheetAddRowQuery",
    "selections": [
      {
        "condition": "hasUser",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": "linkedBoardsConfig",
            "args": (v2/*: any*/),
            "concreteType": "Config",
            "kind": "LinkedField",
            "name": "config",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "703da90f675a1cd3c5918b70e02e75b8",
    "id": null,
    "metadata": {},
    "name": "SheetAddRowQuery",
    "operationKind": "query",
    "text": "query SheetAddRowQuery(\n  $ownerId: ID!\n  $hasUser: Boolean!\n) {\n  linkedBoardsConfig: config(owner: $ownerId, config: \"linked_boards\") @include(if: $hasUser) {\n    value\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '393fef9203a35db6aee10c1a40f8a636';

module.exports = node;
