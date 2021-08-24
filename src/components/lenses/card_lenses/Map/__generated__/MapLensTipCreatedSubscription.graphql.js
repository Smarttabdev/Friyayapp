/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MapLensTipCreatedSubscriptionVariables = {|
  topicId: string
|};
export type MapLensTipCreatedSubscriptionResponse = {|
  +tipCreated: {|
    +tip: ?{|
      +id: string,
      +title: ?string,
      +slug: string,
      +cardType: ?string,
      +longitude: ?number,
      +latitude: ?number,
      +address: ?string,
    |}
  |}
|};
export type MapLensTipCreatedSubscription = {|
  variables: MapLensTipCreatedSubscriptionVariables,
  response: MapLensTipCreatedSubscriptionResponse,
|};
*/


/*
subscription MapLensTipCreatedSubscription(
  $topicId: ID!
) {
  tipCreated(topicId: $topicId) {
    tip {
      id
      title
      slug
      cardType
      longitude
      latitude
      address
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
            "name": "longitude",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "latitude",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "address",
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
    "name": "MapLensTipCreatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MapLensTipCreatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1477b9d0a7298b135a3f3eefa6c9c42e",
    "id": null,
    "metadata": {},
    "name": "MapLensTipCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription MapLensTipCreatedSubscription(\n  $topicId: ID!\n) {\n  tipCreated(topicId: $topicId) {\n    tip {\n      id\n      title\n      slug\n      cardType\n      longitude\n      latitude\n      address\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '12102422011ba27d381bcb0ede3d2074';

module.exports = node;
