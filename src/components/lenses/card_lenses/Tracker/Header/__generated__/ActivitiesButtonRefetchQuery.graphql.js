/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ActivitiesButton_tipsQuery$ref = any;
export type ActivitiesButtonRefetchQueryVariables = {|
  topicsParams?: ?any,
  topicId?: ?string,
|};
export type ActivitiesButtonRefetchQueryResponse = {|
  +$fragmentRefs: ActivitiesButton_tipsQuery$ref
|};
export type ActivitiesButtonRefetchQuery = {|
  variables: ActivitiesButtonRefetchQueryVariables,
  response: ActivitiesButtonRefetchQueryResponse,
|};
*/


/*
query ActivitiesButtonRefetchQuery(
  $topicsParams: JSON
  $topicId: ID
) {
  ...ActivitiesButton_tipsQuery_32WsC2
}

fragment ActivitiesButton_tipsQuery_32WsC2 on Query {
  tips(topicsParams: $topicsParams, topicId: $topicId, filter: "title != ''") {
    totalCount
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicsParams"
},
v2 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v3 = {
  "kind": "Variable",
  "name": "topicsParams",
  "variableName": "topicsParams"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivitiesButtonRefetchQuery",
    "selections": [
      {
        "args": [
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ActivitiesButton_tipsQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ActivitiesButtonRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "filter",
            "value": "title != ''"
          },
          (v2/*: any*/),
          (v3/*: any*/)
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
    ]
  },
  "params": {
    "cacheID": "6cce1c6cb636844bf7a5d348f0b7bede",
    "id": null,
    "metadata": {},
    "name": "ActivitiesButtonRefetchQuery",
    "operationKind": "query",
    "text": "query ActivitiesButtonRefetchQuery(\n  $topicsParams: JSON\n  $topicId: ID\n) {\n  ...ActivitiesButton_tipsQuery_32WsC2\n}\n\nfragment ActivitiesButton_tipsQuery_32WsC2 on Query {\n  tips(topicsParams: $topicsParams, topicId: $topicId, filter: \"title != ''\") {\n    totalCount\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b4ebc07f59810877f880fdf9d858f508';

module.exports = node;
