/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CardListBlockTipCreatedSubscriptionVariables = {|
  topicId: string
|};
export type CardListBlockTipCreatedSubscriptionResponse = {|
  +tipCreated: {|
    +tip: ?{|
      +id: string,
      +title: ?string,
      +slug: string,
      +nestedTips: ?{|
        +totalCount: number
      |},
    |}
  |}
|};
export type CardListBlockTipCreatedSubscription = {|
  variables: CardListBlockTipCreatedSubscriptionVariables,
  response: CardListBlockTipCreatedSubscriptionResponse,
|};
*/


/*
subscription CardListBlockTipCreatedSubscription(
  $topicId: ID!
) {
  tipCreated(topicId: $topicId) {
    tip {
      id
      title
      slug
      nestedTips {
        totalCount
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
            "concreteType": "TipConnection",
            "kind": "LinkedField",
            "name": "nestedTips",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCount",
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
    "name": "CardListBlockTipCreatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CardListBlockTipCreatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a9dd601898338050834ad12d1c8fcda7",
    "id": null,
    "metadata": {},
    "name": "CardListBlockTipCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription CardListBlockTipCreatedSubscription(\n  $topicId: ID!\n) {\n  tipCreated(topicId: $topicId) {\n    tip {\n      id\n      title\n      slug\n      nestedTips {\n        totalCount\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ed76a40865d6630fb9707ef06d0cdf44';

module.exports = node;
