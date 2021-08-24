/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CommentsListCommentUpdatedSubscriptionVariables = {|
  tipId: string
|};
export type CommentsListCommentUpdatedSubscriptionResponse = {|
  +commentUpdated: {|
    +comment: ?{|
      +id: string,
      +jsonApi: ?any,
    |}
  |}
|};
export type CommentsListCommentUpdatedSubscription = {|
  variables: CommentsListCommentUpdatedSubscriptionVariables,
  response: CommentsListCommentUpdatedSubscriptionResponse,
|};
*/


/*
subscription CommentsListCommentUpdatedSubscription(
  $tipId: ID!
) {
  commentUpdated(commentableId: $tipId) {
    comment {
      id
      jsonApi
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "commentableId",
        "variableName": "tipId"
      }
    ],
    "concreteType": "CommentUpdatedPayload",
    "kind": "LinkedField",
    "name": "commentUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Comment",
        "kind": "LinkedField",
        "name": "comment",
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
            "name": "jsonApi",
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
    "name": "CommentsListCommentUpdatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CommentsListCommentUpdatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0e0f2f23f21dbae30d78530a12cfe110",
    "id": null,
    "metadata": {},
    "name": "CommentsListCommentUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription CommentsListCommentUpdatedSubscription(\n  $tipId: ID!\n) {\n  commentUpdated(commentableId: $tipId) {\n    comment {\n      id\n      jsonApi\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '449f6d89e243a2907d8f9b5ee6bc48a0';

module.exports = node;
