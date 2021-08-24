/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DashboardSpeedometerBoxQueryVariables = {|
  topicId?: ?string
|};
export type DashboardSpeedometerBoxQueryResponse = {|
  +topic: ?{|
    +id: string,
    +title: string,
    +speed: ?number,
    +completion: ?number,
    +slug: string,
  |}
|};
export type DashboardSpeedometerBoxQuery = {|
  variables: DashboardSpeedometerBoxQueryVariables,
  response: DashboardSpeedometerBoxQueryResponse,
|};
*/


/*
query DashboardSpeedometerBoxQuery(
  $topicId: ID
) {
  topic(id: $topicId, speed: true, completion: true) {
    id
    title
    speed
    completion
    slug
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "slug",
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
    "name": "DashboardSpeedometerBoxQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DashboardSpeedometerBoxQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fb397a80eb08569300f5352cc030edf1",
    "id": null,
    "metadata": {},
    "name": "DashboardSpeedometerBoxQuery",
    "operationKind": "query",
    "text": "query DashboardSpeedometerBoxQuery(\n  $topicId: ID\n) {\n  topic(id: $topicId, speed: true, completion: true) {\n    id\n    title\n    speed\n    completion\n    slug\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '62f39ea841dd12211fa58a791bb7e78c';

module.exports = node;
