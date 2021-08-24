/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type VideoDropdownMenuQueryVariables = {|
  topicId?: ?string
|};
export type VideoDropdownMenuQueryResponse = {|
  +videoTips: ?{|
    +totalCount: number
  |}
|};
export type VideoDropdownMenuQuery = {|
  variables: VideoDropdownMenuQueryVariables,
  response: VideoDropdownMenuQueryResponse,
|};
*/


/*
query VideoDropdownMenuQuery(
  $topicId: ID
) {
  videoTips: tips(isVideoChat: true, topicId: $topicId) {
    totalCount
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
    "alias": "videoTips",
    "args": [
      {
        "kind": "Literal",
        "name": "isVideoChat",
        "value": true
      },
      {
        "kind": "Variable",
        "name": "topicId",
        "variableName": "topicId"
      }
    ],
    "concreteType": "TipConnection",
    "kind": "LinkedField",
    "name": "tips",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "totalCount",
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
    "name": "VideoDropdownMenuQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "VideoDropdownMenuQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bde1df2025df470746799c124e4c37a3",
    "id": null,
    "metadata": {},
    "name": "VideoDropdownMenuQuery",
    "operationKind": "query",
    "text": "query VideoDropdownMenuQuery(\n  $topicId: ID\n) {\n  videoTips: tips(isVideoChat: true, topicId: $topicId) {\n    totalCount\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '189a8b43740144201accb178e81fa6c6';

module.exports = node;
