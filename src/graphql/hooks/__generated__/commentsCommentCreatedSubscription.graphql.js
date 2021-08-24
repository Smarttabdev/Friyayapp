/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type commentsCommentCreatedSubscriptionVariables = {|
  commentableId: string
|};
export type commentsCommentCreatedSubscriptionResponse = {|
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
export type commentsCommentCreatedSubscription = {|
  variables: commentsCommentCreatedSubscriptionVariables,
  response: commentsCommentCreatedSubscriptionResponse,
|};
*/


/*
subscription commentsCommentCreatedSubscription(
  $commentableId: ID!
) {
  commentCreated(commentableId: $commentableId) {
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
    "name": "commentableId"
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
        "variableName": "commentableId"
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
    "name": "commentsCommentCreatedSubscription",
    "selections": (v2/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "commentsCommentCreatedSubscription",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "daad6a3a714e992fa7910a57d05fe162",
    "id": null,
    "metadata": {},
    "name": "commentsCommentCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription commentsCommentCreatedSubscription(\n  $commentableId: ID!\n) {\n  commentCreated(commentableId: $commentableId) {\n    comments {\n      id\n      jsonApi\n    }\n    comment {\n      id\n      jsonApi\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '397ffceafbe9a59691a0948e2a70d530';

module.exports = node;
