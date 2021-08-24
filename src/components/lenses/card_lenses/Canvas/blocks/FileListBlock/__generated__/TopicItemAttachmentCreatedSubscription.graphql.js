/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TopicItemAttachmentCreatedSubscriptionVariables = {|
  topicId: string
|};
export type TopicItemAttachmentCreatedSubscriptionResponse = {|
  +attachmentCreated: {|
    +attachment: ?{|
      +id: string,
      +url: ?string,
      +tip: ?{|
        +id: string,
        +title: ?string,
        +slug: string,
      |},
    |}
  |}
|};
export type TopicItemAttachmentCreatedSubscription = {|
  variables: TopicItemAttachmentCreatedSubscriptionVariables,
  response: TopicItemAttachmentCreatedSubscriptionResponse,
|};
*/


/*
subscription TopicItemAttachmentCreatedSubscription(
  $topicId: ID!
) {
  attachmentCreated(topicId: $topicId) {
    attachment {
      id
      url
      tip {
        id
        title
        slug
      }
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "topicId",
        "variableName": "topicId"
      }
    ],
    "concreteType": "AttachmentCreatedPayload",
    "kind": "LinkedField",
    "name": "attachmentCreated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Attachment",
        "kind": "LinkedField",
        "name": "attachment",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "url",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Tip",
            "kind": "LinkedField",
            "name": "tip",
            "plural": false,
            "selections": [
              (v1/*: any*/),
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
              }
            ],
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
    "name": "TopicItemAttachmentCreatedSubscription",
    "selections": (v2/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TopicItemAttachmentCreatedSubscription",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "eb10dd40d7ce6c13e2e0e947baf6dabd",
    "id": null,
    "metadata": {},
    "name": "TopicItemAttachmentCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription TopicItemAttachmentCreatedSubscription(\n  $topicId: ID!\n) {\n  attachmentCreated(topicId: $topicId) {\n    attachment {\n      id\n      url\n      tip {\n        id\n        title\n        slug\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '81629de75070059c1ab3a5c67c402169';

module.exports = node;
