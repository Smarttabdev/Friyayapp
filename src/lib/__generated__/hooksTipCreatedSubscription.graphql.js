/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type hooksTipCreatedSubscriptionVariables = {|
  topicId: string
|};
export type hooksTipCreatedSubscriptionResponse = {|
  +tipCreated: {|
    +tip: ?{|
      +id: string
    |}
  |}
|};
export type hooksTipCreatedSubscription = {|
  variables: hooksTipCreatedSubscriptionVariables,
  response: hooksTipCreatedSubscriptionResponse,
|};
*/


/*
subscription hooksTipCreatedSubscription(
  $topicId: ID!
) {
  tipCreated(topicId: $topicId) {
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
    "name": "hooksTipCreatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "hooksTipCreatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1426817c229b569ba908143cedbc7854",
    "id": null,
    "metadata": {},
    "name": "hooksTipCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription hooksTipCreatedSubscription(\n  $topicId: ID!\n) {\n  tipCreated(topicId: $topicId) {\n    tip {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd154e72ff32f43a48b3b62f3e380f6eb';

module.exports = node;
