/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ViewDropdownMenuQueryVariables = {|
  topicId: string,
  config: string,
  hasTopic: boolean,
|};
export type ViewDropdownMenuQueryResponse = {|
  +boardTabsClosed?: ?{|
    +value: ?any
  |}
|};
export type ViewDropdownMenuQuery = {|
  variables: ViewDropdownMenuQueryVariables,
  response: ViewDropdownMenuQueryResponse,
|};
*/


/*
query ViewDropdownMenuQuery(
  $topicId: ID!
  $config: String!
  $hasTopic: Boolean!
) {
  boardTabsClosed: config(owner: $topicId, config: $config) @include(if: $hasTopic) {
    value
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "config"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasTopic"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v3 = [
  {
    "kind": "Variable",
    "name": "config",
    "variableName": "config"
  },
  {
    "kind": "Variable",
    "name": "owner",
    "variableName": "topicId"
  }
],
v4 = {
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
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewDropdownMenuQuery",
    "selections": [
      {
        "condition": "hasTopic",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": "boardTabsClosed",
            "args": (v3/*: any*/),
            "concreteType": "Config",
            "kind": "LinkedField",
            "name": "config",
            "plural": false,
            "selections": [
              (v4/*: any*/)
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
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "ViewDropdownMenuQuery",
    "selections": [
      {
        "condition": "hasTopic",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": "boardTabsClosed",
            "args": (v3/*: any*/),
            "concreteType": "Config",
            "kind": "LinkedField",
            "name": "config",
            "plural": false,
            "selections": [
              (v4/*: any*/),
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
    "cacheID": "cde1350a6510267fb1d1a1a6f8dfe163",
    "id": null,
    "metadata": {},
    "name": "ViewDropdownMenuQuery",
    "operationKind": "query",
    "text": "query ViewDropdownMenuQuery(\n  $topicId: ID!\n  $config: String!\n  $hasTopic: Boolean!\n) {\n  boardTabsClosed: config(owner: $topicId, config: $config) @include(if: $hasTopic) {\n    value\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '11ef7ccab87acc389984fd503feda9d0';

module.exports = node;
