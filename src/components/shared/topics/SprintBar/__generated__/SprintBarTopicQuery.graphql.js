/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SprintBarTopicQueryVariables = {|
  topicId?: ?string
|};
export type SprintBarTopicQueryResponse = {|
  +topic: ?{|
    +id: string,
    +speed: ?number,
    +completion: ?number,
  |},
  +tips: ?{|
    +totalCount: number
  |},
  +completedTips: ?{|
    +totalCount: number
  |},
|};
export type SprintBarTopicQuery = {|
  variables: SprintBarTopicQueryVariables,
  response: SprintBarTopicQueryResponse,
|};
*/


/*
query SprintBarTopicQuery(
  $topicId: ID
) {
  topic(id: $topicId, speed: true, completion: true) {
    id
    speed
    completion
  }
  tips(topicId: $topicId) {
    totalCount
  }
  completedTips: tips(topicId: $topicId, excludeUncompleted: true) {
    totalCount
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
v1 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
],
v3 = [
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
  },
  {
    "alias": null,
    "args": [
      (v1/*: any*/)
    ],
    "concreteType": "TipConnection",
    "kind": "LinkedField",
    "name": "tips",
    "plural": false,
    "selections": (v2/*: any*/),
    "storageKey": null
  },
  {
    "alias": "completedTips",
    "args": [
      {
        "kind": "Literal",
        "name": "excludeUncompleted",
        "value": true
      },
      (v1/*: any*/)
    ],
    "concreteType": "TipConnection",
    "kind": "LinkedField",
    "name": "tips",
    "plural": false,
    "selections": (v2/*: any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SprintBarTopicQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SprintBarTopicQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "d284bb5d19cd535b7adc830e8c07f043",
    "id": null,
    "metadata": {},
    "name": "SprintBarTopicQuery",
    "operationKind": "query",
    "text": "query SprintBarTopicQuery(\n  $topicId: ID\n) {\n  topic(id: $topicId, speed: true, completion: true) {\n    id\n    speed\n    completion\n  }\n  tips(topicId: $topicId) {\n    totalCount\n  }\n  completedTips: tips(topicId: $topicId, excludeUncompleted: true) {\n    totalCount\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f7599289dc69e290abf2cd0feef5b2d6';

module.exports = node;
