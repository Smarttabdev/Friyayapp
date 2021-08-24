/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type hooksTopicUpdatedSubscriptionVariables = {|
  topicId: string
|};
export type hooksTopicUpdatedSubscriptionResponse = {|
  +topicUpdated: {|
    +topic: ?{|
      +id: string
    |}
  |}
|};
export type hooksTopicUpdatedSubscription = {|
  variables: hooksTopicUpdatedSubscriptionVariables,
  response: hooksTopicUpdatedSubscriptionResponse,
|};
*/


/*
subscription hooksTopicUpdatedSubscription(
  $topicId: ID!
) {
  topicUpdated(topicId: $topicId) {
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
    "concreteType": "TopicUpdatedPayload",
    "kind": "LinkedField",
    "name": "topicUpdated",
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
    "name": "hooksTopicUpdatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "hooksTopicUpdatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1bde3ec0317be870b28e0a04e80b39eb",
    "id": null,
    "metadata": {},
    "name": "hooksTopicUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription hooksTopicUpdatedSubscription(\n  $topicId: ID!\n) {\n  topicUpdated(topicId: $topicId) {\n    topic {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4f85470bf40ea60f55a87254f8043d9e';

module.exports = node;
