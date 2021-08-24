/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type commentsCommentDeletedSubscriptionVariables = {|
  commentableId: string
|};
export type commentsCommentDeletedSubscriptionResponse = {|
  +commentDeleted: {|
    +commentId: ?string
  |}
|};
export type commentsCommentDeletedSubscription = {|
  variables: commentsCommentDeletedSubscriptionVariables,
  response: commentsCommentDeletedSubscriptionResponse,
|};
*/


/*
subscription commentsCommentDeletedSubscription(
  $commentableId: ID!
) {
  commentDeleted(commentableId: $commentableId) {
    commentId
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "commentableId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "commentableId",
        "variableName": "commentableId"
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
    "name": "commentsCommentDeletedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "commentsCommentDeletedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "53e8243d1ad4c1dbc7dc44c9a0919e80",
    "id": null,
    "metadata": {},
    "name": "commentsCommentDeletedSubscription",
    "operationKind": "subscription",
    "text": "subscription commentsCommentDeletedSubscription(\n  $commentableId: ID!\n) {\n  commentDeleted(commentableId: $commentableId) {\n    commentId\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c0a0a10343d035cf750f273c38141eaf';

module.exports = node;
