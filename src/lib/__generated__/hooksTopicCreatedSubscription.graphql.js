/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type hooksTopicCreatedSubscriptionVariables = {|
  topicId: string
|};
export type hooksTopicCreatedSubscriptionResponse = {|
  +topicCreated: {|
    +topic: ?{|
      +id: string
    |}
  |}
|};
export type hooksTopicCreatedSubscription = {|
  variables: hooksTopicCreatedSubscriptionVariables,
  response: hooksTopicCreatedSubscriptionResponse,
|};
*/


/*
subscription hooksTopicCreatedSubscription(
  $topicId: ID!
) {
  topicCreated(topicId: $topicId) {
    topic {
      id
    }
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
        "kind": "Variable",
        "name": "topicId",
        "variableName": "topicId"
      }
    ],
    "concreteType": "TopicCreatedPayload",
    "kind": "LinkedField",
    "name": "topicCreated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
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
          }
        ],
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
    "name": "hooksTopicCreatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "hooksTopicCreatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6334a64761f46fb5dfe41b46453d10d0",
    "id": null,
    "metadata": {},
    "name": "hooksTopicCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription hooksTopicCreatedSubscription(\n  $topicId: ID!\n) {\n  topicCreated(topicId: $topicId) {\n    topic {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b812fdb16c4e5b16e286eb57e1e12a0d';

module.exports = node;
