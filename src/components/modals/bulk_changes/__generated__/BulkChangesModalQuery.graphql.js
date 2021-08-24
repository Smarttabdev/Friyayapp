/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type BulkChangesModalQueryVariables = {|
  topicId?: ?string,
  hasTopic: boolean,
|};
export type BulkChangesModalQueryResponse = {|
  +topic?: ?{|
    +id: string,
    +title: string,
    +defaultViewId: ?string,
    +topics: ?{|
      +totalCount: number
    |},
  |}
|};
export type BulkChangesModalQuery = {|
  variables: BulkChangesModalQueryVariables,
  response: BulkChangesModalQueryResponse,
|};
*/


/*
query BulkChangesModalQuery(
  $topicId: ID
  $hasTopic: Boolean!
) {
  topic(id: $topicId) @include(if: $hasTopic) {
    id
    title
    defaultViewId
    topics {
      totalCount
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasTopic"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v2 = [
  {
    "condition": "hasTopic",
    "kind": "Condition",
    "passingValue": true,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "topicId"
          }
        ],
        "concreteType": "Topic",
        "kind": "LinkedField",
        "name": "topic",
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
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "defaultViewId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TopicConnection",
            "kind": "LinkedField",
            "name": "topics",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "BulkChangesModalQuery",
    "selections": (v2/*: any*/),
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
    "name": "BulkChangesModalQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "58a4b9e6a05bff90e15a0cffa9acb655",
    "id": null,
    "metadata": {},
    "name": "BulkChangesModalQuery",
    "operationKind": "query",
    "text": "query BulkChangesModalQuery(\n  $topicId: ID\n  $hasTopic: Boolean!\n) {\n  topic(id: $topicId) @include(if: $hasTopic) {\n    id\n    title\n    defaultViewId\n    topics {\n      totalCount\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9c965ebb1b7e6737cb74d2850960d2da';

module.exports = node;
