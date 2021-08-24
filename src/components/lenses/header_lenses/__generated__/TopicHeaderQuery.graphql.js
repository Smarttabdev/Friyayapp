/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TopicHeaderQueryVariables = {|
  topicId: string,
  config: string,
|};
export type TopicHeaderQueryResponse = {|
  +bannerHeightConfig: ?{|
    +id: string,
    +value: ?any,
  |}
|};
export type TopicHeaderQuery = {|
  variables: TopicHeaderQueryVariables,
  response: TopicHeaderQueryResponse,
|};
*/


/*
query TopicHeaderQuery(
  $topicId: ID!
  $config: String!
) {
  bannerHeightConfig: config(owner: $topicId, config: $config) {
    id
    value
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
  "name": "topicId"
},
v2 = [
  {
    "alias": "bannerHeightConfig",
    "args": [
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TopicHeaderQuery",
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
    "name": "TopicHeaderQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "7a8000092466b5e049f6c53e5f7990ed",
    "id": null,
    "metadata": {},
    "name": "TopicHeaderQuery",
    "operationKind": "query",
    "text": "query TopicHeaderQuery(\n  $topicId: ID!\n  $config: String!\n) {\n  bannerHeightConfig: config(owner: $topicId, config: $config) {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '19d5546df10b1588ff3e8df9f8b415c8';

module.exports = node;
