/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type StarterLensTopicCreatedSubscriptionVariables = {|
  topicId: string
|};
export type StarterLensTopicCreatedSubscriptionResponse = {|
  +topicCreated: {|
    +topic: ?{|
      +id: string,
      +title: string,
      +slug: string,
      +tagList: ?$ReadOnlyArray<string>,
      +createdAt: string,
      +updatedAt: string,
    |}
  |}
|};
export type StarterLensTopicCreatedSubscription = {|
  variables: StarterLensTopicCreatedSubscriptionVariables,
  response: StarterLensTopicCreatedSubscriptionResponse,
|};
*/


/*
subscription StarterLensTopicCreatedSubscription(
  $topicId: ID!
) {
  topicCreated(topicId: $topicId) {
    topic {
      id
      title
      slug
      tagList
      createdAt
      updatedAt
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
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "tagList",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "updatedAt",
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
    "name": "StarterLensTopicCreatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StarterLensTopicCreatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b046986978b81742308c76fc5c3b85ca",
    "id": null,
    "metadata": {},
    "name": "StarterLensTopicCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription StarterLensTopicCreatedSubscription(\n  $topicId: ID!\n) {\n  topicCreated(topicId: $topicId) {\n    topic {\n      id\n      title\n      slug\n      tagList\n      createdAt\n      updatedAt\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8d6358b328d79f6f6f6762b10d646163';

module.exports = node;
