/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type subscriptionsLogTimeCreatedSubscriptionVariables = {|
  tipId: string
|};
export type subscriptionsLogTimeCreatedSubscriptionResponse = {|
  +logTimeCreated: {|
    +logTime: ?{|
      +jsonApi: ?any
    |}
  |}
|};
export type subscriptionsLogTimeCreatedSubscription = {|
  variables: subscriptionsLogTimeCreatedSubscriptionVariables,
  response: subscriptionsLogTimeCreatedSubscriptionResponse,
|};
*/


/*
subscription subscriptionsLogTimeCreatedSubscription(
  $tipId: ID!
) {
  logTimeCreated(tipId: $tipId) {
    logTime {
      jsonApi
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
    "name": "tipId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "tipId",
    "variableName": "tipId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "jsonApi",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "subscriptionsLogTimeCreatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LogTimeCreatedPayload",
        "kind": "LinkedField",
        "name": "logTimeCreated",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LogTime",
            "kind": "LinkedField",
            "name": "logTime",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "subscriptionsLogTimeCreatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LogTimeCreatedPayload",
        "kind": "LinkedField",
        "name": "logTimeCreated",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LogTime",
            "kind": "LinkedField",
            "name": "logTime",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "a29c9f0175ae0dfc22de0c43bc917690",
    "id": null,
    "metadata": {},
    "name": "subscriptionsLogTimeCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription subscriptionsLogTimeCreatedSubscription(\n  $tipId: ID!\n) {\n  logTimeCreated(tipId: $tipId) {\n    logTime {\n      jsonApi\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '75c0cf10d23e85e1afa0767c7c21643b';

module.exports = node;
