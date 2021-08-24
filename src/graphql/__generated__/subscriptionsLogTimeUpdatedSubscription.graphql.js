/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type subscriptionsLogTimeUpdatedSubscriptionVariables = {|
  tipId: string
|};
export type subscriptionsLogTimeUpdatedSubscriptionResponse = {|
  +logTimeUpdated: {|
    +logTime: ?{|
      +jsonApi: ?any
    |}
  |}
|};
export type subscriptionsLogTimeUpdatedSubscription = {|
  variables: subscriptionsLogTimeUpdatedSubscriptionVariables,
  response: subscriptionsLogTimeUpdatedSubscriptionResponse,
|};
*/


/*
subscription subscriptionsLogTimeUpdatedSubscription(
  $tipId: ID!
) {
  logTimeUpdated(tipId: $tipId) {
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
    "name": "subscriptionsLogTimeUpdatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LogTimeUpdatedPayload",
        "kind": "LinkedField",
        "name": "logTimeUpdated",
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
    "name": "subscriptionsLogTimeUpdatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LogTimeUpdatedPayload",
        "kind": "LinkedField",
        "name": "logTimeUpdated",
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
    "cacheID": "4e285958822880c64c4d1558ff663b38",
    "id": null,
    "metadata": {},
    "name": "subscriptionsLogTimeUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription subscriptionsLogTimeUpdatedSubscription(\n  $tipId: ID!\n) {\n  logTimeUpdated(tipId: $tipId) {\n    logTime {\n      jsonApi\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8c9dec5b7ca451eb88550659a4a986ef';

module.exports = node;
