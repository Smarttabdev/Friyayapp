/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SheetLensDomainUpdatedSubscriptionVariables = {|
  id: string
|};
export type SheetLensDomainUpdatedSubscriptionResponse = {|
  +domainUpdated: {|
    +domain: ?{|
      +id: string,
      +customFields: ?$ReadOnlyArray<{|
        +id: string,
        +name: string,
        +fieldType: string,
      |}>,
      +activeFields: ?$ReadOnlyArray<{|
        +id: string,
        +customField: {|
          +id: string
        |},
      |}>,
    |}
  |}
|};
export type SheetLensDomainUpdatedSubscription = {|
  variables: SheetLensDomainUpdatedSubscriptionVariables,
  response: SheetLensDomainUpdatedSubscriptionResponse,
|};
*/


/*
subscription SheetLensDomainUpdatedSubscription(
  $id: ID!
) {
  domainUpdated(id: $id) {
    domain {
      id
      customFields {
        id
        name
        fieldType
      }
      activeFields {
        id
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
    "concreteType": "DomainUpdatedPayload",
    "kind": "LinkedField",
    "name": "domainUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Domain",
        "kind": "LinkedField",
        "name": "domain",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CustomField",
            "kind": "LinkedField",
            "name": "customFields",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "fieldType",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ActiveField",
            "kind": "LinkedField",
            "name": "activeFields",
            "plural": true,
            "selections": [
              (v1/*: any*/),
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
    "name": "SheetLensDomainUpdatedSubscription",
    "selections": (v2/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SheetLensDomainUpdatedSubscription",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "6e29993d778bc434a38292ec50baf569",
    "id": null,
    "metadata": {},
    "name": "SheetLensDomainUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription SheetLensDomainUpdatedSubscription(\n  $id: ID!\n) {\n  domainUpdated(id: $id) {\n    domain {\n      id\n      customFields {\n        id\n        name\n        fieldType\n      }\n      activeFields {\n        id\n        customField {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '70be037da79b0052a78120e3d3ea40d0';

module.exports = node;
