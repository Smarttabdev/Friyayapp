/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type hooksTopicDeletedSubscriptionVariables = {|
  topicId: string
|};
export type hooksTopicDeletedSubscriptionResponse = {|
  +topicDeleted: {|
    +topicId: ?string
  |}
|};
export type hooksTopicDeletedSubscription = {|
  variables: hooksTopicDeletedSubscriptionVariables,
  response: hooksTopicDeletedSubscriptionResponse,
|};
*/


/*
subscription hooksTopicDeletedSubscription(
  $topicId: ID!
) {
  topicDeleted(topicId: $topicId) {
    topicId
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
    "concreteType": "TopicDeletedPayload",
    "kind": "LinkedField",
    "name": "topicDeleted",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "topicId",
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
    "name": "hooksTopicDeletedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "hooksTopicDeletedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "abcfa53d50653e0f999959160f944322",
    "id": null,
    "metadata": {},
    "name": "hooksTopicDeletedSubscription",
    "operationKind": "subscription",
    "text": "subscription hooksTopicDeletedSubscription(\n  $topicId: ID!\n) {\n  topicDeleted(topicId: $topicId) {\n    topicId\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '44a0042787d63cd90c4921a9d4e8530a';

module.exports = node;
