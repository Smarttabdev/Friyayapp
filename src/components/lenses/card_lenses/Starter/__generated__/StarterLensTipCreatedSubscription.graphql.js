/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type StarterLensTipCreatedSubscriptionVariables = {|
  topicId: string
|};
export type StarterLensTipCreatedSubscriptionResponse = {|
  +tipCreated: {|
    +tip: ?{|
      +id: string,
      +title: ?string,
      +slug: string,
      +cardType: ?string,
      +createdAt: string,
      +updatedAt: string,
    |}
  |}
|};
export type StarterLensTipCreatedSubscription = {|
  variables: StarterLensTipCreatedSubscriptionVariables,
  response: StarterLensTipCreatedSubscriptionResponse,
|};
*/


/*
subscription StarterLensTipCreatedSubscription(
  $topicId: ID!
) {
  tipCreated(topicId: $topicId) {
    tip {
      id
      title
      slug
      cardType
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
    "concreteType": "TipCreatedPayload",
    "kind": "LinkedField",
    "name": "tipCreated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Tip",
        "kind": "LinkedField",
        "name": "tip",
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
            "name": "cardType",
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
    "name": "StarterLensTipCreatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StarterLensTipCreatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6c22b170d19a8b2cb238e8182cceb887",
    "id": null,
    "metadata": {},
    "name": "StarterLensTipCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription StarterLensTipCreatedSubscription(\n  $topicId: ID!\n) {\n  tipCreated(topicId: $topicId) {\n    tip {\n      id\n      title\n      slug\n      cardType\n      createdAt\n      updatedAt\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bb61464d47bc7592e1a90e6be5abcfac';

module.exports = node;
