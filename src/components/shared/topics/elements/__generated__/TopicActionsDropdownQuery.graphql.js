/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TopicActionsDropdownQueryVariables = {|
  topicId: string,
  config: string,
  hasTopic: boolean,
|};
export type TopicActionsDropdownQueryResponse = {|
  +boardTabsClosed?: ?{|
    +value: ?any
  |}
|};
export type TopicActionsDropdownQuery = {|
  variables: TopicActionsDropdownQueryVariables,
  response: TopicActionsDropdownQueryResponse,
|};
*/


/*
query TopicActionsDropdownQuery(
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
    "name": "TopicActionsDropdownQuery",
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
    "name": "TopicActionsDropdownQuery",
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
    "cacheID": "2bcb7877c9c333525b3125dcbb91090d",
    "id": null,
    "metadata": {},
    "name": "TopicActionsDropdownQuery",
    "operationKind": "query",
    "text": "query TopicActionsDropdownQuery(\n  $topicId: ID!\n  $config: String!\n  $hasTopic: Boolean!\n) {\n  boardTabsClosed: config(owner: $topicId, config: $config) @include(if: $hasTopic) {\n    value\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3c089ff10fbffdfb67317110444b81f4';

module.exports = node;
