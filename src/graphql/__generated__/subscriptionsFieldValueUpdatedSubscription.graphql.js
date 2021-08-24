/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type subscriptionsFieldValueUpdatedSubscriptionVariables = {|
  id: string
|};
export type subscriptionsFieldValueUpdatedSubscriptionResponse = {|
  +customFieldValueUpdated: {|
    +customFieldValue: ?{|
      +id: string,
      +value: ?any,
    |}
  |}
|};
export type subscriptionsFieldValueUpdatedSubscription = {|
  variables: subscriptionsFieldValueUpdatedSubscriptionVariables,
  response: subscriptionsFieldValueUpdatedSubscriptionResponse,
|};
*/


/*
subscription subscriptionsFieldValueUpdatedSubscription(
  $id: ID!
) {
  customFieldValueUpdated(id: $id) {
    customFieldValue {
      id
      value
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "CustomFieldValueUpdatedPayload",
    "kind": "LinkedField",
    "name": "customFieldValueUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CustomFieldValue",
        "kind": "LinkedField",
        "name": "customFieldValue",
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
            "name": "value",
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
    "name": "subscriptionsFieldValueUpdatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "subscriptionsFieldValueUpdatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9e86e7b22bebc66f6984150056c6ea4e",
    "id": null,
    "metadata": {},
    "name": "subscriptionsFieldValueUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription subscriptionsFieldValueUpdatedSubscription(\n  $id: ID!\n) {\n  customFieldValueUpdated(id: $id) {\n    customFieldValue {\n      id\n      value\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bc28b8322534bea8a7b6bf48fe3f8a9e';

module.exports = node;
