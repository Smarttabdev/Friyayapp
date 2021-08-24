/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type commentsCommentUpdatedSubscriptionVariables = {|
  commentableId: string
|};
export type commentsCommentUpdatedSubscriptionResponse = {|
  +commentUpdated: {|
    +comment: ?{|
      +id: string,
      +jsonApi: ?any,
    |}
  |}
|};
export type commentsCommentUpdatedSubscription = {|
  variables: commentsCommentUpdatedSubscriptionVariables,
  response: commentsCommentUpdatedSubscriptionResponse,
|};
*/


/*
subscription commentsCommentUpdatedSubscription(
  $commentableId: ID!
) {
  commentUpdated(commentableId: $commentableId) {
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
    "name": "commentsCommentUpdatedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "commentsCommentUpdatedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1b5b78937abd49bc37a7b5fa16462c4e",
    "id": null,
    "metadata": {},
    "name": "commentsCommentUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription commentsCommentUpdatedSubscription(\n  $commentableId: ID!\n) {\n  commentUpdated(commentableId: $commentableId) {\n    comment {\n      id\n      jsonApi\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ae318db50b582d445bb34d54acae8c65';

module.exports = node;
