/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type hooksTipUpdatedSubscriptionVariables = {|
  topicId: string
|};
export type hooksTipUpdatedSubscriptionResponse = {|
  +tipUpdated: {|
    +tip: ?{|
      +id: string
    |}
  |}
|};
export type hooksTipUpdatedSubscription = {|
  variables: hooksTipUpdatedSubscriptionVariables,
  response: hooksTipUpdatedSubscriptionResponse,
|};
*/


/*
subscription hooksTipUpdatedSubscription(
  $topicId: ID!
) {
  tipUpdated(topicId: $topicId) {
    tip {
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
    "concreteType": "TipUpdatedPayload",
    "kind": "LinkedField",
    "name": "tipUpdated",
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
    "name": "hooksTipUpdatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "hooksTipUpdatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "99c7d42c98ae3c126ad23312ce143910",
    "id": null,
    "metadata": {},
    "name": "hooksTipUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription hooksTipUpdatedSubscription(\n  $topicId: ID!\n) {\n  tipUpdated(topicId: $topicId) {\n    tip {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a3fb987962e2968abdd8713da250471f';

module.exports = node;
