/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SheetLensTopicUpdatedSubscriptionVariables = {|
  topicId: string
|};
export type SheetLensTopicUpdatedSubscriptionResponse = {|
  +topicUpdated: {|
    +topic: ?{|
      +id: string,
      +activeFields: ?$ReadOnlyArray<{|
        +id: string,
        +customField: {|
          +id: string
        |},
      |}>,
    |}
  |}
|};
export type SheetLensTopicUpdatedSubscription = {|
  variables: SheetLensTopicUpdatedSubscriptionVariables,
  response: SheetLensTopicUpdatedSubscriptionResponse,
|};
*/


/*
subscription SheetLensTopicUpdatedSubscription(
  $topicId: ID!
) {
  topicUpdated(id: $topicId) {
    topic {
      id
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
        "name": "id",
        "variableName": "topicId"
      }
    ],
    "concreteType": "TopicUpdatedPayload",
    "kind": "LinkedField",
    "name": "topicUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Topic",
        "kind": "LinkedField",
        "name": "topic",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
    "name": "SheetLensTopicUpdatedSubscription",
    "selections": (v2/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SheetLensTopicUpdatedSubscription",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "aff3025afa961579ca250c4017fd3293",
    "id": null,
    "metadata": {},
    "name": "SheetLensTopicUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription SheetLensTopicUpdatedSubscription(\n  $topicId: ID!\n) {\n  topicUpdated(id: $topicId) {\n    topic {\n      id\n      activeFields {\n        id\n        customField {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dd0c9a2618d0cbf57c348727b9f4d815';

module.exports = node;
