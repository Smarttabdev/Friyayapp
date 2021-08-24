/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type fieldsTabContentTipUpdatedSubscriptionVariables = {|
  id: string
|};
export type fieldsTabContentTipUpdatedSubscriptionResponse = {|
  +tipUpdated: {|
    +tip: ?{|
      +id: string,
      +customFieldValues: ?$ReadOnlyArray<{|
        +id: string,
        +value: ?any,
        +customField: {|
          +id: string
        |},
      |}>,
    |}
  |}
|};
export type fieldsTabContentTipUpdatedSubscription = {|
  variables: fieldsTabContentTipUpdatedSubscriptionVariables,
  response: fieldsTabContentTipUpdatedSubscriptionResponse,
|};
*/


/*
subscription fieldsTabContentTipUpdatedSubscription(
  $id: ID!
) {
  tipUpdated(id: $id) {
    tip {
      id
      customFieldValues {
        id
        value
        customField {
          id
        }
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
    "name": "id"
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
        "name": "id",
        "variableName": "id"
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CustomFieldValue",
            "kind": "LinkedField",
            "name": "customFieldValues",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "value",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CustomField",
                "kind": "LinkedField",
                "name": "customField",
                "plural": false,
                "selections": [
                  (v1/*: any*/)
                ],
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
    "name": "fieldsTabContentTipUpdatedSubscription",
    "selections": (v2/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "fieldsTabContentTipUpdatedSubscription",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "dc626878cd43563c15186c753939074a",
    "id": null,
    "metadata": {},
    "name": "fieldsTabContentTipUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription fieldsTabContentTipUpdatedSubscription(\n  $id: ID!\n) {\n  tipUpdated(id: $id) {\n    tip {\n      id\n      customFieldValues {\n        id\n        value\n        customField {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '20d6d74d7df4c7a206112bce1409973d';

module.exports = node;
