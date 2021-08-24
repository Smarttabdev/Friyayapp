/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ActivitiesButton_tipsQuery$ref = any;
export type ActivitiesButtonQueryVariables = {|
  topicsParams?: ?any,
  topicId?: ?string,
|};
export type ActivitiesButtonQueryResponse = {|
  +$fragmentRefs: ActivitiesButton_tipsQuery$ref
|};
export type ActivitiesButtonQuery = {|
  variables: ActivitiesButtonQueryVariables,
  response: ActivitiesButtonQueryResponse,
|};
*/


/*
query ActivitiesButtonQuery(
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
    "name": "ActivitiesButtonQuery",
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
    "name": "ActivitiesButtonQuery",
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
    "cacheID": "e1a48d2ae1a2b35bbfdefdf51506757c",
    "id": null,
    "metadata": {},
    "name": "ActivitiesButtonQuery",
    "operationKind": "query",
    "text": "query ActivitiesButtonQuery(\n  $topicsParams: JSON\n  $topicId: ID\n) {\n  ...ActivitiesButton_tipsQuery_32WsC2\n}\n\nfragment ActivitiesButton_tipsQuery_32WsC2 on Query {\n  tips(topicsParams: $topicsParams, topicId: $topicId, filter: \"title != ''\") {\n    totalCount\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '00437539555053825714af08ec7017bc';

module.exports = node;
