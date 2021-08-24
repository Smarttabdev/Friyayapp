/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CommentsListCommentDeletedSubscriptionVariables = {|
  tipId: string
|};
export type CommentsListCommentDeletedSubscriptionResponse = {|
  +commentDeleted: {|
    +commentId: ?string
  |}
|};
export type CommentsListCommentDeletedSubscription = {|
  variables: CommentsListCommentDeletedSubscriptionVariables,
  response: CommentsListCommentDeletedSubscriptionResponse,
|};
*/


/*
subscription CommentsListCommentDeletedSubscription(
  $tipId: ID!
) {
  commentDeleted(commentableId: $tipId) {
    commentId
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
    "concreteType": "CommentDeletedPayload",
    "kind": "LinkedField",
    "name": "commentDeleted",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "commentId",
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
    "name": "CommentsListCommentDeletedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CommentsListCommentDeletedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "953b506584f1e5cdf17262ebf7fa6bc2",
    "id": null,
    "metadata": {},
    "name": "CommentsListCommentDeletedSubscription",
    "operationKind": "subscription",
    "text": "subscription CommentsListCommentDeletedSubscription(\n  $tipId: ID!\n) {\n  commentDeleted(commentableId: $tipId) {\n    commentId\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a66e6ef6b4d564905b3a3458a034cb65';

module.exports = node;
