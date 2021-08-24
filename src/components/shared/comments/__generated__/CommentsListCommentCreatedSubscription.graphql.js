/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CommentsListCommentCreatedSubscriptionVariables = {|
  tipId: string
|};
export type CommentsListCommentCreatedSubscriptionResponse = {|
  +commentCreated: {|
    +comments: ?$ReadOnlyArray<{|
      +id: string,
      +jsonApi: ?any,
    |}>,
    +comment: ?{|
      +id: string,
      +jsonApi: ?any,
    |},
  |}
|};
export type CommentsListCommentCreatedSubscription = {|
  variables: CommentsListCommentCreatedSubscriptionVariables,
  response: CommentsListCommentCreatedSubscriptionResponse,
|};
*/


/*
subscription CommentsListCommentCreatedSubscription(
  $tipId: ID!
) {
  commentCreated(commentableId: $tipId) {
    comments {
      id
      jsonApi
    }
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
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "commentableId",
        "variableName": "tipId"
      }
    ],
    "concreteType": "CommentCreatedPayload",
    "kind": "LinkedField",
    "name": "commentCreated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Comment",
        "kind": "LinkedField",
        "name": "comments",
        "plural": true,
        "selections": (v1/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Comment",
        "kind": "LinkedField",
        "name": "comment",
        "plural": false,
        "selections": (v1/*: any*/),
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
    "name": "CommentsListCommentCreatedSubscription",
    "selections": (v2/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CommentsListCommentCreatedSubscription",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "a9fd0977e3c01e827756fbf30b56e220",
    "id": null,
    "metadata": {},
    "name": "CommentsListCommentCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription CommentsListCommentCreatedSubscription(\n  $tipId: ID!\n) {\n  commentCreated(commentableId: $tipId) {\n    comments {\n      id\n      jsonApi\n    }\n    comment {\n      id\n      jsonApi\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '12b5b1508ff591f86670ed4a192c1af7';

module.exports = node;
