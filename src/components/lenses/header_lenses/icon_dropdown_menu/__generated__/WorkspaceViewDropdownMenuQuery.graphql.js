/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type WorkspaceViewDropdownMenuQueryVariables = {||};
export type WorkspaceViewDropdownMenuQueryResponse = {|
  +topics: ?{|
    +totalCount: number
  |}
|};
export type WorkspaceViewDropdownMenuQuery = {|
  variables: WorkspaceViewDropdownMenuQueryVariables,
  response: WorkspaceViewDropdownMenuQueryResponse,
|};
*/


/*
query WorkspaceViewDropdownMenuQuery {
  topics {
    totalCount
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "TopicConnection",
    "kind": "LinkedField",
    "name": "topics",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "WorkspaceViewDropdownMenuQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "WorkspaceViewDropdownMenuQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "de8896b4fda7358b234788da74330ebe",
    "id": null,
    "metadata": {},
    "name": "WorkspaceViewDropdownMenuQuery",
    "operationKind": "query",
    "text": "query WorkspaceViewDropdownMenuQuery {\n  topics {\n    totalCount\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5109d2a9f8ba02ea048ce3d3838afe6f';

module.exports = node;
