/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type BoardBoxQueryVariables = {|
  topicId?: ?string
|};
export type BoardBoxQueryResponse = {|
  +topic: ?{|
    +id: string,
    +title: string,
    +speed: ?number,
    +completion: ?number,
  |}
|};
export type BoardBoxQuery = {|
  variables: BoardBoxQueryVariables,
  response: BoardBoxQueryResponse,
|};
*/


/*
query BoardBoxQuery(
  $topicId: ID
) {
  topic(id: $topicId, speed: true, completion: true) {
    id
    title
    speed
    completion
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "topicId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "completion",
        "value": true
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "topicId"
      },
      {
        "kind": "Literal",
        "name": "speed",
        "value": true
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
        "name": "speed",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "completion",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BoardBoxQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BoardBoxQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4a25bd20f801ca091bc29764e1049ccb",
    "id": null,
    "metadata": {},
    "name": "BoardBoxQuery",
    "operationKind": "query",
    "text": "query BoardBoxQuery(\n  $topicId: ID\n) {\n  topic(id: $topicId, speed: true, completion: true) {\n    id\n    title\n    speed\n    completion\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bf1a9ef48e56a2b2cf896ed081a354ca';

module.exports = node;
